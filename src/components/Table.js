import React, { useState } from 'react';
import Deck from './Deck';
import Player from './Player';
import Board from './Board';

export default function Table() {
    const deck = new Deck();
    const [playerCards, setPlayerCards] = useState([]);
    const [boardCards, setBoardCards] = useState([]);
    const [PLAYER_COUNT, SET_PLAYER_COUNT] = useState(2);

    function handleReset() {
        deck.reset();
        // SET_PLAYER_COUNT(2);
        setPlayerCards(prev => []);
        setBoardCards(prev => []);
    }

    function handleDealCards() {
        const arr = [];
        for (let i = 0; i < PLAYER_COUNT; i++) {
            let cards = dealCards();
            arr[i] = cards;
        }
        setPlayerCards(prev => [...prev, ...arr]);
    }

    function handleFlop() {
        const cards = peelCards(3);
        setBoardCards(prev => [...prev, ...cards]);
    }

    function handleTurn() {
        const cards = peelCards(1);
        setBoardCards(prev => [...prev, ...cards]);
    }

    function handleRiver() {
        const cards = peelCards(1);
        setBoardCards(prev => [...prev, ...cards]);
    }

    function handlePlayerCount(e) {
        SET_PLAYER_COUNT(e.target.value);
    }

    function timeout(ms) {
        return new Promise(resolve => setTimeout(() => { resolve() }, ms));
    }

    async function handleAutoDeal() {
        const delay = 2000;
        handleReset();
        await timeout(delay / 2);
        handleDealCards();
        await timeout(delay);
        handleFlop();
        await timeout(delay);
        handleTurn();
        await timeout(delay);
        handleRiver();
        await timeout(1.5 * delay);
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
    return (
        <>
            <button onClick={handleReset}>Reset</button>
            <button onClick={handleDealCards} disabled={playerCards.length > 0 || boardCards.length !== 0} >Deal</button>
            <button onClick={handleFlop} disabled={playerCards.length === 0 || boardCards.length > 2}>Flop</button>
            <button onClick={handleTurn} disabled={boardCards.length !== 3}>Turn</button>
            <button onClick={handleRiver} disabled={boardCards.length !== 4}>River</button>
            <button onClick={handleAutoDeal}>Auto Deal</button>
            <hr></hr>
            <center>
                <table>
                    <tr>
                        Number of Players:
                        <select onChange={handlePlayerCount}>
                            {
                                options.map(i => (
                                    <option value={i} selected={PLAYER_COUNT === i ? 'selected' : ''}>{i}</option>
                                ))
                            }
                        </select>
                    </tr>
                    <tr>
                        {
                            playerCards.map((cards, i) => (
                                <td width={`${Math.floor(100 / PLAYER_COUNT)}%`} height="200" bgcolor="#aaa" align="center">
                                    <Player id={i + 1} cards={cards} />
                                </td>
                            ))
                        }
                    </tr>
                    <tr>
                        <td colspan={PLAYER_COUNT}>
                            <Board cards={boardCards} />
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

