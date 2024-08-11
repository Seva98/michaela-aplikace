'use client';

import { LabeledInput } from '@/components/ui/input';
import Typography from '@/components/ui/typography';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/utils/cn';

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
  type: 'info' | 'text' | 'number' | 'email' | 'date' | 'textarea' | 'rating' | 'multichoice';
};

const questions: Question[] = [
  { text: 'Osobní údaje', group: 'PERSONAL', type: 'info' },
  { text: 'Jméno', group: 'PERSONAL', type: 'text' },
  { text: 'Příjmení', group: 'PERSONAL', type: 'text' },
  { text: 'Datum narození', group: 'PERSONAL', type: 'date' },
  { text: 'Kontaktní údaje', group: 'CONTACT', type: 'info' },
  { text: 'Telefon', group: 'CONTACT', type: 'text' },
  { text: 'E-mail', group: 'CONTACT', type: 'email' },
  {
    text: 'Z jakého důvodu ses rozhodl/a mě oslovit?',
    type: 'textarea',
  },
  {
    text: 'Jaké očekáváš výsledky po skončení naší spolupráce?',
    description: 'Definujte prosím co nejkonkrétněji, dejte si záležet',
    type: 'textarea',
  },
  {
    text: 'Zaměstnání',
    description: '◦ Pasivní, sedím celý den\n◦ Středně aktivní\n◦ Aktivní, celý den se hýbu',
    type: 'multichoice',
  },
  {
    text: 'Počet hodin sportu týdně?',
    description: '◦ Nesportuji\n◦ 1-3 hodiny týdně\n◦ 4-7 hodin týdně\n◦ 7 a více hodin týdně',
    type: 'multichoice',
  },
  { text: 'O jaký pohybové aktivity', type: 'textarea' },
  {
    text: 'Počet kroků za den',
    description: '• méně než 3000\n• 3000-6000\n• 6000-10000\n• 10000 a více',
    type: 'multichoice',
  },
  { text: 'STRAVOVACÍ NÁVYKY', type: 'info' },
  {
    text: 'Jaké jsou vaše chuťové preference',
    description: 'příklad: sladké snídaně, nejím houby',
    type: 'textarea',
  },
  { text: 'Kde nakupujete potraviny', type: 'text' },
  {
    text: 'Jaké zdroje ovoce a zeleniny využíváte',
    description: 'zahrada, obchod, farmářské trhy',
    type: 'text',
  },
  {
    text: 'Jste vegan nebo vegetarián?',
    description: '◦ Ne\n◦ Jsem vegetarián\n◦ Jsem vegan',
    type: 'multichoice',
  },
  {
    text: 'Míváte chutě na sladké/slané?',
    description: '◦ Ne\n◦ Ano, během dne\n◦ Ano, spíše večer',
    type: 'multichoice',
  },
  {
    text: 'Kolik litru denně vypijete?',
    description: '◦ 1-2 litry\n◦ 2-3 litry\n◦ 3 a více litrů',
    type: 'multichoice',
  },
  {
    text: 'Co pijete?',
    description: '◦ Vodu\n◦ Slazené nápoje\n◦ Zero nápoje\n◦ Čaje\n◦ Káva\n◦ Káva s mlékem\n◦ Sladím kávu/čaj',
    type: 'multichoice',
  },
  {
    text: 'Kolikrát denně jíte?',
    description: '◦ 1-2x denně\n◦ 2-3x denně\n◦ 3-4x denně\n◦ 4-5x denně\n◦ 6x a více',
    type: 'multichoice',
  },
  {
    text: 'Popište svůj denní stravovací režim',
    description: 'co, kolik a kdy jíte?',
    type: 'textarea',
  },
  { text: 'Alergeny, které nesmím', type: 'textarea' },
  { text: 'ZDRAVÍ', type: 'info' },
  {
    text: 'Diagnóza/zdravotní potíže',
    description: 'vypište vše, s čím se léčíte, případně jste se léčil/la včetně přibližného data, kdy problémy začaly a skončily, případně uveďte, že trvají',
    type: 'textarea',
  },
  { text: 'Prodělané zákroky', type: 'textarea' },
  {
    text: 'Medikace',
    description: 'včetně hormonální antikoncepce/ tělíska',
    type: 'textarea',
  },
  {
    text: 'Suplementace',
    description: 'Doplňky výživy, vitámíny, minerály a další',
    type: 'textarea',
  },
  {
    text: 'Subjektivní pocity v rámci zdraví',
    description: 'Popište prosím, jak se cítíte v rámci zdravotního stavu a fungování během dne, žádná interpretace není špatně',
    type: 'textarea',
  },
  {
    text: 'Následující symptomy ohodnoďte podle závažnosti',
    description: 'stupnice od 0 do 4 (0 – žádné, 1 – mírné, 2 – střední, 3 – silné, 4 – závažné)',
    type: 'info',
  },
  ...healthIssues.map((issue, i) => ({ text: issue, type: 'rating' as const })),
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
    if (currentPage < groupedQuestions.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const renderQuestion = (question: Question) => {
    switch (question.type) {
      case 'text':
      case 'email':
      case 'number':
      case 'date':
        return <LabeledInput label={question.text} type={question.type} description={question.description} isQuestionnaire />;
      case 'textarea':
        return <LabeledInput label={question.text} type="textarea" description={question.description} isQuestionnaire />;
      case 'info':
        return <Typography variant="h3">{question.text}</Typography>;
      case 'rating':
        return <LabeledInput label={question.text} type="rating" isQuestionnaire />;
      case 'multichoice':
        return <LabeledInput label={question.text} type="select" isQuestionnaire />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col p-8 h-screen w-screen justify-between items-center">
      <Typography variant="h1">Vstupní dotázník</Typography>
      <div className="relative w-full max-w-md">
        {groupedQuestions.map((questions, index) => (
          <div
            key={index}
            className={cn('absolute w-full transition-all duration-700 ease-in-out transform', {
              'opacity-100 translate-y-0': index === currentPage,
              'opacity-0 -translate-y-[40vh] pointer-events-none': index < currentPage,
              'opacity-0 translate-y-[40vh] pointer-events-none': index > currentPage,
            })}
          >
            {questions.map((question, questionIndex) => (
              <div key={questionIndex} className="flex flex-col gap-2">
                {renderQuestion(question)}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="flex gap-4 justify-between w-full mt-8">
        <Button className="w-fit" variant="secondary" onClick={handlePrevious} disabled={currentPage === 0}>
          Zpět ⬆️
        </Button>
        <div className="text-center">
          <Typography>
            Otázka {currentQuestionIndex} z {totalQuestions}
          </Typography>
          <Progress className="w-[200px]" value={currentQuestionIndex} max={totalQuestions} />
        </div>
        <Button className="w-fit" onClick={handleNext} disabled={currentPage === groupedQuestions.length - 1}>
          Další ⬇️
        </Button>
      </div>
    </div>
  );
};

export default Questionnaire;
