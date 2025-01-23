import { LeagueTeamService } from "../../../../db/league-team-service";
import { useEffect, useState } from "react";
import { LeagueTableParticipantDto } from "../../../models/types/league-table-participant-dto";
import { sortParticipantsTable } from "../../../utils/sort-participants-table";
import { Thead } from "./thead-component";
import { Tbody } from "./tbody-component";

export const TeamsTable = () => {
  const [participants, setParticipants] = useState<LeagueTableParticipantDto[]>(
    []
  );

  const leagueTeamService = new LeagueTeamService();
  useEffect(() => {
    leagueTeamService.getAllParticipants().then((participants) => {
      const sortedParticipants = sortParticipantsTable(participants);
      setParticipants(sortedParticipants);
    });
  }, []);

  return (
    <div className="h-full overflow-hidden">
      <div
        className={`flex flex-col border border-gray-200 rounded-lg
                    shadow mt-4 mb-2 mx-1 md:mx-4 overflow-y-auto 
                    overflow-x-hidden bg-white`}
        style={{ height: "calc(100vh - 8rem)" }}
      >
        <div className="flex flex-col p-1">
          <table className="w-full">
            <caption className="mb-6">
              <span className="font-bold text-center text-2xl border-b-2 border-b-gray-900">
                جدول لیگ
              </span>
            </caption>
            <Thead />
            <Tbody participants={participants} />
          </table>
          <>
            {participants.length < 1 ? (
              <p className="text-center font-bold w-full mt-6">
                لطفا تیم ها رو اضافه کنید!
              </p>
            ) : null}
          </>
        </div>
      </div>
    </div>
  );
};
