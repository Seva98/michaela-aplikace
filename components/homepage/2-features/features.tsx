import Typography from '@/components/ui/typography';
import Card from '@/components/ui/card';
import Image from 'next/image';
import { FeatureType, featureTypes } from '../constants';
import IconText from '../iconText';

const Feature = ({
  feature: {
    featureType: { title, Icon },
    subtitle,
    description,
    image,
  },
}: {
  feature: Feature;
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

type Feature = { featureType: FeatureType; subtitle: string; description: string; image: string };
const features: Feature[] = [
  {
    subtitle: 'Přehledné a jednoduché plánování dle Vaší kapacity',
    description: 'Náplanujte si volné termíny, nechte lidi si termíny vybrat a o více se nestarejte',
    image: '/homepage/promo-video.png',
    featureType: featureTypes.planning,
  },
  {
    subtitle: 'Poznamejte si vše od tréninků, stravu až přes zdraví',
    description: 'Vámi vybrané informace jsou poté použity pro lepší plánování a výsledky',
    image: '/homepage/promo-video.png',
    featureType: featureTypes.notes,
  },
  {
    subtitle: 'Sledování plateb klientů',
    description: 'Přehledně vidíte, kdo zaplatil, kdo ne a kdo má ještě zaplatit',
    image: '/homepage/promo-video.png',
    featureType: featureTypes.finance,
  },
  {
    subtitle: 'Správa stornovaných lekcí',
    description: 'Rušení tréninku z jasně nastavenými pravidly již pro Vás nebude překážkou',
    image: '/homepage/promo-video.png',
    featureType: featureTypes.cancellation,
  },
  {
    subtitle: 'Rady AI Trenéra',
    description: 'Na základě záznamu o uživatel AI poradí nejlepší cestu k dosažení cíle, je jen na Vás, které informace AI poskytnete',
    image: '/homepage/promo-video.png',
    featureType: featureTypes.ai,
  },
];

const Features = () => {
  return (
    <div className="relative">
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(#ccf0e6, white)`,
          width: '100%',
          height: '100%',
          zIndex: -1,
        }}
      />
      <div className="space-y-16">
        {features.map((feature, i) => (
          <Feature feature={feature} key={`feature-${i}`} />
        ))}
      </div>
    </div>
  );
};

export default Features;
