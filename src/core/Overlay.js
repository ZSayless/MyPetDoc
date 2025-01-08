const Overlay = ({ children }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black bg-opacity-50"></div>
      {children}
    </div>
  );
};

export default Overlay;
