import RotatingWords from './rotatingWords';
import PromoVideo from './promoVideo';
import FullScreen from '@/components/containers/fullScreen';
import { Button } from '@/components/ui/button';
import Typography from '@/components/ui/typography';
import Features from './features';

const FirstCallToAction = () => {
  return (
    <FullScreen className="flex flex-col items-center gap-y-4 justify-center pb-24">
      <RotatingWords />
      <Button className="w-fit">Vyzkoušet zdarma</Button>
      <PromoVideo />
      <Typography className="text-black font-semibold text-3xl mt-4 text-center">Jediná appka, kterou jako tréner budeš potřebovat!</Typography>
      <Features />
    </FullScreen>
  );
};

export default FirstCallToAction;
