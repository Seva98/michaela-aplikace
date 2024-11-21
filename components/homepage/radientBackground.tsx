const RadientBackground = () => {
  return (
    <div className="-mt-28 -z-10 relative">
      <div className="h-28" />
      <div
        className="-mt-28 h-28"
        style={{
          clipPath: 'ellipse(75% 200% at 50% 200%)',
          background: '#ccf0e6',
        }}
      />
    </div>
  );
};
export default RadientBackground;
