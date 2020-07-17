import React, { useContext } from 'react';
import { Context, ReducerType } from '../store/Store';
import Deck from './Deck';
import Player from './Player';
import Board from './Board';

export default function Game() {
    const deck = new Deck();

    const [state, dispatch] = useContext(Context);

    function handleReset() {
        deck.reset();
        dispatch({
            reducer: ReducerType.GAME,
            type: 'NEW_GAME',
        });
    }

    function handleDealCards() {
        const cards = [];
        for (let i = 0; i < state.playerCount; i++) {
            let card = dealCards();
            cards[i] = card;
        }
        sleep(state.delay / 2);
        dispatch({
            reducer: ReducerType.GAME,
            type: 'NEW_GAME',
        });
        sleep(state.delay);
        dispatch({
            reducer: ReducerType.GAME,
            type: 'DEAL_CARDS',
            payload: {
                cards
            }
        });
    }

    function handleFlop() {
        const cards = peelCards(3);
        dispatch({
            reducer: ReducerType.GAME,
            type: 'DEAL_FLOP',
            payload: {
                cards: cards
            }
        });
    }

    function handleTurn() {
        const cards = peelCards(1);
        dispatch({
            reducer: ReducerType.GAME,
            type: 'DEAL_TURN',
            payload: {
                cards
            }
        });
    }

    function handleRiver() {
        const cards = peelCards(1);
        dispatch({
            reducer: ReducerType.GAME,
            type: 'DEAL_RIVER',
            payload: {
                cards
            }
        });
    }

    function handlePlayerCount(e) {
        const count = e.target.value;
        dispatch({
            reducer: ReducerType.GAME,
            type: 'SET_PLAYER_COUNT',
            payload: {
                count
            }
        });
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(() => { resolve() }, ms));
    }

    async function handleAutoDeal() {
        handleReset();
        await sleep(state.delay / 2);

        handleDealCards();
        await sleep(state.delay);

        handleFlop();
        await sleep(state.delay);

        handleTurn();
        await sleep(state.delay);

        handleRiver();
        await sleep(1.5 * state.delay);
    }

    function dealCards() {
        const cards = [];
        cards.push(deck.selectCard());
        cards.push(deck.selectCard());
        return cards;
    }
    function peelCards(count) {
        const cards = [];
        for (let i = 0; i < count; i++) {
            const value = deck.selectCard();
            cards.push(value);
        }
        return cards;
    }

    const options = [0];
    for (let i = 0; i < 10; i++) {
        options.push(i + 1);
    }

    const dealButton = (state.currentRound === 'NEW_GAME' || state.currentRound === 'DEAL_RIVER');
    return (
        <>
            <button onClick={handleReset}>Reset</button>
            <button onClick={handleDealCards} disabled={!dealButton}>Deal</button>
            <button onClick={handleFlop} disabled={state.playerCards.length === 0 || state.boardCards.length > 2}>Flop</button>
            <button onClick={handleTurn} disabled={state.boardCards.length !== 3}>Turn</button>
            <button onClick={handleRiver} disabled={state.boardCards.length !== 4}>River</button>
            <button onClick={handleAutoDeal}>Auto Deal</button>
            <hr></hr>
            <center>
                <table>
                    <tr>
                        Number of Players:
                        <select onChange={handlePlayerCount}>
                            {
                                options.map(i => (
                                    <option value={i} selected={state.playerCount === i ? 'selected' : ''}>{i}</option>
                                ))
                            }
                        </select>
                    </tr>
                    <tr>
                        {
                            state.playerCards.map((cards, i) => (
                                <td width={`${Math.floor(100 / state.playerCount)}%`} height="200" bgcolor="#aaa" align="center">
                                    <Player id={i + 1} cards={cards} />
                                </td>
                            ))
                        }
                    </tr>
                    <tr>
                        <td colspan={state.playerCount}>
                            <Board cards={state.boardCards} />
                        </td>
                    </tr>
                </table>
            </center>


            <hr />
            <h1>Remaining Cards ({deck.remainingCards().length}) </h1>
            {deck.remainingCards()}
        </>
    )
}

