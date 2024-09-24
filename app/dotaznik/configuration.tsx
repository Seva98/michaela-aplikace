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
export enum QuestionKey {
  TEXT = 'text',
  DESCRIPTION = 'description',
  GROUP = 'group',
  ANSWERS = 'answers',
  PLACEHOLDER = 'placeholder',
  REQUIRED = 'required',
  DISABLED = 'disabled',
  NAME = 'name',
  VALUE = 'value',
  TYPE = 'type',
  KEY = 'key',
}

export type Question = {
  [QuestionKey.TEXT]: string;
  [QuestionKey.DESCRIPTION]?: string;
  [QuestionKey.GROUP]?: string;
  [QuestionKey.ANSWERS]?: string[];
  [QuestionKey.PLACEHOLDER]?: string;
  [QuestionKey.REQUIRED]?: boolean;
  [QuestionKey.DISABLED]?: boolean;
  [QuestionKey.NAME]?: string;
  [QuestionKey.VALUE]?: string;
  [QuestionKey.TYPE]: QuestionType;
};

export enum QuestionType {
  INFO = 'info',
  TEXT = 'text',
  NUMBER = 'number',
  EMAIL = 'email',
  PHONE = 'tel',
  DATE = 'date',
  TEXTAREA = 'textarea',
  RATING = 'rating',
  SINGLECHOICE = 'singlechoice',
  SPECIAL = 'special',
}

