import { getRandomElement, getRandomBoolean } from 'shared/utils';

export type ControlId = string;

interface BaseControl {
    id: ControlId;
}

export interface Button extends BaseControl {
    type: 'button';
}

export interface Toggle extends BaseControl {
    type: 'toggle';
    enabled: boolean;
}

export interface Switch extends BaseControl {
    type: 'switch';
    value : number;
    labels: string[];
}

export type Control = Button | Toggle | Switch;

function getRandomButton(id: ControlId): Button {
    return {
        id,
        type: 'button'
    };
}

function getRandomToggle(id: ControlId): Toggle {
    return {
        id,
        type: 'toggle',
        enabled: getRandomBoolean()
    };
}

function getRandomSwitch(id: ControlId, ) {

}

export function getRandomControl(): Control {
    var result = {
        type: getRandomElement(['button', 'toggle', 'switch'])
    }
}