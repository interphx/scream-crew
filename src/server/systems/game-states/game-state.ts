import { Disposable } from "shared/disposable";

export interface GameState extends Disposable {
    start(): void;
    stop(): void;
    tick(timestamp: number): void;
}