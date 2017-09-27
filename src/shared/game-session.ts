export type GameId = string;

export enum GameSessionState {
    AwaitingPlayers,
    Gameplay,
    End
};