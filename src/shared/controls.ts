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