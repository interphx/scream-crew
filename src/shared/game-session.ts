import { PlayerId } from 'shared/player';

export type GameId = string;

export enum GameSessionStateType {
    AwaitingPlayers,
    Gameplay,
    End
}

export interface GameInfo {
    id: GameId;
    name: string;
    stateKind: GameSessionStateType;
    hasPassword: boolean;
    listed: boolean;
    players: PlayerId[];
}