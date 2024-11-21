import { PlayIcon } from '@radix-ui/react-icons';
import Image from 'next/image';

const PromoVideo = () => {
  return (
    <div className="relative w-fit max-w-5xl ">
      <PlayIcon className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-teal-600 bg-white rounded-full w-32 h-32 p-4 text-6xl border-4 shadow-xl cursor-pointer border-teal-600" />
      <Image src="/homepage/promo-video.png" className="max-w-[80%] mx-auto shadow-xl" alt="promo-video" width={1920} height={1080} />
    </div>
  );
};

export default PromoVideo;
