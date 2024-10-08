import { getAnswersById } from '@/db/answers/getAnswers';
import { AnswerParams } from './page';
import { Question } from '@/app/dotaznik/configuration';
import Typography from '@/components/ui/typography';

const FormattedAnswers = async ({ params }: AnswerParams) => {
  const parsedId = parseInt(params.answer_id);
  const { answer } = await getAnswersById(parsedId);
  const questions = JSON.parse(answer) as Question[][];

  return (
    <div className="flex flex-col gap-2  shadow-lg w-full  border border-gray-100 p-4 max-w-3xl  mx-auto">
      {questions.map((group, i) => (
        <div key={`question-group-${i}`}>
          {group.some((q) => q.type !== 'info') && <Typography className="text-teal-800/60">Strana #{i}</Typography>}
          <div className="flex flex-col gap-2">
            {group
              .filter((q) => q.type !== 'info')
              .map(({ text, value }, j) => (
                <div key={`answer-${i}`}>
                  <Typography variant="h5">
                    {j + 1}. {text}
                  </Typography>
                  <Typography className="ml-4">{value}</Typography>
                </div>
              ))}
            {i > 0 && <hr />}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FormattedAnswers;
