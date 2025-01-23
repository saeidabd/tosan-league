import { GameResult } from "../enum/game-result.enum";

export type LeagueTableParticipantDto = {
  id: string;
  name: string;
  teamId: string | number;
  gamePlayedNumber: number;
  win: number;
  draw: number;
  lose: number;
  goalDifference: { score: number; concede: number };
  totalScore: number;
  games: { id: string; gameResult: GameResult }[];
};
