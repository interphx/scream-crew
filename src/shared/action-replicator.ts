import { CommonAction } from 'shared/redux-actions/common';
import { CommonState } from 'shared/state';

export interface ActionReplicator<TState extends CommonState, TAction extends {type: string}> {
    replicateAction(action: TAction, updatedState: TState): void;
    shouldBeDispatchedLocally(action: TAction, oldState: TState): boolean;
}