import Typography from '../ui/typography';
import RatingButton from './ratingButton';

const RatingText = ({ rating, color }: { rating: number; color: string }) => {
  return rating === -1 ? (
    <Typography className="text-right pe-2">-</Typography>
  ) : (
    <div className="flex space-x-2 items-center justify-end">
      <Typography>{rating + 1}x</Typography>
      <RatingButton color={color} readonly />
    </div>
  );
};

export default RatingText;
