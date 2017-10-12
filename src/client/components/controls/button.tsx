import * as React from 'react';

import { Button, ControlId } from 'shared/controls';

import { ServerMessageSender } from 'client/messaging/server-message-sender';


interface ButtonProps {
    buttonControl: Button;
}

function sendPressAction(controlId: ControlId, messageSender: ServerMessageSender) {

}

export function Button(props: ButtonProps) {
    var {
        buttonControl
    } = props;

    return (
        <button onClick={() => {}}>
            { buttonControl.name }
        </button>
    );
}