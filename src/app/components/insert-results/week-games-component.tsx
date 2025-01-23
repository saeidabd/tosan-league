import { WeekGamesDto } from "../../models/types/week-games";
import teams from "../../constants/teams";
import { GameStatus } from "../../models/enum/game-status.enum";
import edit from "../../../assets/images/edit.svg";
import confirm from "../../../assets/images/confirm.png";

export const WeekGamesComponent = (props: {
  weekGames: WeekGamesDto;
  weekNumber: number;
  scoreInputs: { homeScore: number; awayScore: number }[][];
  handleHomeScoreInputs: Function;
  handleAwayScoreInputs: Function;
  weekGamesList: WeekGamesDto[];
  setWeekGamesList: Function;
  onInsertResultHandler: Function;
}) => {
  return (
    <section>
      <div className="bg-gray-100 py-1 px-2 rounded flex justify-between">
        <span>هفته {props.weekNumber + 1}</span>
        <span></span>
      </div>
      <div className="games flex flex-col justify-center">
        {Object.values(props.weekGames.weekGames).map((game, gameIndex) => {
          if (
            game.awayParticipantId == "REST" ||
            game.homeParticipantId == "REST"
          ) {
            return null;
          }
          return (
            <div
              className={`game flex h-12 ${
                gameIndex != Object.values(props.weekGames.weekGames).length - 1
                  ? "border-b-2 border-gray-100"
                  : ""
              } w-full justify-center py-2 hover:bg-gray-50`}
              key={gameIndex}
            >
              <div className="flex items-center flex-row-reverse ml-4 w-1/3">
                <div className="flex items-center">
                  <img
                    src={
                      teams.find((t) => t.id == game.homeParticipant?.teamId)
                        ?.imageSrc
                    }
                    style={{ width: "20px", height: "auto" }}
                  />
                </div>
                <span className="px-1 font-bold hidden sm:block">
                  <span className="">{`${game.homeParticipant?.name}`}</span>
                  <span className="">
                    {` ( ${
                      teams.find((t) => t.id == game.homeParticipant?.teamId)
                        ?.name
                    } )`}
                  </span>
                </span>
                <span className="px-1 font-bold sm:hidden">
                  <span className="text-sm">{`${game.homeParticipant?.name}`}</span>
                </span>
              </div>
              <div className="font-bold w-2/12 text-center">
                {game.status === GameStatus.PLAYED &&
                !(game as any).editMode ? (
                  `${game?.homeScore ?? 7} - ${game?.awayScore ?? 2}`
                ) : (
                  <div className="flex w-full justify-center">
                    <input
                      className="border-b-2 border-gray-200 hover:bg-gray-200 focus:outline-none w-1/3 text-center"
                      value={
                        props.scoreInputs[props.weekNumber][gameIndex]
                          ?.homeScore
                      }
                      onChange={(event) =>
                        props.handleHomeScoreInputs(
                          event,
                          props.weekNumber,
                          gameIndex
                        )
                      }
                    />
                    -
                    <input
                      className="border-b-2 border-gray-200 hover:bg-gray-200 focus:outline-none w-1/3 text-center"
                      value={
                        props.scoreInputs[props.weekNumber][gameIndex]
                          ?.awayScore
                      }
                      onChange={(event) =>
                        props.handleAwayScoreInputs(
                          event,
                          props.weekNumber,
                          gameIndex
                        )
                      }
                    />
                  </div>
                )}
              </div>
              <div className="flex flex-row mr-4 w-1/3">
                <div className="flex items-center flex-row mr-4 w-full">
                  <div className="flex justify-center shrink-0">
                    <img
                      src={
                        teams.find((t) => t.id == game.awayParticipant?.teamId)
                          ?.imageSrc
                      }
                      style={{ width: "20px", height: "auto" }}
                    />
                  </div>
                  <span className="px-1 font-bold hidden sm:block">
                    <span className="">{`${game.awayParticipant?.name}`}</span>
                    <span className="">
                      {` ( ${
                        teams.find((t) => t.id == game.awayParticipant?.teamId)
                          ?.name
                      } )`}
                    </span>
                  </span>
                  <span className="px-1 font-bold sm:hidden">
                    <span className="text-sm">{`${game.awayParticipant?.name}`}</span>
                  </span>
                </div>
                <div className="flex justify-center items-center">
                  {game.status === GameStatus.PLAYED &&
                  !(game as any).editMode ? (
                    <button
                      type="button"
                      className="w-6 h-auto"
                      onClick={() => {
                        (
                          props.weekGamesList[props.weekNumber].weekGames[
                            gameIndex
                          ] as any
                        ).editMode = true;
                        props.setWeekGamesList([...props.weekGamesList]);
                      }}
                    >
                      <img src={edit} />
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="w-6 h-auto"
                      onClick={() => {
                        (
                          props.weekGamesList[props.weekNumber].weekGames[
                            gameIndex
                          ] as any
                        ).editMode = true;
                        props.setWeekGamesList([...props.weekGamesList]);
                        props.onInsertResultHandler(
                          props.weekNumber,
                          gameIndex
                        );
                      }}
                    >
                      <img src={confirm} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
