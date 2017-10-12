import { Action } from 'shared/control-actions';

export interface Task {
    action: Action;
    startTime: number;
    endTime: number;
}