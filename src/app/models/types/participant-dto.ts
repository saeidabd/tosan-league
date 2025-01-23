import { TeamDto } from "./team-dto";

export type ParticipantDto = {
  id: string;
  name: string;
  team: TeamDto;
};
