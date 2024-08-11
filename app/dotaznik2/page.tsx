import Section from '@/components/containers/section';
import RatedInput from '../dotaznik/ratedInput';
import Typography from '@/components/ui/typography';
import { Button } from '@/components/ui/button';

const Page2 = () => {
  return (
    <Section className="flex items-center justify-center h-screen" title="">
      <Typography variant="h4">Teď se tě zeptám na 20 rychlých otázek ohledně zdarví</Typography>
      <Button variant={'outline'}>Přejít na otázky</Button>
    </Section>
  );
};

export default Page2;
