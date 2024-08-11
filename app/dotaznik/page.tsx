'use client';

import { LabeledInput } from '@/components/ui/input';
import Typography from '@/components/ui/typography';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/utils/cn';
import RatedInput from './ratedInput';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Markdown from '@/components/common/markdown';

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

type Question = {
  text: string;
  description?: string;
  group?: string;
  answers?: string[];
  placeholder?: string;
  type: 'info' | 'text' | 'number' | 'email' | 'date' | 'textarea' | 'rating' | 'multichoice';
};

const questions: Question[] = [
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
  { text: 'Jméno', group: 'PERSONAL', type: 'text' },
  { text: 'Příjmení', group: 'PERSONAL', type: 'text' },
  { text: 'Datum narození', group: 'PERSONAL', type: 'date' },
  { text: 'Telefon', group: 'PERSONAL', type: 'text' },
  { text: 'E-mail', group: 'PERSONAL', type: 'email' },
  {
    text: `### O Vás

Nyní se mi prosím představte a povězte mi něco o sobě.`,
    type: 'info',
  },
  {
    text: 'Z jakého důvodu jste se rozhodl/a mě oslovit?',
    type: 'textarea',
  },
  {
    text: 'Jaké očekáváte výsledky po skončení naší spolupráce?',
    type: 'textarea',
    placeholder: 'Prosím buďte co nejkonkrétjnější',
  },
  {
    text: 'Jaké je Vaše zaměstnání?',
    type: 'multichoice',
    answers: ['Pasivní, sedavé', 'Středně aktivní', 'Fyzicky náročné'],
  },
  {
    text: 'Kolik hodin týdně sportujete?',
    answers: ['Nesportuji', '1-3 hodiny týdně', '4-7 hodin týdně', '7 a více hodin týdně'],
    type: 'multichoice',
    group: 'SPORT',
  },
  {
    text: 'O jaký druh pohybové aktivity se jedná?',
    type: 'textarea',
    placeholder: 'Pokud nesportujete, nemusíte vyplňovat',
    group: 'SPORT',
  },
  {
    text: 'Kolik kroků denně přibližně nachodíte ?',
    answers: ['méně než 3000', '3000-6000', '6000-10000', '10000 a více'],
    placeholder: 'Můžete získat informace například z mobilní aplikace Google Fit (Android) nebo Zdraví (iOS). Pokud nevíte, nevadí.',
    type: 'multichoice',
  },
  { text: 'STRAVOVACÍ NÁVYKY', type: 'info' },
  {
    text: 'Která jídla nebo suroviny patří mezi Vaše nejoblíbenější?',
    type: 'textarea',
    group: 'FOOD',
  },
  {
    text: 'Jsou nějaká jídla, která nemáte rád/a?',
    type: 'textarea',
    group: 'FOOD',
  },
  {
    text: 'Máte nějaké potravinové intolerance nebo alergie?',
    type: 'textarea',
    group: 'FOOD',
  },
  { text: 'Kde nakupujete potraviny?', type: 'text', placeholder: 'Např. LIDL, Albert, farmářský obchod atd.' },
  {
    text: 'Nakupujete primárně domácí nebo BIO potraviny?',
    answers: ['Ano', 'Občas', 'Je mi to jedno'],
    type: 'multichoice',
  },
  {
    text: 'Držel/a jste v poslední době nějakou dietu?',
    placeholder: 'Např: Byl jsem vegan poslední 2 roky.',
    type: 'textarea',
  },
  {
    text: 'Míváte pravidelně chutě na sladké nebo slané?',
    answers: ['Ano, na sladké', 'Ano, na slané', 'Ano, na oboje', 'Ne, nemám'],
    type: 'multichoice',
  },
  {
    text: 'Kolik litrů čisté vody denně vypijete?',
    answers: ['1-2 litry', '2-3 litry', '3 a více litrů'],
    type: 'multichoice',
    group: 'DRINKS',
  },
  {
    text: 'Jaké nápoje nejčastějí pijete?',
    placeholder: 'Např: Každé ráno kafe s mlékem, přes den minerálky, čaj s medem, atd.',
    type: 'textarea',
    group: 'DRINKS',
  },
  {
    text: 'Kolikrát denně jíte?',
    answers: ['1-2x denně', '2-3x denně', '3-4x denně', '4-5x denně', '6x a více'],
    type: 'multichoice',
    group: 'MEALS',
  },
  { text: 'ZDRAVÍ', type: 'info' },
  {
    text: 'Máte nějaké aktuální zdravotní potíže?',
    placeholder: 'Např: Dlouhodobě se léčím s hypofunkcí štítné žlázy.',
    type: 'textarea',
  },
  {
    text: 'Berete pravidelně nějaké léky?',
    placeholder: 'Např: Denně beru antikoncepci a léky na štítnou žlázu.',
    type: 'textarea',
  },
  {
    text: 'Uživáte pravidelně nějaké doplňky stravy?',
    placeholder: 'Např: Denně beru Omega 3, Vitamín C a občas protein.',
    type: 'textarea',
  },
  {
    text: 'Kolik hodin denně spíte?',
    answers: ['méně než 6 hodin', '6-7 hodin', '7-8 hodin', '8 a více'],
    type: 'multichoice',
  },
  {
    text: 'Subjektivní pocity v rámci zdraví',
    description: 'Popište prosím, jak se cítíte v rámci zdravotního stavu a fungování během dne, žádná interpretace není špatně',
    placeholder: 'Např: Po ránu jsem vždy unavená a večer se mi špatně usíná. Občas mě bolí kolena.',
    type: 'textarea',
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
  ...healthIssues.map((issue, i) => ({ text: issue, type: 'rating' as const, group: `ZDRAVI${Math.floor(i / 5)}` })),
  {
    text: 'Kouření, alkohol, jiné závislosti',
    description: 'množství (za den, za týden, za měsíc - zvolte vhodnou interpretaci)',
    type: 'textarea',
  },
  {
    text: 'Změnila se váha za poslední rok o více než 10%?',
    description: '◦ Ano\n◦ Ne',
    type: 'multichoice',
  },
  { text: 'Míry:', type: 'info' },
  { text: 'Výška', type: 'number' },
  { text: 'Váha', type: 'number' },
  { text: 'Datum', type: 'date' },
  { text: 'krk (míra v cm)', type: 'number' },
  { text: 'hrudník (míra v cm)', type: 'number' },
  { text: 'pas (míra v cm)', type: 'number' },
  { text: 'boky (míra v cm)', type: 'number' },
  { text: 'stehna (míra v cm)', type: 'number' },
  { text: 'paže (míra v cm)', type: 'number' },
];

const groupQuestions = (questions: Question[]) => {
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

const groupedQuestions = groupQuestions(questions);

const Questionnaire = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const totalQuestions = groupedQuestions.length;
  const currentQuestionIndex = Object.values(groupedQuestions).slice(0, currentPage).flat().length + 1;

  const handleNext = () => {
    if (currentPage < totalQuestions - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    event.preventDefault();
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown' || event.key === 'Enter') {
      if (!(event.shiftKey && event.key === 'Enter')) {
        handleNext();
      }
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp' || (event.shiftKey && event.key === 'Enter')) {
      handlePrevious();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  const renderQuestion = (question: Question) => {
    switch (question.type) {
      case 'text':
      case 'email':
      case 'number':
      case 'date':
        return <LabeledInput label={question.text} type={question.type} description={question.description} isQuestionnaire />;
      case 'textarea':
        return (
          <div className="flex flex-col  text-center">
            <Label className={cn('text-md  font-semibold text-muted-foreground', 'mb-1')}>{question.text}</Label>
            {question.description && (
              <Typography variant="small" className="text-gray-700 text-sm mb-1">
                {question.description}
              </Typography>
            )}
            <Textarea rows={6} placeholder={question.placeholder}></Textarea>
          </div>
        );
      case 'info':
        return <Markdown content={question.text} />;
      case 'rating':
        return <RatedInput name={question.text} label={question.text} />;
      case 'multichoice':
        return <LabeledInput label={question.text} type="select" isQuestionnaire />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col p-8 h-screen w-screen justify-between items-center">
      <Typography variant="h1">Vstupní dotázník</Typography>
      <div className="relative w-full max-w-md flex items-center">
        {groupedQuestions.map((questions, index) => (
          <div
            key={index}
            className={cn('absolute w-full transition-all duration-700 ease-in-out transform ', {
              'opacity-0 -translate-y-[40vh] pointer-events-none': index < currentPage,
              'opacity-0 translate-y-[40vh] pointer-events-none': index > currentPage,
            })}
          >
            <div className="flex flex-col gap-3">
              {questions.map((question, questionIndex) => (
                <div key={questionIndex}>{renderQuestion(question)}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-4 justify-between w-full mt-8">
        <Button className="w-fit" variant="secondary" onClick={handlePrevious} disabled={currentPage === 0}>
          Zpět ⬆️
        </Button>
        <div className="text-center">
          <Typography>
            Otázka {currentPage + 1} z {totalQuestions}
          </Typography>
          <Progress className="w-[200px]" value={currentPage + 1} max={totalQuestions} />
        </div>
        <Button className="w-fit" onClick={handleNext} disabled={currentPage === totalQuestions - 1}>
          Další ⬇️
        </Button>
      </div>
    </div>
  );
};

export default Questionnaire;
