import { tableHeader } from "../../../constants/league-table-header";

export const Thead = () => {
  return (
    <thead>
      <tr className="border-b border-b-gray-400">
        {tableHeader.map((header, index) => {
          if (header == "نام" || header == "تیم") {
            return (
              <th className="text-right" key={index}>
                {header}
              </th>
            );
          }
          if (header == "بازی های اخیر") {
            return (
              <th className="hidden lg:block lg:px-2" key={index}>
                {header}
              </th>
            );
          }
          return (
            <th className="lg:px-2 text-center" key={index}>
              {header}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};
