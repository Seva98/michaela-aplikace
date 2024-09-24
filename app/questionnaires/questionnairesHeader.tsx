import { cn } from '@/utils/cn';
const QuestionnairesHeader = ({ gridClass }: { gridClass: string }) => {
  return (
    <div className={cn(gridClass)}>
      {['Pořadí', '', 'Jméno', 'Email', 'Telefon', '', 'Akce'].map((title) => (
        <div key={title} className="font-bold text-sm text-gray-500">
          {title}
        </div>
      ))}
    </div>
  );
};

export default QuestionnairesHeader;
