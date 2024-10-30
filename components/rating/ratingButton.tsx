import { cn } from '@/utils/cn';
import { Button } from '../ui/button';
import { getButtonColorStyle } from '@/utils/colors';
import { StarIcon } from '@radix-ui/react-icons';
import { CSSProperties, MouseEvent, MouseEventHandler } from 'react';

const RatingButton = ({
  readonly = false,
  color,
  onClick,
  onMouseEnter,
  style,
}: {
  readonly?: boolean;
  color: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  onMouseEnter?: (e: MouseEvent<HTMLButtonElement>) => void;
  style?: CSSProperties;
}) => {
  return readonly ? (
    <Button className={cn('h-6 w-6 p-0 rounded flex justify-center items-center transition-opacity cursor-auto')} style={getButtonColorStyle(color)}>
      <StarIcon color="white" />
    </Button>
  ) : onClick && onMouseEnter && style ? (
    <Button
      className={cn('h-6 w-6 p-0 rounded flex justify-center items-center transition-opacity')}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      style={style}
    >
      <StarIcon color="white" />
    </Button>
  ) : (
    <div>‼️</div>
  );
};

export default RatingButton;
