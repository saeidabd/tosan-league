export const WinIconComponent = (props: { isLastGame?: boolean }) => {
  return (
    <div
      className={`w-5 h-5 ${
        props.isLastGame ? "bg-green-700 w-6 h-6" : "bg-green-600 w-5 h-5"
      } rounded-full flex items-center justify-center mx-1`}
    >
      <span
        className="text-white text-center mt-1 text-sm font font-normal"
        style={{ fontFamily: "sans-serif" }}
      >
        W
      </span>
    </div>
  );
};
