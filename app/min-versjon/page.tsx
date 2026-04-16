'use client';
import { useState, useEffect } from 'react';

interface MyAnswers {
  nombre: string;
  edad: string;
  ciudad: string;
  intereses: string;
  familia: string;
  opinion_redes: string;
  tradicion_favorita: string;
  artista_favorito: string;
  problema_social: string;
  planes_futuro: string;
}

const defaultAnswers: MyAnswers = {
  nombre: '', edad: '', ciudad: '', intereses: '', familia: '',
  opinion_redes: '', tradicion_favorita: '', artista_favorito: '',
  problema_social: '', planes_futuro: '',
};

const fields: { key: keyof MyAnswers; label: string; hint: string; example: string }[] = [
  { key: 'nombre', label: '¿Cómo te llamas?', hint: 'Navnet ditt', example: 'Me llamo Sofia.' },
  { key: 'edad', label: '¿Cuántos años tienes?', hint: 'Alderen din', example: 'Tengo veinte años.' },
  { key: 'ciudad', label: '¿Dónde vives?', hint: 'Hvor du bor', example: 'Vivo en una ciudad pequeña en el sur de Noruega.' },
  { key: 'intereses', label: '¿Qué te gusta hacer en tu tiempo libre?', hint: 'Fritidsinteresser', example: 'Me gusta escuchar música, hacer deporte y ver series.' },
  { key: 'familia', label: '¿Cómo es tu familia?', hint: 'Familien din', example: 'Vivo con mi madre y mi hermano. Somos una familia pequeña.' },
  { key: 'opinion_redes', label: '¿Qué opinas de las redes sociales?', hint: 'Din mening om sosiale medier', example: 'En mi opinión, las redes sociales tienen ventajas y desventajas. Por un lado...' },
  { key: 'tradicion_favorita', label: '¿Cuál es tu tradición hispanohablante favorita?', hint: 'En tradisjon du vil snakke om', example: 'La tradición que más me interesa es el Día de los Muertos porque...' },
  { key: 'artista_favorito', label: '¿Qué artista o película hispanohablante conoces?', hint: 'Kunstner, film eller forfatter', example: 'Conozco a Frida Kahlo, una artista mexicana famosa por sus autorretratos...' },
  { key: 'problema_social', label: '¿Qué problema social te preocupa más?', hint: 'Et sosialt tema du bryr deg om', example: 'Me preocupa especialmente la desigualdad social porque...' },
  { key: 'planes_futuro', label: '¿Qué planes tienes para el futuro?', hint: 'Fremtidsplanene dine', example: 'Después del bachillerato, me gustaría estudiar en la universidad. Si pudiera elegir...' },
];

function getMyAnswers(): MyAnswers {
  if (typeof window === 'undefined') return defaultAnswers;
  try { return { ...defaultAnswers, ...JSON.parse(localStorage.getItem('spansk-mi-version') || '{}') }; }
  catch { return defaultAnswers; }
}

export default function MinVersjonPage() {
  const [answers, setAnswers] = useState<MyAnswers>(defaultAnswers);
  const [activeField, setActiveField] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => { setAnswers(getMyAnswers()); }, []);

  function update(key: keyof MyAnswers, value: string) {
    const next = { ...answers, [key]: value };
    setAnswers(next);
    localStorage.setItem('spansk-mi-version', JSON.stringify(next));
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  const filled = Object.values(answers).filter(v => v.trim().length > 0).length;

  return (
    <main className="max-w-lg mx-auto px-4 pt-6 pb-24">
      <h1 className="text-2xl font-black mb-1">✨ Min versjon</h1>
      <p className="text-sm text-deep/60 mb-2">
        Gjør svarene til DINE. Fyll inn om DEG — da sitter de fast!
      </p>
      <p className="text-xs text-ocean font-semibold mb-6">
        {filled}/{fields.length} felt fylt ut {filled === fields.length && '— du er klar! 🎉'}
      </p>

      <div className="space-y-4 mb-8">
        {fields.map((field) => {
          const isActive = activeField === field.key;
          const hasContent = answers[field.key].trim().length > 0;

          return (
            <div
              key={field.key}
              className={`bg-white rounded-2xl overflow-hidden transition-all shadow-sm ${
                hasContent ? 'border-2 border-success/30' : 'border-2 border-transparent'
              }`}
            >
              <button
                onClick={() => setActiveField(isActive ? null : field.key)}
                className="w-full flex items-center gap-3 p-4 text-left"
              >
                <span className="text-xl">{hasContent ? '✅' : '📝'}</span>
                <div className="flex-1">
                  <p className="font-bold text-sm italic text-coral">{field.label}</p>
                  <p className="text-xs text-deep/40">{field.hint}</p>
                </div>
                <span className={`transition-transform ${isActive ? 'rotate-180' : ''}`}>▾</span>
              </button>

              {isActive && (
                <div className="px-4 pb-4">
                  <div className="bg-peach rounded-xl p-3 mb-3">
                    <p className="text-xs text-deep/50 mb-1">💡 Eksempel:</p>
                    <p className="text-xs italic text-deep/70">{field.example}</p>
                  </div>
                  <textarea
                    value={answers[field.key]}
                    onChange={(e) => update(field.key, e.target.value)}
                    placeholder="Skriv ditt svar på spansk her..."
                    rows={3}
                    className="w-full bg-gray-50 rounded-xl px-4 py-3 text-sm border border-gray-200 focus:border-coral focus:outline-none resize-none"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {saved && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-success text-white px-4 py-2 rounded-full text-sm font-bold animate-bounce-in z-50">
          Lagret! ✓
        </div>
      )}

      <div className="bg-gradient-to-r from-ocean to-success text-white rounded-2xl p-5 mb-8">
        <p className="font-bold mb-2">Hvorfor dette hjelper:</p>
        <p className="text-sm opacity-90">
          Carlos sine svar er fine — men de er ikke dine. Når du fyller inn om DEG SELV,
          lager du svar som er ekte og som du husker under press.
          Sensor merker forskjellen mellom pugget og personlig!
        </p>
      </div>
    </main>
  );
}
