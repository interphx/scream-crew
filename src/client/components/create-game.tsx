import * as React from 'react';
import { Dispatch } from 'react-redux';

import { ClientAction } from 'shared/redux-actions/client';
import { getRandomId } from 'shared/utils';
import { PlayerId } from 'shared/player';

interface CreateGameProps {
    playerId: PlayerId;
    dispatch: Dispatch<ClientAction>;
}

interface CreateGameState {
    name: string;
    showPasswordField: boolean;
    password: string;
    listed: boolean;
    loading: boolean;
}

export class CreateGame extends React.Component<CreateGameProps, CreateGameState> {
    constructor(props: CreateGameProps) {
        super(props);

        this.state = {
            name: '',
            showPasswordField: false,
            password: '',
            listed: true,
            loading: false
        };

        this.handleFormInputChange = this.handleFormInputChange.bind(this);
        this.save = this.save.bind(this);
    }

    handleFormInputChange(event: React.FormEvent<HTMLInputElement>) {
        var target = event.currentTarget,
            name   = target.name as any,
            value  = target.type === 'checkbox' ? target.checked : target.value;

        this.setState({ [name]: value });
    }

    async save(event: React.FormEvent<any>) {
        event.preventDefault();

        this.setState({ loading: true });

        this.props.dispatch({
            type: 'LOBBY:ADD_GAME',
            game: {
                id: getRandomId(8),
                listed: this.state.listed,
                name: this.state.name,
                password: this.state.password,
                owner: this.props.playerId
            }
        });

        // TODO: Replace with dispatch
        /*var response = await this.props.messageSender.request({
            type: 'create-game',
            name: this.state.name,
            password: this.state.password,
            listed: this.state.listed
        });
        this.setState({ loading: false });

        if (response.successful) {
            alert(`Successfully created a game! Id: ${response.newGameId}`);
            console.log(`Successfully created a game! Id: ${response.newGameId}`);
        } else {
            alert(`Failed to create a game. Reason: ${response.error}`);
            console.log(`Failed to create a game. Reason: ${response.error}`);
        }*/
    }

    render() {
        if (this.state.loading) {
            return <form>
                Loading...
            </form>
        }

        return (
            <form onSubmit={this.save}>
                <input type="text"
                       placeholder="name"
                       name="name"
                       min="1" max="120"
                       onChange={this.handleFormInputChange} />
                <input type="text"
                       placeholder="password"
                       name="password"
                       min="0" max="30"
                       onChange={this.handleFormInputChange} />
                <input type="checkbox"
                       name="listed"
                       checked={true}
                       onChange={this.handleFormInputChange} /> 
                <button type="submit">Создать</button>    
            </form>
        );
    }
}