import { FeatureType, featureTypes } from '../constants';
import WhiteRotatedDivider from '../design/whiteRotatedDivider';
import { Feature } from './feature';

export type FeatureProp = { featureType: FeatureType; subtitle: string; description: string; image: string };
const features: FeatureProp[] = [
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
    <div className="relative p-2 mt-24 overflow-hidden">
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: `linear-gradient(#ccf0e6, white)`,
          width: '100%',
          height: '100%',
        }}
      />
      <WhiteRotatedDivider />
      <div className="space-y-16">
        {features.map((feature, i) => (
          <Feature feature={feature} key={`feature-${i}`} />
        ))}
      </div>
    </div>
  );
};

export default Features;
