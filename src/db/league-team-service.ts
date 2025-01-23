import { Observable, Observer, Subscriber } from "rxjs";
import { GameResult } from "../app/models/enum/game-result.enum";
import { GameDto } from "../app/models/types/game-dto";
import { LeagueTableParticipantDto } from "../app/models/types/league-table-participant-dto";
import { ParticipantDto } from "../app/models/types/participant-dto";
import { WeekGamesDto } from "../app/models/types/week-games";
import { GenerateWeekGames } from "../app/utils/generate-games";

export class LeagueTeamService {
  baseUrl: string = "http://localhost:5000";
  getAllParticipants(): Promise<LeagueTableParticipantDto[]> {
    return fetch(`${this.baseUrl}/participants`).then<
      LeagueTableParticipantDto[]
    >((data) => data.json());
  }

  getAllGames() {
    return fetch(`${this.baseUrl}/weeksGames`).then<WeekGamesDto[]>((data) =>
      data.json()
    );
  }

  createLeague(participants: ParticipantDto[], cb: () => void) {
    const promises = participants.map(async (participant) => {
      let body: LeagueTableParticipantDto = this.createParticipant(participant);
      return fetch(`${this.baseUrl}/participants`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
    });

    GenerateWeekGames(participants).forEach(async (weekGames) => {
      return fetch(`${this.baseUrl}/weeksGames`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ weekGames: weekGames }),
      });
    });
    Promise.all(promises).then(() => cb());
  }

  deleteAllParticipant() {
    this.getAllParticipants().then((participants) => {
      participants.forEach((participant) => {
        fetch(`${this.baseUrl}/participants/${participant.id}`, {
          method: "DELETE",
        });
      });
    });
  }

  deleteAllWeeksGames() {
    this.getAllGames().then((data) => {
      data.forEach((p) => {
        fetch(`${this.baseUrl}/weeksGames/${p.id}`, {
          method: "DELETE",
        });
      });
    });
  }

  private createParticipant(p: ParticipantDto): LeagueTableParticipantDto {
    return {
      id: p.id,
      name: p.name,
      teamId: p.team.id,
      gamePlayedNumber: 0,
      win: 0,
      draw: 0,
      lose: 0,
      goalDifference: {
        score: 0,
        concede: 0,
      },
      totalScore: 0,
      games: [],
    };
  }

  private updateParticipantsStatistics(participant: LeagueTableParticipantDto) {
    return fetch(`${this.baseUrl}/participants/${participant.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(participant),
    });
  }

  submitGameResult(weekId: string, weekGames: GameDto[], gameIndex: number) {
    return fetch(`${this.baseUrl}/weeksGames/${weekId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ weekGames }),
    }).then(() => {
      let newHomeParticipants = this.createParticipantAfterInsertingResults(
        weekGames,
        gameIndex
      );

      let newAwayParticipants = this.createParticipantAfterInsertingResults(
        weekGames,
        gameIndex,
        "away"
      );

      this.updateParticipantsStatistics(newHomeParticipants);
      this.updateParticipantsStatistics(newAwayParticipants);
      return;
    });
  }

  private createParticipantAfterInsertingResults(
    weekGames: GameDto[],
    gameIndex: number,
    mode: "home" | "away" = "home"
  ) {
    let newParticipants = weekGames[gameIndex][
      `${mode == "home" ? mode : "away"}Participant`
    ] as LeagueTableParticipantDto;
    const gameResult =
      +(weekGames[gameIndex][`${mode}Score`] as number) >
      +(weekGames[gameIndex][
        `${mode == "home" ? "away" : "home"}Score`
      ] as number)
        ? GameResult.WIN
        : weekGames[gameIndex][`${mode}Score`] ==
          weekGames[gameIndex][`${mode == "home" ? "away" : "home"}Score`]
        ? GameResult.DRAW
        : GameResult.LOSE;
    newParticipants = {
      ...newParticipants,
      gamePlayedNumber: newParticipants.gamePlayedNumber + 1,
      win:
        (weekGames[gameIndex][`${mode}Score`] as number) >
        (weekGames[gameIndex][
          `${mode == "home" ? "away" : "home"}Score`
        ] as number)
          ? newParticipants.win + 1
          : newParticipants.win,
      draw:
        (weekGames[gameIndex][`${mode}Score`] as number) ==
        (weekGames[gameIndex][
          `${mode == "home" ? "away" : "home"}Score`
        ] as number)
          ? newParticipants.draw + 1
          : newParticipants.draw,
      lose:
        (weekGames[gameIndex][`${mode}Score`] as number) <
        (weekGames[gameIndex][
          `${mode == "home" ? "away" : "home"}Score`
        ] as number)
          ? newParticipants.lose + 1
          : newParticipants.lose,

      games: [
        ...newParticipants.games,
        { id: weekGames[gameIndex].id, gameResult },
      ],
    };
    newParticipants.goalDifference.score = +(
      +newParticipants.goalDifference.score +
      +(weekGames[gameIndex][`${mode}Score`] as number)
    );
    newParticipants.goalDifference.concede = +(
      +newParticipants.goalDifference.concede +
      +(weekGames[gameIndex][
        `${mode == "home" ? "away" : "home"}Score`
      ] as number)
    );

    newParticipants.totalScore =
      newParticipants.win * 3 + +newParticipants.draw;
    return newParticipants;
  }
}
