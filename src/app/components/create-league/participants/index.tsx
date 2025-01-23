import { ParticipantCard } from "../participant-card";
import { ParticipantDto } from "../../../models/types/participant-dto";
import styles from "./styles.module.css";
export const ParticipantsComponent = (props: {
  participants: ParticipantDto[];
  deleteParticipantHandler: Function;
}) => {
  return (
    <div
      className="px-4 flex flex-col"
      style={{ height: "calc(100vh - 14rem)" }}
    >
      <div
        className="border-gray-100  border-1 rounded-lg shadow-lg bg-white"
        style={{ height: "calc(100vh - 14rem)" , backdropFilter: "blur(100px)"}}
      >
        <div className={"flex p-1  flex-wrap overflow-y-auto " + styles.scroll} style={{maxHeight: "calc(100vh - 14rem)"}}>
          {props.participants.map((participant, index) => {
            return (
              <ParticipantCard
                key={index}
                imageSrc={participant.team.imageSrc}
                participantName={participant.name}
                teamName={participant.team.name}
                deleteParticipantHandler={() =>
                  props.deleteParticipantHandler(participant)
                }
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
