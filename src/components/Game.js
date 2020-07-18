import React, { useContext } from 'react';
import { Context, ReducerType, ReducerActions } from '../store/Store';
import Player from './Player';
import Board from './Board';

export default function Game() {
    const [state, dispatch] = useContext(Context);

    function handleReset() {
        sleep(state.delay / 2);
        dispatch({
            reducer: ReducerType.GAME,
            type: ReducerActions.GAME.NEW_GAME,
        });
    }

    function handleDealCards() {
        handleReset();

        sleep(state.delay);
        const cards = [];
        for (let i = 0; i < state.playerCount; i++) {
            cards[i] = state.deck.peelCards(2);
        }
        dispatch({
            reducer: ReducerType.GAME,
            type: ReducerActions.GAME.DEAL_CARDS,
            payload: {
                cards,
                deck: state.deck
            }
        });
    }

    function handleFlop() {
        const cards = state.deck.peelCards(3);
        dispatch({
            reducer: ReducerType.GAME,
            type: ReducerActions.GAME.DEAL_FLOP,
            payload: {
                cards: cards
            }
        });
    }

    function handleTurn() {
        const cards = state.deck.peelCards(1);
        dispatch({
            reducer: ReducerType.GAME,
            type: ReducerActions.GAME.DEAL_TURN,
            payload: {
                cards
            }
        });
    }

    function handleRiver() {
        const cards = state.deck.peelCards(1);
        dispatch({
            reducer: ReducerType.GAME,
            type: ReducerActions.GAME.DEAL_RIVER,
            payload: {
                cards
            }
        });
    }

    function handlePlayerCount(e) {
        const count = e.target.value;
        dispatch({
            reducer: ReducerType.GAME,
            type: ReducerActions.GAME.SET_PLAYER_COUNT,
            payload: {
                count
            }
        });
    }

    const handleSpeedChange = (e) => {
        const speed = e.target.value;
        dispatch({
            reducer: ReducerType.GAME,
            type: ReducerActions.GAME.SET_PLAYBACK_SPEED,
            payload: {
                speed
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
        await sleep(1.5 * state.delay);

        handleTurn();
        await sleep(1.5 * state.delay);

        handleRiver();
        await sleep(1.5 * state.delay);
    }

    function getCoords(pointCount) {
        var width = window.innerWidth - 220,
            height = window.innerHeight * .7;
        var rx = 550, ry = 300;
        var degree = 360 / pointCount;
        const result = [];
        for (var i = 0; i < pointCount; i++) {
            var point = polarToCartesian(width / 2, height / 2, rx, ry, i * degree);
            result.push(point);
        }
        function polarToCartesian(centerX, centerY, radiusX, radiusY, angleInDegrees) {
            var angleInRadians = (angleInDegrees * Math.PI / 180.0);
            const x = centerX + (radiusX * Math.cos(angleInRadians));
            const y = centerY + (radiusY * Math.sin(angleInRadians));
            return {
                x: Math.floor(x),
                y: Math.floor(y)
            };
        }
        return result;
    }

    const options = [0];
    for (let i = 0; i < 10; i++) {
        options.push(i + 1);
    }

    const speed = [500, 750, 1000, 1250, 1500, 2000, 2500, 3000];
    const dealButton = (
        state.currentRound === ReducerActions.GAME.NEW_GAME
        || state.currentRound === ReducerActions.GAME.DEAL_RIVER
    );
    const flopButton = state.currentRound === ReducerActions.GAME.DEAL_CARDS;
    const turnButton = state.currentRound === ReducerActions.GAME.DEAL_FLOP;
    const riverButton = state.currentRound === ReducerActions.GAME.DEAL_TURN;
    const autoDealButton = (
        state.currentRound === ReducerActions.GAME.NEW_GAME
        || state.currentRound === ReducerActions.GAME.DEAL_RIVER
    );
    const dropDownSelectPlayers = state.currentRound === ReducerActions.GAME.NEW_GAME;
    const coords = getCoords(state.playerCount);

    return (
        <>
            <center>
                <button onClick={handleReset}>Reset</button>
                <button onClick={handleDealCards} disabled={!dealButton}>Deal</button>
                <button onClick={handleFlop} disabled={!flopButton}>Flop</button>
                <button onClick={handleTurn} disabled={!turnButton}>Turn</button>
                <button onClick={handleRiver} disabled={!riverButton}>River</button>
                <button onClick={handleAutoDeal} disabled={!autoDealButton}>Auto Deal</button>


                Number of Players:
                        <select onChange={handlePlayerCount} disabled={!dropDownSelectPlayers}>
                    {
                        options.map(i => (
                            <option value={i} selected={state.playerCount === i ? 'selected' : ''}>{i}</option>
                        ))
                    }
                </select>
                        &nbsp; &nbsp; &nbsp; &nbsp;
                        Speed (ms):
                        <select onChange={handleSpeedChange}>
                    {
                        speed.map(i => (
                            <option value={i} selected={state.delay === i ? 'selected' : ''}>{i}</option>
                        ))
                    }
                </select>
                <table width="100%" bgcolor="#2C2537" border="1" cellSpacing="1">
                    <tr>
                        <td style={{ position: 'relative', height: '750px', width: '800px' }}>
                            <Board cards={state.boardCards} />
                            {
                                state.playerCards.map((cards, i) => (
                                    <Player id={i + 1} cards={cards} coords={coords[i]} />
                                ))
                            }
                        </td>
                    </tr>
                </table>
            </center>
            <hr />
            <h1>Remaining Cards ({state.deck.remainingCards.length}) </h1>
            {
                state.deck.remainingCards.map(card => (
                    <img key={card.toString()} className="card-small"
                        src={state.deck.cardImgUrl(card)} alt={card} />
                ))
            }
        </>
    )
}

