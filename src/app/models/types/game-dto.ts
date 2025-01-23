import { GameStatus } from "../enum/game-status.enum";
import { LeagueTableParticipantDto } from "./league-table-participant-dto";

export type GameDto = {
  id: string;
  homeParticipantId: string;
  homeParticipant?: LeagueTableParticipantDto;
  homeScore?: number;
  awayParticipantId: string;
  awayParticipant?: LeagueTableParticipantDto;
  awayScore?: number;
  status: GameStatus;
};
