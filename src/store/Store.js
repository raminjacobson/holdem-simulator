import React, { createContext, useReducer } from "react";
import { Reducer, ReducerType, ReducerActions } from './Reducer';
import Deck from '../holdem-poker/Deck';

const deck = new Deck();
deck.shuffle();

const initialState = {
    boardCards: [],
    boardCoords: { x: 0, y: 0, w: 0, h: 0 },
    currentRound: ReducerActions.GAME.NEW_GAME,
    deck: deck,
    delay: 1500,
    history: [],
    playerCards: [],
    playerCount: 2,
    deckRange: { fromValue: 0, toValue: 12 },
    error: null,
};

const Store = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, initialState);
    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
};

const Context = createContext(initialState);


export { Context, ReducerType, ReducerActions };
export default Store;