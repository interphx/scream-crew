import { GameSessionStateKind } from 'shared/game-session';

export interface GameSessionState {
    getKind(): GameSessionStateKind;
    enter(): void;
    exit(): void;
    tick(timestamp: number): void;
}