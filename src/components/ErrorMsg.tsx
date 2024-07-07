const ErrorMsg = ({ msg }: { msg: string }) => {
  return (
    <p className="error">
      <span>⛔️ </span>
      {msg}
    </p>
  );
};

export default ErrorMsg;
