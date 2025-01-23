import teams from "../../../constants/teams";
import { GameResult } from "../../../models/enum/game-result.enum";
import { LeagueTableParticipantDto } from "../../../models/types/league-table-participant-dto";
import { TeamDto } from "../../../models/types/team-dto";
import { DrawIconComponent } from "./draw-icon-component";
import { LoseIconComponent } from "./lose-icon-component";
import { WinIconComponent } from "./win-icon-component";

export const Tbody = (props: { participants: LeagueTableParticipantDto[] }) => {
  return (
    <tbody className="bg-white">
      {props.participants?.map((participant, index) => {
        let team: TeamDto | undefined = teams.find(
          (team) => team.id == participant.teamId
        );
        return (
          <tr className="odd:bg-gray-100 even:bg-white" key={index}>
            <th scope="row">{index + 1}</th>
            <td className="text-right py-2">{participant.name}</td>
            <td className="text-right">
              <div className="flex">
                <div className="flex items-center">
                  <img
                    src={team?.imageSrc ?? ""}
                    style={{ width: "20px", height: "auto" }}
                    className="ml-2"
                  />
                </div>
                <span className="hidden sm:block">{team?.name ?? ""}</span>
              </div>
            </td>
            <td className="text-center py-2">{participant.gamePlayedNumber}</td>
            <td className="text-center py-2">{participant.win}</td>
            <td className="text-center py-2">{participant.draw}</td>
            <td className="text-center py-2">{participant.lose}</td>
            <td className="text-center py-2">
              {participant.goalDifference.score}-
              {participant.goalDifference.concede}
            </td>
            <td style={{ direction: "ltr" }} className="text-center py-2">
              {participant.goalDifference.score -
                participant.goalDifference.concede}
            </td>
            <td className="text-center py-2">{participant.totalScore}</td>
            <td className="text-center hidden lg:flex mt-2 justify-center">
              <div className="flex justify-center items-center">
                {participant.games
                  .slice(
                    participant.games.length - 5 > 0
                      ? participant.games.length - 5
                      : 0,
                    participant.games.length
                  )
                  .map((game, index) => {
                    let isLastGame = index == 4;
                    if (participant.games.length - 5 < 0) {
                      isLastGame = index == participant.games.length - 1;
                    }
                    switch (game.gameResult) {
                      case GameResult.WIN:
                        return (
                          <WinIconComponent
                            key={index}
                            isLastGame={isLastGame}
                          />
                        );
                      case GameResult.DRAW:
                        return (
                          <DrawIconComponent
                            key={index}
                            isLastGame={isLastGame}
                          />
                        );
                      case GameResult.LOSE:
                        return (
                          <LoseIconComponent
                            key={index}
                            isLastGame={isLastGame}
                          />
                        );
                      default:
                        break;
                    }
                  })}
              </div>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};
