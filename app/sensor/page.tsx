'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function SensorPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const [error, setError] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function sendMessage(userMessage: string) {
    if (!userMessage.trim()) return;

    const newMessages: Message[] = [...messages, { role: 'user', content: userMessage }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/sensor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();

      if (data.error) {
        setError(data.error);
      } else {
        setMessages([...newMessages, { role: 'assistant', content: data.reply }]);
        // Speak the response
        speakSpanish(data.reply);
      }
    } catch {
      setError('Kunne ikke nå sensoren. Sjekk internett.');
    }

    setLoading(false);
  }

  async function startExam() {
    setStarted(true);
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/sensor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [{ role: 'user', content: 'Hola, estoy lista para el examen.' }] }),
      });

      const data = await res.json();

      if (data.error) {
        setError(data.error);
        setStarted(false);
      } else {
        setMessages([
          { role: 'user', content: 'Hola, estoy lista para el examen.' },
          { role: 'assistant', content: data.reply },
        ]);
        speakSpanish(data.reply);
      }
    } catch {
      setError('Kunne ikke starte. Sjekk internett.');
      setStarted(false);
    }

    setLoading(false);
  }

  function speakSpanish(text: string) {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES';
      utterance.rate = 0.9;
      speechSynthesis.speak(utterance);
    }
  }

  function toggleVoiceInput() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    const SpeechRecognitionAPI = w.SpeechRecognition || w.webkitSpeechRecognition;

    if (!SpeechRecognitionAPI) {
      setError('Talegjenkjenning støttes ikke i denne nettleseren. Bruk Chrome.');
      return;
    }

    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
      return;
    }

    const recognition = new SpeechRecognitionAPI();
    recognition.lang = 'es-ES';
    recognition.continuous = false;
    recognition.interimResults = false;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setIsRecording(false);
    };

    recognition.onerror = () => {
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
    setIsRecording(true);
  }

  // Not started yet
  if (!started) {
    return (
      <main className="max-w-lg mx-auto px-4 pt-6">
        <h1 className="text-2xl font-black mb-1">🤖 AI-Sensor</h1>
        <p className="text-sm text-deep/60 mb-6">
          Øv med en AI som snakker spansk som en ekte sensor!
        </p>

        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <p className="font-bold mb-3">Slik fungerer det:</p>
          <div className="space-y-3 text-sm text-deep/70">
            <div className="flex gap-3">
              <span className="text-xl">1️⃣</span>
              <p>Sensoren hilser og gir deg et tema — på spansk</p>
            </div>
            <div className="flex gap-3">
              <span className="text-xl">2️⃣</span>
              <p>Du svarer på spansk — skriv eller bruk mikrofonen 🎙️</p>
            </div>
            <div className="flex gap-3">
              <span className="text-xl">3️⃣</span>
              <p>Sensoren stiller oppfølgingsspørsmål, akkurat som på ekte eksamen</p>
            </div>
            <div className="flex gap-3">
              <span className="text-xl">4️⃣</span>
              <p>Bruk frasene du har lært! &quot;En mi opinión...&quot; &quot;Por ejemplo...&quot;</p>
            </div>
          </div>
        </div>

        <button
          onClick={startExam}
          disabled={loading}
          className="w-full bg-coral text-white py-4 rounded-2xl font-bold text-lg hover:bg-coral/90 active:scale-[0.98] transition-all animate-pulse-glow disabled:opacity-50"
        >
          {loading ? 'Starter...' : '¡Empezar el examen! 🎤'}
        </button>

        {error && (
          <div className="mt-4 bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-700">
            {error}
          </div>
        )}
      </main>
    );
  }

  // Chat interface
  return (
    <main className="max-w-lg mx-auto px-4 pt-4 pb-36">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-black">🤖 AI-Sensor</h1>
        <button
          onClick={() => { setStarted(false); setMessages([]); speechSynthesis.cancel(); }}
          className="text-xs text-deep/40 bg-gray-100 px-3 py-1 rounded-full"
        >
          Avslutt
        </button>
      </div>

      {/* Messages */}
      <div className="space-y-3 mb-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`rounded-2xl p-4 max-w-[85%] ${
              msg.role === 'assistant'
                ? 'bg-blue-50 border-l-4 border-l-blue-400 mr-auto'
                : 'bg-coral/10 border-r-4 border-r-coral ml-auto'
            }`}
          >
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-xs">
                {msg.role === 'assistant' ? '🇪🇸 Sensor' : '🙋 Du'}
              </span>
            </div>
            <p className="text-sm leading-relaxed">{msg.content}</p>
            {msg.role === 'assistant' && (
              <button
                onClick={() => speakSpanish(msg.content)}
                className="mt-2 text-xs text-blue-500 hover:text-blue-700"
              >
                🔊 Hør igjen
              </button>
            )}
          </div>
        ))}

        {loading && (
          <div className="bg-blue-50 border-l-4 border-l-blue-400 rounded-2xl p-4 mr-auto max-w-[85%]">
            <p className="text-sm text-deep/40 animate-pulse">Sensoren tenker...</p>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-700 mb-3">
          {error}
        </div>
      )}

      {/* Input */}
      <div className="fixed bottom-16 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 px-4 py-3 z-40">
        <div className="max-w-lg mx-auto flex gap-2">
          <button
            onClick={toggleVoiceInput}
            className={`w-12 h-12 rounded-full flex items-center justify-center text-xl flex-shrink-0 transition-all ${
              isRecording
                ? 'bg-red-500 text-white animate-pulse'
                : 'bg-gray-100 text-deep/60 hover:bg-gray-200'
            }`}
          >
            🎙️
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !loading && sendMessage(input)}
            placeholder="Escribe en español..."
            className="flex-1 bg-gray-50 rounded-xl px-4 py-3 text-sm border border-gray-200 focus:border-coral focus:outline-none"
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={loading || !input.trim()}
            className="bg-coral text-white px-4 rounded-xl font-bold hover:bg-coral/90 disabled:opacity-30 transition-all"
          >
            →
          </button>
        </div>
        <p className="text-[10px] text-deep/30 text-center mt-1 max-w-lg mx-auto">
          🎙️ = snakk spansk • ⌨️ = skriv spansk • Sensor snakker tilbake!
        </p>
      </div>
    </main>
  );
}
