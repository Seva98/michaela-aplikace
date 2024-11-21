import FirstCallToAction from '../components/homepage/1-cta/firstCallToAction';
import RadientBackground from '@/components/homepage/radientBackground';
import Faq from '@/components/homepage/3-faq/faq';
import Features from '@/components/homepage/2-features/features';

const HomePage = () => {
  return (
    <div className="relative overflow-visible">
      <FirstCallToAction />
      <RadientBackground />
      <Features />
      <Faq />
    </div>
  );
};

export default HomePage;
