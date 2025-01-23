import deleteIcon from "../../../../assets/images/delete-icon.svg";

export const ParticipantCard = (props: {
  imageSrc: string;
  participantName: string;
  teamName: string;
  deleteParticipantHandler: Function;
}) => {
  return (
    <div className="w-full md:w-1/2 lg:w-1/4  relative">
      <div className="border-gray-100 border-2 rounded-lg shadow-md m-1 p-2 flex bg-gray-100 h-32 overflow-x-hidden">
        <img src={props.imageSrc} className="m-3 ml-4" />
        <div className="w-full p-3">
          <h3 className="text-right font-bold text-2xl mb-2">
            {props.participantName}
          </h3>
          <span>{props.teamName}</span>
        </div>
      </div>
      <div className="absolute top-0 left-1">
        <button
          className="shrink-0"
          onClick={() => props.deleteParticipantHandler()}
        >
          <img src={deleteIcon} className="w-7 md:w-6 h-auto" />
        </button>
      </div>
    </div>
  );
};
