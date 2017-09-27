import { PlayerId } from 'shared/player';
import { ControlId } from 'shared/controls';

interface BaseAction {
    controlId: ControlId;
    playerId: PlayerId;
}

export interface ButtonPress extends BaseAction {
    type: 'button-press';
}

export interface ToggleToggle extends BaseAction {
    type: 'toggle-toggle';
}

export interface SwitchSet extends BaseAction {
    type    : 'switch-set';
    newValue: number;
}

export type Action = ButtonPress | ToggleToggle | SwitchSet;