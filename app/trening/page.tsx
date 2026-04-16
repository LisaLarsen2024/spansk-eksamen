'use client';
import { useState, useEffect, useRef } from 'react';
import { mockExams } from '@/lib/data';

type Mode = 'choose' | 'prep' | 'exam' | 'done' | 'challenge';

const challengeTopics = [
  "Háblame de tu vida diaria",
  "Compara España con Noruega",
  "¿Qué opinas de las redes sociales?",
  "Describe una tradición hispanohablante",
  "¿Qué problemas sociales conoces?",
  "Háblame de un artista hispanohablante",
  "¿Qué harías si pudieras viajar a cualquier país?",
  "¿Cómo es el sistema educativo en Noruega?",
  "¿Qué piensas del cambio climático?",
  "Describe tu familia y tus amigos",
  "¿Qué planes tienes para el futuro?",
  "¿Qué tipo de música te gusta y por qué?",
];

export default function TreningPage() {
  const [mode, setMode] = useState<Mode>('choose');
  const [exam, setExam] = useState<number>(0);
  const [questionIdx, setQuestionIdx] = useState(-1);
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [challengeTopic, setChallengeTopic] = useState('');
  const [challengeSeconds, setChallengeSeconds] = useState(60);
  const [isRecording, setIsRecording] = useState(false);
  const [recordings, setRecordings] = useState<string[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => setTimer(t => t + 1), 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isRunning]);

  // Challenge countdown
  useEffect(() => {
    if (mode === 'challenge' && isRunning && challengeSeconds <= 0) {
      setIsRunning(false);
      stopRecording();
    }
  }, [challengeSeconds, isRunning, mode]);

  useEffect(() => {
    if (mode === 'challenge' && isRunning) {
      const id = setInterval(() => setChallengeSeconds(s => s - 1), 1000);
      return () => clearInterval(id);
    }
  }, [mode, isRunning]);

  function formatTime(s: number) {
    const m = Math.floor(Math.abs(s) / 60);
    const sec = Math.abs(s) % 60;
    return `${m}:${String(sec).padStart(2, '0')}`;
  }

  // Voice recording
  async function startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      chunksRef.current = [];
      recorder.ondataavailable = (e) => chunksRef.current.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        setRecordings(prev => [...prev, url]);
        stream.getTracks().forEach(t => t.stop());
      };
      recorder.start();
      mediaRecorderRef.current = recorder;
      setIsRecording(true);
    } catch {
      alert('Kunne ikke starte mikrofonen. Gi tilgang i nettleseren.');
    }
  }

  function stopRecording() {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
  }

  function toggleRecording() {
    if (isRecording) stopRecording();
    else startRecording();
  }

  // Mock exam functions
  function startExam(idx: number) {
    setExam(idx);
    setMode('prep');
    setTimer(0);
    setIsRunning(true);
    setQuestionIdx(-1);
    setRecordings([]);
  }

  function startSpeaking() {
    setMode('exam');
    setTimer(0);
    setQuestionIdx(0);
  }

  function nextQuestion() {
    const questions = mockExams[exam].spørsmål;
    if (questionIdx < questions.length - 1) {
      setQuestionIdx(q => q + 1);
    } else {
      setIsRunning(false);
      setMode('done');
    }
  }

  function startChallenge() {
    const topic = challengeTopics[Math.floor(Math.random() * challengeTopics.length)];
    setChallengeTopic(topic);
    setChallengeSeconds(60);
    setMode('challenge');
    setIsRunning(true);
    setRecordings([]);
    startRecording();
  }

  function reset() {
    setMode('choose');
    setTimer(0);
    setIsRunning(false);
    setQuestionIdx(-1);
    setRecordings([]);
    stopRecording();
  }

  // === CHOOSE MODE ===
  if (mode === 'choose') {
    return (
      <main className="max-w-lg mx-auto px-4 pt-6">
        <h1 className="text-2xl font-black mb-1">🎤 Trening</h1>
        <p className="text-sm text-deep/60 mb-6">Velg treningsmodus:</p>

        {/* 60-second challenge */}
        <button
          onClick={startChallenge}
          className="w-full bg-gradient-to-r from-coral to-sun text-white rounded-2xl p-5 text-left mb-4 hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-lg"
        >
          <div className="flex items-center gap-3">
            <span className="text-3xl">⚡</span>
            <div>
              <p className="text-lg font-black">60-sekunders utfordring</p>
              <p className="text-sm opacity-80">Tilfeldig tema. IKKE stopp å snakke. Go!</p>
            </div>
          </div>
        </button>

        {/* Mock exams */}
        <p className="text-xs font-bold text-deep/40 uppercase mb-2 mt-6">Mock-eksamener:</p>
        <div className="grid gap-3 mb-6">
          {mockExams.map((m, i) => (
            <button
              key={i}
              onClick={() => startExam(i)}
              className="bg-white rounded-2xl p-4 text-left shadow-sm hover:shadow-md active:scale-[0.98] transition-all border-2 border-transparent hover:border-ocean"
            >
              <p className="font-bold">{m.tema}</p>
              <p className="text-xs text-deep/50">{m.spørsmål.length} spørsmål + forberedelse</p>
            </button>
          ))}
        </div>

        <div className="bg-peach rounded-2xl p-4 mb-8">
          <p className="text-sm font-bold mb-1">🎙️ Ny: Stemmeopptak!</p>
          <p className="text-xs text-deep/70">
            Ta opp deg selv mens du svarer. Hør tilbake.
            Det er ubehagelig — men det er den beste måten å bli bedre.
          </p>
        </div>
      </main>
    );
  }

  // === 60-SECOND CHALLENGE ===
  if (mode === 'challenge') {
    const isTimeUp = challengeSeconds <= 0;
    return (
      <main className="max-w-lg mx-auto px-4 pt-6 text-center">
        <p className="text-xs text-deep/40 mb-2">⚡ 60-sekunders utfordring</p>

        <div className={`text-7xl font-black font-mono mb-4 transition-colors ${
          challengeSeconds <= 10 ? 'text-red-500' : challengeSeconds <= 30 ? 'text-sun' : 'text-coral'
        }`}>
          {isTimeUp ? '0:00' : formatTime(challengeSeconds)}
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg mb-6 border-2 border-coral">
          <p className="text-xs text-deep/40 mb-2">Ditt tema:</p>
          <p className="text-xl font-bold italic">&quot;{challengeTopic}&quot;</p>
        </div>

        {isTimeUp ? (
          <div className="animate-bounce-in">
            <p className="text-4xl mb-3">🎉</p>
            <p className="text-lg font-black mb-2">Tiden er ute!</p>
            <p className="text-sm text-deep/60 mb-4">Klarte du å snakke hele veien?</p>

            {recordings.length > 0 && (
              <div className="bg-gray-50 rounded-xl p-4 mb-4 text-left">
                <p className="text-xs font-bold mb-2">🔊 Ditt opptak:</p>
                {recordings.map((url, i) => (
                  <audio key={i} controls src={url} className="w-full mb-2" />
                ))}
              </div>
            )}

            <div className="flex gap-3">
              <button onClick={startChallenge} className="flex-1 bg-coral text-white py-3 rounded-xl font-bold">
                Igjen! ⚡
              </button>
              <button onClick={reset} className="flex-1 bg-gray-200 py-3 rounded-xl font-bold">
                Tilbake
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold ${
              isRecording ? 'bg-red-500 text-white animate-pulse' : 'bg-gray-200 text-deep/60'
            }`}>
              <span className="w-3 h-3 rounded-full bg-current" />
              {isRecording ? 'Tar opp...' : 'Opptak stoppet'}
            </div>

            <p className="text-lg font-bold text-coral mt-6">¡HABLA! No pares! 🗣️</p>
            <p className="text-sm text-deep/40 mt-2">Bruk frasene: en mi opinión, por ejemplo, además...</p>

            <button onClick={reset} className="mt-6 text-xs text-deep/30">Avbryt</button>
          </div>
        )}
      </main>
    );
  }

  const currentExam = mockExams[exam];

  // === PREP PHASE ===
  if (mode === 'prep') {
    return (
      <main className="max-w-lg mx-auto px-4 pt-6">
        <div className="text-center mb-6">
          <p className="text-sm text-deep/50 mb-2">Forberedelsestid</p>
          <p className="text-5xl font-black font-mono text-coral">{formatTime(timer)}</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <p className="text-xs text-deep/50 uppercase font-bold mb-2">Ditt tema:</p>
          <h2 className="text-xl font-black mb-3">{currentExam.tema}</h2>
          <p className="text-sm text-deep/70">{currentExam.intro}</p>
        </div>

        <button
          onClick={startSpeaking}
          className="w-full bg-coral text-white py-4 rounded-2xl font-bold text-lg animate-pulse-glow"
        >
          Start eksamen 🎤
        </button>
        <button onClick={reset} className="w-full text-sm text-deep/40 mt-3 py-2">← Tilbake</button>
      </main>
    );
  }

  // === EXAM PHASE ===
  if (mode === 'exam') {
    return (
      <main className="max-w-lg mx-auto px-4 pt-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-xs text-deep/50">Eksamen pågår</p>
            <p className="text-sm font-bold">{currentExam.tema}</p>
          </div>
          <p className="text-2xl font-black font-mono text-coral">{formatTime(timer)}</p>
        </div>

        <div className="flex gap-2 mb-4 justify-center">
          {currentExam.spørsmål.map((_, i) => (
            <div key={i} className={`w-3 h-3 rounded-full ${
              i < questionIdx ? 'bg-success' : i === questionIdx ? 'bg-coral scale-125' : 'bg-gray-200'
            }`} />
          ))}
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg mb-4 border-2 border-coral">
          <p className="text-xs text-deep/40 mb-2">Spørsmål {questionIdx + 1} av {currentExam.spørsmål.length}</p>
          <p className="text-xl font-bold italic leading-snug">
            &quot;{currentExam.spørsmål[questionIdx]}&quot;
          </p>
        </div>

        {/* Record button */}
        <div className="flex justify-center mb-4">
          <button
            onClick={toggleRecording}
            className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl transition-all ${
              isRecording
                ? 'bg-red-500 text-white animate-pulse shadow-lg'
                : 'bg-gray-100 text-deep/60 hover:bg-gray-200'
            }`}
          >
            {isRecording ? '⏹' : '🎙️'}
          </button>
        </div>
        <p className="text-center text-xs text-deep/40 mb-4">
          {isRecording ? 'Tar opp — snakk HØYT!' : 'Trykk for å ta opp svaret ditt'}
        </p>

        {recordings.length > 0 && (
          <div className="bg-gray-50 rounded-xl p-3 mb-4">
            <p className="text-xs font-bold mb-1">Dine opptak:</p>
            {recordings.map((url, i) => (
              <audio key={i} controls src={url} className="w-full mb-1" />
            ))}
          </div>
        )}

        <button
          onClick={nextQuestion}
          className="w-full bg-ocean text-white py-4 rounded-2xl font-bold text-lg"
        >
          {questionIdx < currentExam.spørsmål.length - 1 ? 'Neste spørsmål →' : 'Avslutt ✓'}
        </button>
      </main>
    );
  }

  // === DONE ===
  return (
    <main className="max-w-lg mx-auto px-4 pt-6 text-center">
      <div className="animate-bounce-in">
        <p className="text-6xl mb-4">🎉</p>
        <h2 className="text-2xl font-black mb-2">Ferdig!</h2>
        <p className="text-lg font-mono text-coral mb-4">Tid: {formatTime(timer)}</p>
      </div>

      {recordings.length > 0 && (
        <div className="bg-gray-50 rounded-xl p-4 mb-4 text-left">
          <p className="text-sm font-bold mb-2">🔊 Hør deg selv:</p>
          {recordings.map((url, i) => (
            <audio key={i} controls src={url} className="w-full mb-2" />
          ))}
        </div>
      )}

      <div className="bg-white rounded-2xl p-5 shadow-sm mb-6 text-left">
        <p className="font-bold mb-2">Sjekkliste:</p>
        {['Brukte jeg minst 3 fraser?', 'Sammenlignet med Norge?', 'Ga min personlige mening?', 'Ga konkrete eksempler?', 'Snakket uten lange pauser?'].map((q, i) => (
          <label key={i} className="flex items-center gap-3 py-2 text-sm">
            <input type="checkbox" className="w-5 h-5 rounded accent-success" />
            {q}
          </label>
        ))}
      </div>

      <div className="flex gap-3">
        <button onClick={() => startExam(exam)} className="flex-1 bg-coral text-white py-3 rounded-xl font-bold">Igjen 🔄</button>
        <button onClick={reset} className="flex-1 bg-gray-200 py-3 rounded-xl font-bold">Tilbake</button>
      </div>
    </main>
  );
}
