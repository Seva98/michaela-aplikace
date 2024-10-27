const Color = ({ color }: { color: string }) => {
  return <div className="h-4 w-4 rounded-full" style={{ background: color }} />;
};

export default Color;
