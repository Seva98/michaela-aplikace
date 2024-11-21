import IconText from '../iconText';
import { featureTypes } from '../constants';

const Features = () => {
  return (
    <div className="flex space-x-8 ">
      {Object.values(featureTypes).map(({ title, Icon }, i) => (
        <IconText Icon={Icon} text={title} key={`feature-list-${i}`} />
      ))}
    </div>
  );
};

export default Features;
