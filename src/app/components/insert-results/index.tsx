import { useEffect, useState } from "react";
import { LeagueTeamService } from "../../../db/league-team-service";
import { WeekGamesDto } from "../../models/types/week-games";
import { GameStatus } from "../../models/enum/game-status.enum";
import { WeekGamesComponent } from "./week-games-component";

export const InsertResults = () => {
  const [weekGamesList, setWeekGamesList] = useState<WeekGamesDto[]>([]);
  const [scoreInputs, setScoreInputs] = useState<
    { homeScore: number; awayScore: number }[][]
  >([]);
  const leagueTeamService = new LeagueTeamService();

  function getParticipants(resetScores: boolean = true) {
    leagueTeamService.getAllGames().then((data) => {
      leagueTeamService.getAllParticipants().then((par) => {
        data = data.map((w) => {
          return {
            ...w,
            weekGames: {
              ...w.weekGames?.map((g) => {
                return {
                  ...g,
                  homeParticipant: par.find(
                    (t) => t.id === g.homeParticipantId
                  ),
                  awayParticipant: par.find(
                    (t) => t.id === g.awayParticipantId
                  ),
                  editMode: false,
                };
              }),
            },
          };
        });
        resetScores && setScoreInputs(data.map(() => []));
        setWeekGamesList(data);
      });
    });
  }

  useEffect(() => {
    getParticipants();
  }, []);

  const onInsertResultHandler = (weekIndex: number, gameIndex: number) => {
    const updatedWeekGames = [
      ...Object.values(weekGamesList[weekIndex].weekGames),
    ];
    updatedWeekGames[gameIndex] = {
      ...updatedWeekGames[gameIndex],
      homeScore: scoreInputs[weekIndex][gameIndex].homeScore,
      awayScore: scoreInputs[weekIndex][gameIndex].awayScore,
      status: GameStatus.PLAYED,
    };
    leagueTeamService
      .submitGameResult(
        weekGamesList[weekIndex].id,
        updatedWeekGames,
        gameIndex
      )
      .then(() => {
        getParticipants(false);
      });
  };

  const handleHomeScoreInputs = (
    event: any,
    weekIndex: number,
    gameIndex: number
  ) => {
    scoreInputs[weekIndex][gameIndex] = {
      awayScore: scoreInputs[weekIndex][gameIndex]?.awayScore,
      homeScore: event.target.value,
    };
    setScoreInputs(scoreInputs);
  };
  const handleAwayScoreInputs = (
    event: any,
    weekIndex: number,
    gameIndex: number
  ) => {
    scoreInputs[weekIndex][gameIndex] = {
      homeScore: scoreInputs[weekIndex][gameIndex]?.homeScore,
      awayScore: event.target.value,
    };
    setScoreInputs(scoreInputs);
  };
  return (
    <div className="h-full pb-1 overflow-hidden">
      <div style={{ height: "calc(100vh - 8rem)" }} className="bg-gray-100">
        <div className="h-full flex flex-col mx-2 mt-4 min-w-96 px-4 shadow border border-gray-100 bg-white rounded overflow-y-auto">
          <h2 className="font-bold text-xl my-2">برنامه های بازی</h2>
          {weekGamesList.map((weekGames, weekIndex) => {
            return (
              <WeekGamesComponent
                key={weekIndex}
                weekGames={weekGames}
                weekNumber={weekIndex}
                handleHomeScoreInputs={handleHomeScoreInputs}
                scoreInputs={scoreInputs}
                handleAwayScoreInputs={handleAwayScoreInputs}
                setWeekGamesList={setWeekGamesList}
                weekGamesList={weekGamesList}
                onInsertResultHandler={onInsertResultHandler}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
