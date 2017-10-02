import { getRandomId } from 'shared/utils';
import { PlayerId } from 'shared/player';

import { ServerStateContainer } from 'server/server-state-container';
import { PlayerMessageListener, MessageListenerBinding } from 'server/messaging/player-message-listener';
import { PlayerMessageSender } from 'server/messaging/player-message-sender';

export class Lobby {
    protected bindings: MessageListenerBinding[] = [];

    constructor(
        protected stateContainer: ServerStateContainer,
        protected listener: PlayerMessageListener,
        protected dispatcher: PlayerMessageSender
    ) {

    }

    start() {
        this.addSubscriptions([
            this.listener.subscribe('player-connected', (playerId, message) => {
                this.stateContainer.addPlayer(playerId, playerId);
            }),
            this.listener.subscribe('player-disconnected', (playerId, message) => {
                this.stateContainer.deletePlayer(playerId);
            }),
            this.listener.subscribe('create-game', (playerId, message) => {
                var name = this.stateContainer.fixNewGameName(message.name.trim()),
                    password = message.password,
                    listed = message.listed == null ? Boolean(message.listed) : true;
                
                var newGameId = getRandomId(8);
                
                this.stateContainer.addGame(playerId, newGameId, name, listed, password);
                console.log(`Created game: ${newGameId}`);
                
                if (listed) {
                    var lobbyPlayers = this.stateContainer.getAllLobbyPlayers();
                    this.dispatcher.sendToAll(lobbyPlayers, {
                        type: 'game-added',
                        gameData: {
                            id: newGameId,
                            name: name,
                            hasPassword: Boolean(password)
                        }
                    });
                    console.log(`Notified players of new game: `, lobbyPlayers);
                }
            }),
            this.listener.subscribe('delete-game', (playerId, message) => {
                if (this.stateContainer.getGameOwner(message.gameId) === playerId) {
                    var listed = this.stateContainer.isGameListed(message.gameId);

                    this.stateContainer.deleteGame(message.gameId);

                    var playersToNotify = [
                        ...this.stateContainer.getPlayersOfGame(message.gameId),
                        ...(listed ? this.stateContainer.getAllLobbyPlayers() : [])
                    ];

                    this.dispatcher.sendToAll(playersToNotify, {
                        type: 'game-removed',
                        gameId: message.gameId
                    });
                }
            }),
            this.listener.subscribe('join-game', (playerId, message) => {
                if (!this.stateContainer.isPlayerPlaying(playerId)) {
                    var playersToNotify = this.stateContainer.getPlayersOfGame(message.gameId);

                    this.stateContainer.addPlayerToGame(playerId, message.gameId);

                    this.dispatcher.sendToAll(playersToNotify, {
                        type: 'player-added-to-current-game',
                        playerId: playerId
                    });
                }
            }),
            this.listener.subscribe('leave-current-game', (playerId, message) => {
                if (this.stateContainer.isPlayerPlaying(playerId)) {
                    this.stateContainer.removePlayerFromCurrentGame(playerId);

                    var gameId = this.stateContainer.getGameOfPlayer(playerId);
                    if (gameId) {
                        var playersToNotify = this.stateContainer.getPlayersOfGame(gameId);
                        this.dispatcher.sendToAll(playersToNotify, {
                            type: 'player-removed-from-current-game',
                            playerId: playerId
                        });
                    }
                }
            }),
        ]);
    }

    stop() {
        for (var binding of this.bindings) {
            binding.destroy();
        }
        this.bindings.length = 0;
    }

    protected addSubscription(binding: MessageListenerBinding) {
        this.bindings.push(binding);
    }

    protected addSubscriptions(bindings: MessageListenerBinding[]) {
        for (var binding of bindings) {
            this.addSubscription(binding);
        }
    }
}