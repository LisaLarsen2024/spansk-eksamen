'use client';
import Link from 'next/link';

const steps = [
  {
    emoji: '🎧',
    title: 'Start med å lytte',
    where: '/lytt',
    whereLabel: 'Åpne Lytt',
    text: 'Begynn med Episode 1. Du ser manuset fargekoda mens du lytter — lilla er norsk forklaring, korall er spansk, blått er sensor-spørsmål. Trykk på en tekstblokk for å hoppe dit. Bruk -15/+15-knappene for å spole tilbake og høre ting om igjen. Si frasene HØYT etter Carlos — det er sånn de fester seg!',
  },
  {
    emoji: '🃏',
    title: 'Drill frasene',
    where: '/drill',
    whereLabel: 'Åpne Drill',
    text: 'Her er alle de viktigste frasene som flashcards. Du ser ett kort — prøv å si svaret HØYT før du trykker for å snu. Trykk "Kan det!" hvis du fikk det til, eller "Øv mer" hvis ikke. Kort du bommer på kommer automatisk tilbake! Du kan velge kategori øverst — start med "Redning" hvis du er nervøs, det er frasene som redder deg når du står fast.',
  },
  {
    emoji: '✨',
    title: 'Gjør det personlig',
    where: '/min-versjon',
    whereLabel: 'Åpne Min versjon',
    text: 'Carlos sine svar er fine som mal — men sensor vil høre om DEG. Åpne "Min versjon" og fyll inn dine egne svar. Hva heter du? Hva liker du? Hva mener du om sosiale medier? Når svarene handler om deg, husker du dem under press. Bruk eksemplene som hjelp, men skriv med dine ord.',
  },
  {
    emoji: '🎤',
    title: 'Øv på å snakke',
    where: '/trening',
    whereLabel: 'Åpne Trening',
    text: 'Her har du to moduser. "60-sekunders utfordring" gir deg et tilfeldig tema og en nedtelling — regelen er enkel: IKKE stopp å snakke! Det tar opp stemmen din så du kan høre deg selv etterpå. "Mock-eksamen" simulerer ekte eksamen med forberedelsestid og sensorspørsmål. Bruk mikrofon-knappen for å ta opp svarene dine — å høre seg selv er ubehagelig, men det er den beste måten å bli bedre.',
  },
  {
    emoji: '🤖',
    title: 'Snakk med AI-sensoren',
    where: '/sensor',
    whereLabel: 'Åpne AI-Sensor',
    text: 'Dette er som å ha en privatlærer som snakker spansk! AI-sensoren stiller deg spørsmål, akkurat som på ekte eksamen, og følger opp det du sier. Du kan skrive svarene, eller trykke mikrofon-knappen og SNAKKE — sensoren forstår deg! Hen snakker også tilbake med lyd. Bruk frasene du har lært: "En mi opinión...", "Por ejemplo...", "En comparación con Noruega..."',
  },
  {
    emoji: '📋',
    title: 'Følg planen',
    where: '/plan',
    whereLabel: 'Åpne Plan',
    text: 'Åpne 7-dagers planen og start med Dag 1. Hver dag har 3-4 korte oppgaver. Hak dem av når du er ferdig — du får konfetti! Planen er laget for at du skal gjøre litt hver dag i stedet for alt på en gang. Progresjonen lagres på telefonen din, så den husker hvor du er.',
  },
  {
    emoji: '📝',
    title: 'Ta screenshot av jukselappen',
    where: '/jukselapp',
    whereLabel: 'Åpne Jukselapp',
    text: 'Jukselappen har alle frasene sortert: meninger, argumentasjon, sammenligning, avslutning, redning. Ta et screenshot av den og ha den på telefonen. Se på den i køen på butikken, på bussen, før du sovner. Jo mer du ser dem, jo lettere flyter de ut på eksamensdagen.',
  },
];

export default function GuidePage() {
  return (
    <main className="max-w-lg mx-auto px-4 pt-6 pb-24">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-black mb-2">Hei! 👋</h1>
        <p className="text-lg text-deep/70">
          Denne appen er laget for å hjelpe deg bestå<br />
          <span className="font-bold text-coral">muntlig eksamen i spansk</span>
        </p>
        <p className="text-sm text-deep/40 mt-2">Her er en rask guide til hvordan du bruker den.</p>
      </div>

      {/* Quick overview */}
      <div className="bg-gradient-to-br from-coral to-sun text-white rounded-2xl p-5 mb-8">
        <p className="font-bold mb-2">Kort fortalt:</p>
        <p className="text-sm leading-relaxed opacity-95">
          Du har en <strong>podcast</strong> med alt du trenger å vite (med manus!),
          <strong> flashcards</strong> du kan drille,
          en <strong>AI-sensor</strong> du kan øve med,
          <strong> mock-eksamener</strong> med opptak,
          og en <strong>7-dagers plan</strong> som tar deg i mål.
          Alt du trenger — på telefonen din.
        </p>
      </div>

      {/* Steps */}
      <div className="space-y-4 mb-8">
        {steps.map((step, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">{step.emoji}</span>
              <div>
                <p className="text-xs text-deep/40 font-bold">Steg {i + 1}</p>
                <h2 className="font-black text-lg">{step.title}</h2>
              </div>
            </div>
            <p className="text-sm text-deep/70 leading-relaxed mb-3">
              {step.text}
            </p>
            <Link
              href={step.where}
              className="inline-flex items-center gap-1.5 bg-coral/10 text-coral font-bold text-sm px-4 py-2 rounded-xl hover:bg-coral/20 transition-colors"
            >
              {step.whereLabel} →
            </Link>
          </div>
        ))}
      </div>

      {/* Exam day tips */}
      <div className="bg-mint border-2 border-success rounded-2xl p-5 mb-6">
        <p className="font-black text-lg mb-3">🍀 På eksamensdagen:</p>
        <div className="space-y-2 text-sm text-deep/70">
          <p>• <strong>Spis frokost.</strong> Hjernen trenger energi.</p>
          <p>• <strong>Ta med stikkordlapp</strong> — ikke manus, bare stikkord.</p>
          <p>• <strong>De første 30 sekundene setter tonen:</strong></p>
          <p className="italic text-coral ml-4">&quot;Buenos días. Me llamo [ditt navn]. Hoy voy a hablar sobre...&quot;</p>
          <p>• <strong>Hvis du går blank:</strong> si <span className="italic text-coral">&quot;Déjeme pensar un momento...&quot;</span></p>
          <p>• <strong>Husk:</strong> sensor vil at du skal lykkes! De leter etter det du KAN.</p>
        </div>
      </div>

      {/* Final motivation */}
      <div className="text-center mb-8">
        <p className="text-4xl mb-3">🇪🇸</p>
        <p className="text-lg font-black text-coral">Du klarer dette!</p>
        <p className="text-sm text-deep/50 mt-1">Kommunikasjon slår perfeksjon. Alltid.</p>
        <Link
          href="/"
          className="inline-block mt-4 bg-coral text-white font-bold px-8 py-3 rounded-2xl hover:bg-coral/90 active:scale-95 transition-all"
        >
          La oss begynne! 🚀
        </Link>
      </div>
    </main>
  );
}
