import { CommonAction } from 'shared/redux-actions/common';
import { ServerAction } from 'shared/redux-actions/server';
import { ClientAction } from 'shared/redux-actions/client';

export interface CommonMessages {
    'redux-action': {
        type: 'redux-action';
        action: CommonAction | ClientAction | ServerAction;
    }
}

export type CommonMessageType = keyof CommonMessages;
export type CommonMessage = CommonMessages[CommonMessageType];