import { getRandomElement, getRandomBoolean } from 'shared/utils';

export type ControlId = string;

interface BaseControl {
    id: ControlId;
}

export interface Button extends BaseControl {
    type: 'button';
    name: string;
}

export interface Toggle extends BaseControl {
    type: 'toggle';
    enabled: boolean;
    name: string;
}

export interface Switch extends BaseControl {
    type: 'switch';
    value : number;
    labels: string[];
    name: string;
}

export type Control = Button | Toggle | Switch;

function getRandomButton(id: ControlId): Button {
    return {
        id,
        type: 'button',
        name: `Button ${id}`
    };
}

function getRandomToggle(id: ControlId): Toggle {
    return {
        id,
        type: 'toggle',
        enabled: getRandomBoolean(),
        name: `Toggle ${id}`
    };
}

function getRandomSwitch(id: ControlId, ) {

}

/*export function getRandomControl(): Control {
    var result = {
        type: getRandomElement(['button', 'toggle', 'switch'])
    }
}*/