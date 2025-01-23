import { GameDto } from "../models/types/game-dto";
import { GameStatus } from "../models/enum/game-status.enum";
import { ParticipantDto } from "../models/types/participant-dto";
import { CreateID } from "./create-id";

export function GenerateWeekGames(participants: ParticipantDto[]) {
  let weekGames: GameDto[][] = [];
  if (participants.length % 2 !== 0) {
    participants.push({ name: "restWeek" } as any);
  }
  const weeks = participants.length - 1;

  let game: GameDto = {} as GameDto;
  let games: GameDto[] = [];
  for (let week = 0; week < weeks; week++) {
    for (let i = 0; i < participants.length / 2; i++) {
      const home = participants[i];
      const away = participants[participants.length - 1 - i];
      game = {
        id: CreateID(),
        homeParticipantId: home.id ?? "REST",
        awayParticipantId: away.id ?? "REST",
        status: GameStatus.NOT_PLAYED,
      };
      games.push(game);
    }
    participants = [participants[0]].concat(
      participants.slice(-1),
      participants.slice(1, -1)
    );
    weekGames.push(games);
    games = [];
  }
  return weekGames;
}
