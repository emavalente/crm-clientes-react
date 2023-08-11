const Error = ({ children }) => {
  return (
    <div className="p-3 my-4 block bg-red-500 text-white text-center font-bold uppercase">
      {children}
    </div>
  );
};

export default Error;
