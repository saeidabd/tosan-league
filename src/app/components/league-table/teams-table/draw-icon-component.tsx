export const DrawIconComponent = (props:{isLastGame?: boolean}) => {
  return (
    <div       className={`w-5 h-5 ${
      props.isLastGame ? "bg-gray-600 w-6 h-6" : "bg-gray-500 w-5 h-5"
    } rounded-full flex items-center justify-center mx-1`}>
      <span
        className="text-white text-center text-sm font-normal"
        style={{ fontFamily: "sans-serif", marginTop: "2px" }}
      >
        D
      </span>
    </div>
  );
};
