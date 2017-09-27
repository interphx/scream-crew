import { Action } from 'shared/actions';

export interface Task {
    action: Action;
    startTime: number;
    endTime: number;
}