import { ShadowIcon } from '@radix-ui/react-icons';

const Loader = () => {
  return (
    <div className="animate-spin transition-all">
      <ShadowIcon />
    </div>
  );
};

export default Loader;
