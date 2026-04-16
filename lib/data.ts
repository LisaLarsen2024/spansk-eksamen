export const episodes = [
  { id: 1, title: "Hva er muntlig eksamen?", emoji: "🎯", desc: "Eksakt hva som skjer — steg for steg", duration: "8 min" },
  { id: 2, title: "Hva sensor leter etter", emoji: "🔍", desc: "Kompetansemål + karakter 2, 4 og 6", duration: "8 min" },
  { id: 3, title: "Verktøykassa", emoji: "🧰", desc: "Fraser som redder deg — med drill!", duration: "10 min" },
  { id: 4, title: "Grammatikken som teller", emoji: "📐", desc: "Bare det som gir uttelling", duration: "9 min" },
  { id: 5, title: "Mi vida — Livet mitt", emoji: "💬", desc: "Presentere deg selv, sosiale medier, Norge vs. Spania", duration: "7 min" },
  { id: 6, title: "Historia — Kolonisering", emoji: "🏛️", desc: "De store linjene + refleksjon", duration: "7 min" },
  { id: 7, title: "Cultura — Tradisjoner", emoji: "🎉", desc: "Día de los Muertos, mat, musikk", duration: "8 min" },
  { id: 8, title: "Arte — Kunst og film", emoji: "🎨", desc: "Picasso, Almodóvar, García Márquez", duration: "8 min" },
  { id: 9, title: "Sociedad — Samfunn", emoji: "✊", desc: "Ulikhet, feminisme, migrasjon", duration: "7 min" },
  { id: 10, title: "Medio ambiente — Miljø", emoji: "🌍", desc: "Klima, Amazonas, fremtidsplaner", duration: "7 min" },
  { id: 11, title: "Forberedelsesdagen", emoji: "📋", desc: "Slik bruker du de 24 timene", duration: "7 min" },
  { id: 12, title: "Eksamensdagen", emoji: "🎤", desc: "Fra du våkner til du får karakter", duration: "10 min" },
];

export interface FlashCard {
  es: string;
  no: string;
  category: string;
}

export const flashcards: FlashCard[] = [
  // Meninger
  { es: "En mi opinión...", no: "Etter min mening...", category: "mening" },
  { es: "Yo creo que...", no: "Jeg mener at...", category: "mening" },
  { es: "Me parece que...", no: "Jeg synes at...", category: "mening" },
  { es: "Desde mi punto de vista...", no: "Fra mitt synspunkt...", category: "mening" },
  { es: "Estoy de acuerdo", no: "Jeg er enig", category: "mening" },
  { es: "No estoy de acuerdo porque...", no: "Jeg er uenig fordi...", category: "mening" },
  // Argumentasjon
  { es: "Por un lado... por otro lado...", no: "På den ene siden... på den andre...", category: "argument" },
  { es: "En primer lugar... en segundo lugar...", no: "For det første... for det andre...", category: "argument" },
  { es: "Además...", no: "Dessuten...", category: "argument" },
  { es: "Sin embargo...", no: "Likevel...", category: "argument" },
  { es: "Aunque...", no: "Selv om...", category: "argument" },
  { es: "Por eso...", no: "Derfor...", category: "argument" },
  { es: "Ya que... / Debido a que...", no: "Ettersom... / På grunn av at...", category: "argument" },
  { es: "Por ejemplo...", no: "For eksempel...", category: "argument" },
  // Sammenligning
  { es: "En comparación con Noruega...", no: "Sammenlignet med Norge...", category: "sammenlign" },
  { es: "A diferencia de...", no: "Til forskjell fra...", category: "sammenlign" },
  { es: "Mientras que en Noruega..., en España...", no: "Mens man i Norge..., i Spania...", category: "sammenlign" },
  { es: "Tanto en Noruega como en España...", no: "Både i Norge og i Spania...", category: "sammenlign" },
  { es: "Es similar a...", no: "Det ligner på...", category: "sammenlign" },
  // Avslutning
  { es: "En conclusión...", no: "Avslutningsvis...", category: "avslutt" },
  { es: "Para resumir...", no: "For å oppsummere...", category: "avslutt" },
  { es: "Personalmente, creo que...", no: "Personlig mener jeg at...", category: "avslutt" },
  { es: "Lo más importante es que...", no: "Det viktigste er at...", category: "avslutt" },
  // Redning
  { es: "¿Puede repetir la pregunta, por favor?", no: "Kan du gjenta spørsmålet?", category: "redning" },
  { es: "Déjeme pensar un momento...", no: "La meg tenke et øyeblikk...", category: "redning" },
  { es: "No conozco la palabra exacta, pero lo que quiero decir es que...", no: "Jeg kjenner ikke ordet, men det jeg vil si er...", category: "redning" },
  { es: "Buena pregunta. A ver...", no: "Godt spørsmål. La meg se...", category: "redning" },
  { es: "Es decir...", no: "Det vil si...", category: "redning" },
  { es: "¿Cómo se dice... en español?", no: "Hvordan sier man... på spansk?", category: "redning" },
  // Nøkkelord — temaer
  { es: "las redes sociales", no: "sosiale medier", category: "ordbank" },
  { es: "la desigualdad", no: "ulikheten", category: "ordbank" },
  { es: "los pueblos indígenas", no: "urfolkene", category: "ordbank" },
  { es: "la colonización", no: "koloniseringen", category: "ordbank" },
  { es: "el cambio climático", no: "klimaendringene", category: "ordbank" },
  { es: "la igualdad de género", no: "likestilling", category: "ordbank" },
  { es: "el patrimonio cultural", no: "kulturarven", category: "ordbank" },
  { es: "el medio ambiente", no: "miljøet", category: "ordbank" },
  { es: "la salud mental", no: "den psykiske helsen", category: "ordbank" },
  { es: "los derechos humanos", no: "menneskerettighetene", category: "ordbank" },
  { es: "la deforestación", no: "avskogingen", category: "ordbank" },
  { es: "la inmigración", no: "innvandringen", category: "ordbank" },
  { es: "la pobreza", no: "fattigdommen", category: "ordbank" },
  { es: "la dictadura", no: "diktaturet", category: "ordbank" },
  { es: "la libertad de expresión", no: "ytringsfriheten", category: "ordbank" },
  { es: "la Guerra Civil", no: "borgerkrigen", category: "ordbank" },
  { es: "independizarse", no: "å bli selvstendig", category: "ordbank" },
  { es: "el Día de los Muertos", no: "de dødes dag", category: "ordbank" },
  { es: "las corridas de toros", no: "tyrefekting", category: "ordbank" },
  { es: "el maltrato animal", no: "dyremishandling", category: "ordbank" },
  { es: "la sostenibilidad", no: "bærekraft", category: "ordbank" },
  { es: "Me gustaría...", no: "Jeg ville gjerne...", category: "ordbank" },
  { es: "Si pudiera...", no: "Hvis jeg kunne...", category: "ordbank" },
  { es: "Es importante que...", no: "Det er viktig at...", category: "ordbank" },
];

