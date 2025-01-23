import { TeamInputs } from "./team-inputs/index.tsx";
import { ParticipantDto } from "../../models/types/participant-dto.ts";
import { CreateTeamFormInputsDto } from "../../models/types/create-team-form-inputs-dto.tsx";
import { useEffect, useState } from "react";
import teams from "../../constants/teams.ts";
import { LeagueTeamService } from "../../../db/league-team-service.ts";
import { useNavigate } from "react-router-dom";
import { CreateID } from "../../utils/create-id.ts";
import { ParticipantsComponent } from "./participants/index.tsx";

export const CreateLeague = () => {
  const leagueTeamService = new LeagueTeamService();
  const [participants, setParticipants] = useState<ParticipantDto[]>([]);
  const navigate = useNavigate();
  const addNewTeam = (newParticipant: CreateTeamFormInputsDto) => {
    const team = teams.find((team) => team.id == newParticipant.teamID);
    team &&
      setParticipants([
        ...participants,
        {
          id: CreateID(),
          name: newParticipant.name,
          team: team,
        },
      ]);
  };

  useEffect(() => {
    leagueTeamService.deleteAllParticipant();
    leagueTeamService.deleteAllWeeksGames();
  }, []);

  const deleteParticipantHandler = (participant: ParticipantDto) => {
    setParticipants(participants.filter((p) => participant.id !== p.id));
  };

  const registerLeague = () => {
    leagueTeamService.createLeague(participants, () =>
      navigate("/league-table")
    );
  };
  return (
    <div className="h-full bg-gray-100">
      <TeamInputs addNewTeam={addNewTeam} />
      <ParticipantsComponent
        participants={participants}
        deleteParticipantHandler={deleteParticipantHandler}
      />
      <div className="w-full flex flex-row-reverse mt-2">
        <button
          className={`flex-shrink-0 bg-blue-500 hover:bg-blue-700
         border-blue-500 hover:border-blue-700 text-sm border-4
          text-white py-1 px-2 rounded mb-2 ml-4`}
          type="button"
          onClick={() => registerLeague()}
        >
          ثبت و دیدن جدول
        </button>
      </div>
    </div>
  );
};