export const questions: Question[] = [
  {
    text: `### Úvodní slovo

Moc si vážím Vašeho zájmu o spoluprácí.
    
Mám pro Vás dotazník, který mí pomůže Vás co nejlépe Vás poznat a sestavit Vám nutriční plán na míru.
    
Děkuj za vyplnění a těším se na spolupráci,
    
Míša`,
    type: QuestionType.INFO,
  },
  {
    text: `### Osobní údaje
    
Nejprve potřebuji vědět kdo vlastně jste. :)`,
    group: 'PERSONAL',
    type: QuestionType.INFO,
  },
  { text: 'Jméno', group: 'PERSONAL', type: QuestionType.TEXT, name: 'first_name', required: true, disabled: true },
  { text: 'Příjmení', group: 'PERSONAL', type: QuestionType.TEXT, name: 'last_name', required: true, disabled: true },
  { text: 'E-mail', group: 'PERSONAL', type: QuestionType.EMAIL, name: 'email', required: true, disabled: true },
  { text: 'Telefon', group: 'PERSONAL', type: QuestionType.TEXT, name: 'phone', required: true },
  { text: 'Datum narození', group: 'PERSONAL', type: QuestionType.DATE, name: 'birthday', required: true },
  {
    text: `### O Vás

Nyní se mi prosím představte a povězte mi něco o sobě.`,
    type: QuestionType.INFO,
  },
  {
    text: 'Z jakého důvodu jste se rozhodl/a mě oslovit?',
    type: QuestionType.TEXTAREA,
    name: 'reason',
    required: true,
  },
  {
    text: 'Jaké očekáváte výsledky po skončení naší spolupráce?',
    type: QuestionType.TEXTAREA,
    name: 'expectations',
    placeholder: 'Prosím buďte co nejkonkrétjnější',
    required: true,
  },
  {
    text: 'Jaké je Vaše zaměstnání?',
    type: QuestionType.SINGLECHOICE,
    name: 'job',
    answers: ['Pasivní, sedavé', 'Středně aktivní', 'Fyzicky náročné'],
    required: true,
  },
  {
    text: 'Kolik hodin týdně sportujete?',
    answers: ['Nesportuji', '1-3 hodiny týdně', '4-7 hodin týdně', '7 a více hodin týdně'],
    type: QuestionType.SINGLECHOICE,
    name: 'sport_hours',
    group: 'SPORT',
    required: true,
  },
  {
    text: 'O jaký druh pohybové aktivity se jedná?',
    type: QuestionType.TEXTAREA,
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
    type: QuestionType.SINGLECHOICE,
    required: true,
  },
  { text: 'STRAVOVACÍ NÁVYKY', type: QuestionType.INFO },
  {
    text: 'Která jídla nebo suroviny patří mezi Vaše nejoblíbenější?',
    type: QuestionType.TEXTAREA,
    name: 'favorite_foods',
    group: 'FOOD',
    required: true,
  },
  {
    text: 'Jsou nějaká jídla, která nemáte rád/a?',
    type: QuestionType.TEXTAREA,
    name: 'hated_foods',
    group: 'FOOD',
    required: true,
  },
  {
    text: 'Máte nějaké potravinové intolerance nebo alergie?',
    type: QuestionType.TEXTAREA,
    name: 'allergies',
    group: 'FOOD',
    required: true,
  },
  {
    text: 'Kde nakupujete potraviny?',
    type: QuestionType.TEXT,
    name: 'shop',
    group: 'FOOD',
    placeholder: 'Např. LIDL, Albert, farmářský obchod atd.',
    required: true,
  },
  {
    text: 'Nakupujete primárně domácí nebo BIO potraviny?',
    answers: ['Ano', 'Občas', 'Je mi to jedno'],
    name: 'bio',
    type: QuestionType.SINGLECHOICE,
    required: true,
  },
  {
    text: 'Držel/a jste v poslední době nějakou dietu?',
    placeholder: 'Např: Byl jsem vegan poslední 2 roky.',
    name: 'diet',
    type: QuestionType.TEXTAREA,
    required: true,
  },
  {
    text: 'Míváte pravidelně chutě na sladké nebo slané?',
    answers: ['Ano, na sladké', 'Ano, na slané', 'Ano, na oboje', 'Ne, nemám'],
    name: 'cravings',
    type: QuestionType.SINGLECHOICE,
    required: true,
  },
  {
    text: 'Kolik litrů čisté vody denně vypijete?',
    answers: ['1-2 litry', '2-3 litry', '3 a více litrů'],
    type: QuestionType.SINGLECHOICE,
    name: 'water',
    group: 'DRINKS',
    required: true,
  },
  {
    text: 'Jaké nápoje nejčastějí pijete?',
    placeholder: 'Např: Každé ráno kafe s mlékem, přes den minerálky, čaj s medem, atd.',
    type: QuestionType.TEXTAREA,
    name: 'drinks',
    group: 'DRINKS',
    required: true,
  },
  {
    text: 'Kolikrát denně jíte?',
    answers: ['1-2x denně', '2-3x denně', '3-4x denně', '4-5x denně', '6x a více'],
    type: QuestionType.SINGLECHOICE,
    name: 'meals',
    group: 'MEALS',
    required: true,
  },
  { text: 'ZDRAVÍ', type: QuestionType.INFO },
  {
    text: 'Máte nějaké aktuální zdravotní potíže?',
    placeholder: 'Např: Dlouhodobě se léčím s hypofunkcí štítné žlázy.',
    name: 'health_issues',
    type: QuestionType.TEXTAREA,
    required: true,
  },
  {
    text: 'Berete pravidelně nějaké léky?',
    placeholder: 'Např: Denně beru antikoncepci a léky na štítnou žlázu.',
    name: 'medications',
    type: QuestionType.TEXTAREA,
    required: true,
  },
  {
    text: 'Uživáte pravidelně nějaké doplňky stravy?',
    placeholder: 'Např: Denně beru Omega 3, Vitamín C a občas protein.',
    name: 'supplements',
    type: QuestionType.TEXTAREA,
    required: true,
  },
  {
    text: 'Kolik hodin denně spíte?',
    answers: ['méně než 6 hodin', '6-7 hodin', '7-8 hodin', '8 a více'],
    name: 'sleep',
    type: QuestionType.SINGLECHOICE,
    required: true,
  },
  {
    text: 'Subjektivní pocity v rámci zdraví',
    description: 'Popište prosím, jak se cítíte v rámci zdravotního stavu a fungování během dne, žádná interpretace není špatně',
    placeholder: 'Např: Po ránu jsem vždy unavená a večer se mi špatně usíná. Občas mě bolí kolena.',
    name: 'health_feelings',
    type: QuestionType.TEXTAREA,
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
    type: QuestionType.INFO,
  },
  ...healthIssues.map((issue, i) => ({
    text: issue,
    type: QuestionType.RATING as const,
    name: `health_issue_${i}`,
    required: true,
    group: `ZDRAVI${Math.floor(i / 5)}`,
  })),
  {
    text: 'Kouření, alkohol, jiné závislosti',
    description: 'množství (za den, za týden, za měsíc - zvolte vhodnou interpretaci)',
    name: 'addictions',
    type: QuestionType.TEXTAREA,
    required: true,
  },
  {
    text: 'Změnila se váha za poslední rok o více než 10%?',
    answers: ['Ano', 'Ne'],
    name: 'weight_change',
    type: QuestionType.SINGLECHOICE,
    required: true,
  },
  { text: 'Míry:', type: QuestionType.INFO, required: true },
  { text: 'Výška', type: QuestionType.NUMBER, required: true },
  { text: 'Váha', type: QuestionType.NUMBER, required: true },
  { text: 'Datum', type: QuestionType.DATE, required: true },
  { text: 'krk (míra v cm)', type: QuestionType.NUMBER, required: true },
  { text: 'hrudník (míra v cm)', type: QuestionType.NUMBER, required: true },
  { text: 'pas (míra v cm)', type: QuestionType.NUMBER, required: true },
  { text: 'boky (míra v cm)', type: QuestionType.NUMBER, required: true },
  { text: 'stehna (míra v cm)', type: QuestionType.NUMBER, required: true },
  { text: 'paže (míra v cm)', type: QuestionType.NUMBER, required: true },
];
