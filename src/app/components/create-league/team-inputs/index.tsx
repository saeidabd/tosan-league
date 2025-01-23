import { SubmitHandler, useForm } from "react-hook-form";
import { CreateTeamFormInputsDto } from "../../../models/types/create-team-form-inputs-dto";
import teams from "../../../constants/teams";
import { useState } from "react";

export const TeamInputs = (props: { addNewTeam: Function }) => {
  const { register, handleSubmit } = useForm<CreateTeamFormInputsDto>();
  const [isTeamSelected, setIsTeamSelected] = useState<boolean>(false);

  const onSelectionChange = (event: any) => {
    if (event?.target?.value !== "defaultValue") setIsTeamSelected(true);
  };

  const onSubmit: SubmitHandler<CreateTeamFormInputsDto> = (data) => {
    data.name && data.teamID && props.addNewTeam(data);
  };

  return (
    <div className="flex justify-center mb-4 mx-4 pt-2">
      <form className="w-full max-w-sm" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center border-b border-blue-500 py-2">
          <input
            className="ml-1 appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="نام"
            aria-label="name"
            {...register("name", { required: true })}
          />
          <select
            {...register("teamID", { required: true })}
            className={
              (isTeamSelected ? "" : "text-gray-400") + " ml-2 bg-gray-100"
            }
            defaultValue={"defaultValue"}
            onChange={onSelectionChange}
          >
            <option value="defaultValue" disabled className="text-gray-400">
              تیم
            </option>
            {teams.map((option, index) => (
              <option key={index} value={option.id} className="text-gray-700">
                {option.name}
              </option>
            ))}
          </select>
          <button
            className={`flex-shrink-0 bg-blue-500 hover:bg-blue-700 border-blue-500
               hover:border-blue-700 text-sm border-4 text-white py-1 px-2 rounded`}
            type="submit"
          >
            اضافه
          </button>
        </div>
      </form>
    </div>
  );
};
