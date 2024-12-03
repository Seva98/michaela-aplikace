import FirstCallToAction from '../components/homepage/cta/firstCallToAction';
import Faq from '@/components/homepage/faq/faq';
import Features from '@/components/homepage/features/features';
import Pricing from '@/components/homepage/pricing/pricing';
import About from '@/components/homepage/about/about';
import TealHalfCircle from '@/components/homepage/design/tealHalfCircle';
import WhiteHalfCircle from '@/components/homepage/design/whiteRotatedDivider';

const HomePage = () => {
  return (
    <div className="relative overflow-visible">
      <FirstCallToAction />
      <TealHalfCircle />
      <About />
      <Features />
      <Faq />
      <Pricing />
      <div className="h-24" />
    </div>
  );
};

export default HomePage;
