import { PlayerId } from 'shared/player';
import { ControlId } from 'shared/controls';

interface BaseAction {
    controlId: ControlId;
    playerId: PlayerId;
}

export interface ButtonPress extends BaseAction {
    kind: 'button-press';
}

export interface ToggleToggle extends BaseAction {
    kind: 'toggle-toggle';
}

export interface SwitchSet extends BaseAction {
    kind    : 'switch-set';
    newValue: number;
}

export type Action = ButtonPress | ToggleToggle | SwitchSet;