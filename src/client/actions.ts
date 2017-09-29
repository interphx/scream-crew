import { Change } from 'shared/changes';

interface ApplyStateDelta {
    type: 'apply-state-delta';
    delta: Change[];
}

export function applyStateDelta(delta: Change[]): ApplyStateDelta {
    return {
        type: 'apply-state-delta',
        delta
    };
}

export type Action = ApplyStateDelta;