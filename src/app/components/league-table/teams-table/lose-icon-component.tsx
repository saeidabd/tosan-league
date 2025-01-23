export const LoseIconComponent = (props:{isLastGame?: boolean}) => {
  return (
    <div       className={`w-5 h-5 ${
      props.isLastGame ? "bg-red-700 w-6 h-6" : "bg-red-600 w-5 h-5"
    } rounded-full flex items-center justify-center mx-1`}>
      <span
        className="text-white text-center text-sm font font-normal"
        style={{ fontFamily: "sans-serif" }}
      >
        L
      </span>
    </div>
  );
};
