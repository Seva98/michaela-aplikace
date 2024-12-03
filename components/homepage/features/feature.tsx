import Card from '@/components/ui/card';
import { FeatureProp } from './features';
import IconText from '../iconText';
import Typography from '@/components/ui/typography';
import Image from 'next/image';

export const Feature = ({
  feature: {
    featureType: { title, Icon },
    subtitle,
    description,
    image,
  },
}: {
  feature: FeatureProp;
}) => {
  return (
    <div className="max-w-4xl mx-auto w-full bg-white">
      <Card className="space-y-4 relative overflow-hidden" padding="none">
        <div className="p-8">
          <IconText Icon={Icon} text={title} />
          <Typography className="text-3xl text-black">{subtitle}</Typography>
          <Typography className="font-light">{description}</Typography>
          <div className="h-6" />
          <Image
            src={image}
            className=" max-w-[80%] mx-auto border-4 border-teal-800 hover:border-dashed rounded-md relative z-10"
            alt="promo-video"
            width={1920}
            height={1080}
          />
        </div>
        <Icon className="absolute bottom-20 right-20 text-teal-700 -rotate-12 scale-[1800%]" />
      </Card>
    </div>
  );
};
