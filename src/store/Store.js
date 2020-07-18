import React, { createContext, useReducer } from "react";
import { Reducer, ReducerType, ReducerActions } from './Reducer';
import Deck from '../holdem-poker/Deck';

const deck = new Deck();
deck.shuffle();

const initialState = {
    currentRound: ReducerActions.GAME.NEW_GAME,
    playerCount: 2,
    boardCards: [],
    playerCards: [],
    history: [],
    deck: deck,
    delay: 1500,
    shortDeck: {
        fromValue: 0,
        toValue: 12
    },
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