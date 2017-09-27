export type GameId = string;

export enum GameSessionStateKind {
    AwaitingPlayers,
    Gameplay,
    End
};