export const mockExams = [
  {
    tema: "Cultura y tradiciones",
    intro: "Du har fått temaet: Kultur og tradisjoner i den spansktalende verden.",
    spørsmål: [
      "Háblame de una tradición importante en un país hispanohablante.",
      "¿Qué diferencias hay entre las fiestas en España y en Noruega?",
      "¿Qué opinas sobre las corridas de toros?",
      "¿Qué papel juega la gastronomía en la cultura española?",
      "¿Conoces algún tipo de música del mundo hispanohablante?",
    ]
  },
  {
    tema: "Historia y sociedad",
    intro: "Du har fått temaet: Historie og samfunn i den spansktalende verden.",
    spørsmål: [
      "¿Qué sabes sobre la colonización de América Latina?",
      "¿Cómo es la situación de los pueblos indígenas hoy en día?",
      "¿Qué sabes sobre la Guerra Civil Española?",
      "¿Cuáles son los mayores problemas sociales en los países hispanohablantes?",
      "¿Puedes comparar la situación social en un país hispanohablante con Noruega?",
    ]
  },
  {
    tema: "Medio ambiente y futuro",
    intro: "Du har fått temaet: Miljø og fremtid.",
    spørsmål: [
      "¿Cuáles son los problemas medioambientales más graves en Latinoamérica?",
      "¿Qué podemos hacer como individuos para proteger el medio ambiente?",
      "¿Qué planes tienes para el futuro?",
      "¿Crees que los jóvenes de hoy tienen más estrés que antes?",
      "Si pudieras cambiar algo en el mundo, ¿qué cambiarías?",
    ]
  },
];

export const dagplan = [
  {
    dag: 1,
    tittel: "Bli kjent med eksamen",
    emoji: "🎯",
    oppgaver: [
      "Lytt til Episode 1 og 2 (16 min)",
      "Skriv ned 3 ting du IKKE visste om eksamen",
      "Les gjennom kompetansemålene — hvilke kan du?",
    ]
  },
  {
    dag: 2,
    tittel: "Frasene som redder deg",
    emoji: "🧰",
    oppgaver: [
      "Lytt til Episode 3 — gjenta HØYT etter Carlos!",
      "Drill 10 flashcards (gjør minst 2 runder)",
      "Si 5 fraser høyt foran speilet",
    ]
  },
  {
    dag: 3,
    tittel: "Grammatikk-boost",
    emoji: "📐",
    oppgaver: [
      "Lytt til Episode 4",
      "Skriv 3 setninger med \"me gustaría\"",
      "Skriv 3 setninger med \"en mi opinión\"",
      "Si dem høyt — ta opp og hør!",
    ]
  },
  {
    dag: 4,
    tittel: "Temaer: Mitt liv + Historie",
    emoji: "💬",
    oppgaver: [
      "Lytt til Episode 5 og 6",
      "Lag DINE egne svar på 3 spørsmål",
      "Drill 10 nye flashcards",
      "Øv på å presentere deg selv — 2 min, på spansk",
    ]
  },
  {
    dag: 5,
    tittel: "Temaer: Kultur + Kunst",
    emoji: "🎨",
    oppgaver: [
      "Lytt til Episode 7 og 8",
      "Velg ÉN tradisjon og ÉN kunstner du vil snakke om",
      "Skriv 5 stikkord om hver",
      "Si det høyt i 2 minutter per tema",
    ]
  },
  {
    dag: 6,
    tittel: "Temaer: Samfunn + Miljø",
    emoji: "🌍",
    oppgaver: [
      "Lytt til Episode 9 og 10",
      "Drill alle flashcards (full runde!)",
      "Skriv dine fremtidsplaner på spansk (5 setninger)",
    ]
  },
  {
    dag: 7,
    tittel: "MOCK-EKSAMEN!",
    emoji: "🎤",
    oppgaver: [
      "Lytt til Episode 11 og 12",
      "Gjør en hel mock-eksamen (bruk treningsmodus!)",
      "Be noen stille deg spørsmål fra mock-arket",
      "Sov godt — du er klar!",
    ]
  },
];
