import * as React from 'react';

import { Button, ControlId } from 'shared/controls';

import { ServerMessageSender } from 'client/messaging/server-message-sender';


interface ButtonProps {
    buttonControl: Button;
    messageSender: ServerMessageSender;
}

function sendPressAction(controlId: ControlId, messageSender: ServerMessageSender) {
    messageSender.send({
        type: 'control-action',
        action: {
            type: 'button-press',
            controlId: controlId
        }
    });
}

export function Button(props: ButtonProps) {
    var {
        buttonControl,
        messageSender
    } = props;

    return (
        <button onClick={() => sendPressAction(buttonControl.id, messageSender)}>
            { buttonControl.name }
        </button>
    );
}