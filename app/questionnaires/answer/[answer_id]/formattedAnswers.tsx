import { getAnswersById } from '@/db/answers/getAnswers';
import { AnswerParams } from './page';
import { Question } from '@/app/profile/questionnaire/configuration';
import Typography from '@/components/ui/typography';
import Card from '@/components/ui/card';

const FormattedAnswers = async ({ params }: AnswerParams) => {
  const { answer_id } = await params;
  const parsedId = parseInt(answer_id);
  const { answer } = await getAnswersById(parsedId);
  const questions = JSON.parse(answer) as Question[][];

  return (
    <div className="flex flex-col gap-4 w-full max-w-3xl  mx-auto">
      {questions.map((group, i) => (
        <Card key={`question-group-${i}`}>
          <Typography className="text-teal-800/60">Strana #{i + 1}</Typography>
          {group.some((q) => q.type !== 'info') ? (
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
            </div>
          ) : (
            <Typography variant="muted">Pouze info strana</Typography>
          )}
        </Card>
      ))}
    </div>
  );
};

export default FormattedAnswers;
