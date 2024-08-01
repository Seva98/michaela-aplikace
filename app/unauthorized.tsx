import Section from '@/components/containers/section';
import Typography from '@/components/ui/typography';

const Unauthorized = () => {
  return (
    <Section title="Neznámy klient">
      <Typography>Tvůj účet není vytvořený, pro více informací kontaktuj Míšu</Typography>
    </Section>
  );
};

export default Unauthorized;
