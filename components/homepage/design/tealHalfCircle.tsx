const TealHalfCircle = () => {
  return (
    <div className="-mt-96 -z-10 relative">
      <div className="h-96" />
      <div
        className="-mt-96 h-96"
        style={{
          clipPath: 'ellipse(75% 200% at 50% 200%)',
          background: '#ccf0e6',
        }}
      />
    </div>
  );
};
export default TealHalfCircle;
