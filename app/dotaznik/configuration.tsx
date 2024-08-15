import { updateAnswers, updateUserAnswers } from '@/db/answers/updateAnswers';
import { updateUser } from '@/db/users/updateUser';
import Question from './question';

const healthIssues = [
  'Bolesti hlavy',
  'Potíže se spánkem (jaké - vypište do poznámky)',
  'Průjem',
  'Zácpa',
  'Nadýmání',
  'Pálení žáhy',
  'Úzkost, deprese',
  'Výkyvy nálady',
  'Bolestivá menstruace',
  'Pravidelné projevy PMS (změny nálad, akné před menstruací, nervozita apod.)',
  'Akné',
  'Vypadávání vlasů',
  'Chutě',
  'Atypická bolest (místo a typ bolesti uvést v poznámce)',
  'Únava',
  'Bolest kloubů',
  'Ztuhlost nebo bolesti svalů',
];

export type Question = {
  text: string;
  description?: string;
  group?: string;
  answers?: string[];
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  name?: string;
  value?: string;
  type: 'info' | 'text' | 'number' | 'email' | 'date' | 'textarea' | 'rating' | 'singlechoice';
};

export const questions: Question[] = [
  {
    text: `### Úvodní slovo

Moc si vážím Vašeho zájmu o spoluprácí.
    
Mám pro Vás dotazník, který mí pomůže Vás co nejlépe Vás poznat a sestavit Vám nutriční plán na míru.
    
Děkuj za vyplnění a těším se na spolupráci,
    
Míša`,
    type: 'info',
  },
  {
    text: `### Osobní údaje
    
Nejprve potřebuji vědět kdo vlastně jste. :)`,
    group: 'PERSONAL',
    type: 'info',
  },
  { text: 'Jméno', group: 'PERSONAL', type: 'text', name: 'first_name', required: true, disabled: true },
  { text: 'Příjmení', group: 'PERSONAL', type: 'text', name: 'last_name', required: true, disabled: true },
  { text: 'E-mail', group: 'PERSONAL', type: 'email', name: 'email', required: true, disabled: true },
  { text: 'Telefon', group: 'PERSONAL', type: 'text', name: 'phone', required: true },
  { text: 'Datum narození', group: 'PERSONAL', type: 'date', name: 'birthday', required: true },
  {
    text: `### O Vás

Nyní se mi prosím představte a povězte mi něco o sobě.`,
    type: 'info',
  },
  {
    text: 'Z jakého důvodu jste se rozhodl/a mě oslovit?',
    type: 'textarea',
    name: 'reason',
    required: true,
  },
  {
    text: 'Jaké očekáváte výsledky po skončení naší spolupráce?',
    type: 'textarea',
    name: 'expectations',
    placeholder: 'Prosím buďte co nejkonkrétjnější',
    required: true,
  },
  {
    text: 'Jaké je Vaše zaměstnání?',
    type: 'singlechoice',
    name: 'job',
    answers: ['Pasivní, sedavé', 'Středně aktivní', 'Fyzicky náročné'],
    required: true,
  },
  {
    text: 'Kolik hodin týdně sportujete?',
    answers: ['Nesportuji', '1-3 hodiny týdně', '4-7 hodin týdně', '7 a více hodin týdně'],
    type: 'singlechoice',
    name: 'sport_hours',
    group: 'SPORT',
    required: true,
  },
  {
    text: 'O jaký druh pohybové aktivity se jedná?',
    type: 'textarea',
    placeholder: 'Pokud nesportujete, nemusíte vyplňovat',
    name: 'sport_type',
    group: 'SPORT',
    required: true,
  },
  {
    text: 'Kolik kroků denně přibližně nachodíte ?',
    answers: ['méně než 3000', '3000-6000', '6000-10000', '10000 a více'],
    placeholder: 'Můžete získat informace například z mobilní aplikace Google Fit (Android) nebo Zdraví (iOS). Pokud nevíte, nevadí.',
    name: 'steps',
    type: 'singlechoice',
    required: true,
  },
  { text: 'STRAVOVACÍ NÁVYKY', type: 'info' },
  {
    text: 'Která jídla nebo suroviny patří mezi Vaše nejoblíbenější?',
    type: 'textarea',
    name: 'favorite_foods',
    group: 'FOOD',
    required: true,
  },
  {
    text: 'Jsou nějaká jídla, která nemáte rád/a?',
    type: 'textarea',
    name: 'hated_foods',
    group: 'FOOD',
    required: true,
  },
  {
    text: 'Máte nějaké potravinové intolerance nebo alergie?',
    type: 'textarea',
    name: 'allergies',
    group: 'FOOD',
    required: true,
  },
  {
    text: 'Kde nakupujete potraviny?',
    type: 'text',
    name: 'shop',
    group: 'FOOD',
    placeholder: 'Např. LIDL, Albert, farmářský obchod atd.',
    required: true,
  },
  {
    text: 'Nakupujete primárně domácí nebo BIO potraviny?',
    answers: ['Ano', 'Občas', 'Je mi to jedno'],
    name: 'bio',
    type: 'singlechoice',
    required: true,
  },
  {
    text: 'Držel/a jste v poslední době nějakou dietu?',
    placeholder: 'Např: Byl jsem vegan poslední 2 roky.',
    name: 'diet',
    type: 'textarea',
    required: true,
  },
  {
    text: 'Míváte pravidelně chutě na sladké nebo slané?',
    answers: ['Ano, na sladké', 'Ano, na slané', 'Ano, na oboje', 'Ne, nemám'],
    name: 'cravings',
    type: 'singlechoice',
    required: true,
  },
  {
    text: 'Kolik litrů čisté vody denně vypijete?',
    answers: ['1-2 litry', '2-3 litry', '3 a více litrů'],
    type: 'singlechoice',
    name: 'water',
    group: 'DRINKS',
    required: true,
  },
  {
    text: 'Jaké nápoje nejčastějí pijete?',
    placeholder: 'Např: Každé ráno kafe s mlékem, přes den minerálky, čaj s medem, atd.',
    type: 'textarea',
    name: 'drinks',
    group: 'DRINKS',
    required: true,
  },
  {
    text: 'Kolikrát denně jíte?',
    answers: ['1-2x denně', '2-3x denně', '3-4x denně', '4-5x denně', '6x a více'],
    type: 'singlechoice',
    name: 'meals',
    group: 'MEALS',
    required: true,
  },
  { text: 'ZDRAVÍ', type: 'info' },
  {
    text: 'Máte nějaké aktuální zdravotní potíže?',
    placeholder: 'Např: Dlouhodobě se léčím s hypofunkcí štítné žlázy.',
    name: 'health_issues',
    type: 'textarea',
    required: true,
  },
  {
    text: 'Berete pravidelně nějaké léky?',
    placeholder: 'Např: Denně beru antikoncepci a léky na štítnou žlázu.',
    name: 'medications',
    type: 'textarea',
    required: true,
  },
  {
    text: 'Uživáte pravidelně nějaké doplňky stravy?',
    placeholder: 'Např: Denně beru Omega 3, Vitamín C a občas protein.',
    name: 'supplements',
    type: 'textarea',
    required: true,
  },
  {
    text: 'Kolik hodin denně spíte?',
    answers: ['méně než 6 hodin', '6-7 hodin', '7-8 hodin', '8 a více'],
    name: 'sleep',
    type: 'singlechoice',
    required: true,
  },
  {
    text: 'Subjektivní pocity v rámci zdraví',
    description: 'Popište prosím, jak se cítíte v rámci zdravotního stavu a fungování během dne, žádná interpretace není špatně',
    placeholder: 'Např: Po ránu jsem vždy unavená a večer se mi špatně usíná. Občas mě bolí kolena.',
    name: 'health_feelings',
    type: 'textarea',
    required: true,
  },
  {
    text: `### Následující symptomy ohodnoďte podle závažnosti

stupnice od 0 do 4

- 0 – žádné
- 1 – mírné
- 2 – střední
- 3 – silné
- 4 – závažné`,
    type: 'info',
  },
  ...healthIssues.map((issue, i) => ({
    text: issue,
    type: 'rating' as const,
    name: `health_issue_${i}`,
    required: true,
    group: `ZDRAVI${Math.floor(i / 5)}`,
  })),
  {
    text: 'Kouření, alkohol, jiné závislosti',
    description: 'množství (za den, za týden, za měsíc - zvolte vhodnou interpretaci)',
    name: 'addictions',
    type: 'textarea',
    required: true,
  },
  {
    text: 'Změnila se váha za poslední rok o více než 10%?',
    answers: ['Ano', 'Ne'],
    name: 'weight_change',
    type: 'singlechoice',
    required: true,
  },
  { text: 'Míry:', type: 'info', required: true },
  { text: 'Výška', type: 'number', required: true },
  { text: 'Váha', type: 'number', required: true },
  { text: 'Datum', type: 'date', required: true },
  { text: 'krk (míra v cm)', type: 'number', required: true },
  { text: 'hrudník (míra v cm)', type: 'number', required: true },
  { text: 'pas (míra v cm)', type: 'number', required: true },
  { text: 'boky (míra v cm)', type: 'number', required: true },
  { text: 'stehna (míra v cm)', type: 'number', required: true },
  { text: 'paže (míra v cm)', type: 'number', required: true },
];

export const groupQuestions = (questions: Question[]) => {
  const grouped = questions.reduce((acc, question) => {
    if (question.group) {
      const groupIndex = acc.findIndex((group) => group[0]?.group === question.group);
      if (groupIndex >= 0) {
        acc[groupIndex].push(question);
      } else {
        acc.push([question]);
      }
    } else {
      acc.push([question]);
    }
    return acc;
  }, [] as Question[][]);

  return grouped;
};

export const groupedQuestions = groupQuestions(questions);
