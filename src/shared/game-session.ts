import { PlayerId } from 'shared/player';

export type GameId = string;

export enum GameSessionStateKind {
    AwaitingPlayers,
    Gameplay,
    End
}

export interface GameInfo {
    id: GameId;
    name: string;
    hasPassword: boolean;
    listed: boolean;
    players: PlayerId[];
}