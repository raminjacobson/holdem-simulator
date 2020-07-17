const gameActions = {
    NEW_GAME: 'NEW_GAME',
    DEAL_CARDS: 'DEAL_CARDS',
    DEAL_FLOP: 'DEAL_FLOP',
    DEAL_TURN: 'DEAL_TURN',
    DEAL_RIVER: 'DEAL_RIVER',
    SET_PLAYER_COUNT: 'SET_PLAYER_COUNT',
    SET_PLAYBACK_SPEED: 'SET_PLAYBACK_SPEED'
}

const gameReducer = (state, { type, payload }) => {
    switch (type) {
        case gameActions.NEW_GAME:
            {
                return {
                    ...state,
                    currentRound: gameActions.NEW_GAME,
                    boardCards: [],
                    playerCards: [],
                }
            }

        case gameActions.DEAL_CARDS:
            return {
                ...state,
                currentRound: gameActions.DEAL_CARDS,
                playerCards: payload.cards
            }

        case gameActions.DEAL_FLOP:
            return {
                ...state,
                currentRound: gameActions.DEAL_FLOP,
                boardCards: state.boardCards.concat(payload.cards)
            }

        case gameActions.DEAL_TURN:
            return {
                ...state,
                currentRound: gameActions.DEAL_TURN,
                boardCards: state.boardCards.concat(payload.cards)
            }

        case gameActions.DEAL_RIVER:
            {
                return {
                    ...state,
                    currentRound: gameActions.DEAL_RIVER,
                    boardCards: state.boardCards.concat(payload.cards)
                }
            }

        case gameActions.SET_PLAYER_COUNT:
            {
                return {
                    ...state,
                    playerCount: payload.count
                }
            }

        case gameActions.SET_PLAYBACK_SPEED:
            return {
                ...state,
                delay: payload.speed
            }

        default:
            return state;
    }
};

export { gameReducer, gameActions };