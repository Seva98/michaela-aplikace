import { IconType } from 'react-icons/lib';

const IconText = ({ Icon, text }: { Icon: IconType; text: string }) => {
  return (
    <div className="flex space-x-2 items-center text-black">
      <Icon />
      <span className="uppercase">{text}</span>
    </div>
  );
};

export default IconText;
