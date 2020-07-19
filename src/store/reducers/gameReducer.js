import Deck from "../../holdem-poker/Deck";

const gameActions = {
    NEW_GAME: 'NEW_GAME',
    DEAL_CARDS: 'DEAL_CARDS',
    DEAL_FLOP: 'DEAL_FLOP',
    DEAL_TURN: 'DEAL_TURN',
    DEAL_RIVER: 'DEAL_RIVER',
    SET_PLAYER_COUNT: 'SET_PLAYER_COUNT',
    SET_PLAYBACK_SPEED: 'SET_PLAYBACK_SPEED',
    SET_BOARD_COORDS: 'SET_BOARD_COORDS'
}

const gameReducer = (state, { type, payload }) => {
    switch (type) {
        case gameActions.NEW_GAME:
            {
                const deck = new Deck();
                deck.convertToShortDeck(payload.shortDeck.fromValue, payload.shortDeck.toValue);
                deck.shuffle();
                state.deck = deck;
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
                playerCards: payload.cards,
                deck: payload.deck
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

        case gameActions.SET_BOARD_COORDS:
            return {
                ...state,
                boardCoords: {
                    x: payload.x,
                    y: payload.y,
                    w: payload.w,
                    h: payload.h,
                }
            }
        default:
            return state;
    }
};

export { gameReducer, gameActions };