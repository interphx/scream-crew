import { PlayerId } from 'shared/player';

export type GameId = string;

export enum GameStateType {
    AwaitingPlayers,
    Gameplay,
    End
}

export interface ListedGameInfo {
    id: GameId;
    name: string;
    stateType: GameStateType;
    hasPassword: boolean;
    playersCount: number;
}