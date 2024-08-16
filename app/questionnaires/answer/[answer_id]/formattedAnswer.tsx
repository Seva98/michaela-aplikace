import { getAnswersById } from '@/db/answers/getAnswers';
import { AnswerParams } from './page';
import { Question } from '@/app/dotaznik/configuration';
import Typography from '@/components/ui/typography';

const FormattedAnswer = async ({ params }: AnswerParams) => {
  const parsedId = parseInt(params.answer_id);
  const { answer } = await getAnswersById(parsedId);
  const parsedAnswer = JSON.parse(answer) as Question[];

  return (
    <div className="flex flex-col gap-2  shadow-lg w-full  border border-gray-100 p-4 max-w-3xl  mx-auto">
      {parsedAnswer
        .filter((a) => a.type !== 'info')
        .map(({ text, value }, i) => (
          <div key={`answer-${i}`}>
            <Typography variant="h5">
              {i + 1}. {text}
            </Typography>
            <Typography className="ml-4">{value}</Typography>
          </div>
        ))}
    </div>
  );
};

export default FormattedAnswer;
