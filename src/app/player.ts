
export interface Player {
  idPlayer: string;
  strPlayer: string;
  strNumber: string | null;
  strPosition: string | null;
  strTeam: string;
  strNationality: string | null;
  strThumb: string | null;
}

export interface PlayerApiResponse {
  player: Player[] | null;
}
