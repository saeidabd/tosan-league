import { LeagueTableParticipantDto } from "../models/types/league-table-participant-dto";

export function sortParticipantsTable(
  participants: LeagueTableParticipantDto[]
) {
  return participants.sort((p1, p2) => {
    const totalScoreDiff = p2.totalScore - p1.totalScore;
    const goalDifferenceDiff =
      p2.goalDifference.score -
      p2.goalDifference.concede -
      (p1.goalDifference.score - p1.goalDifference.concede);
    const scoreDiff = p2.goalDifference.score - -p1.goalDifference.score;

    if (totalScoreDiff == 0) {
      if (goalDifferenceDiff == 0) {
        return scoreDiff;
      }
      return goalDifferenceDiff;
    }
    return totalScoreDiff;
  });
}
