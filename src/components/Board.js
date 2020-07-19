import React, { useEffect, useContext, createRef } from 'react';
import { Context, ReducerActions, ReducerType } from '../store/Store';

export default function Board(props) {
    const [state, dispatch] = useContext(Context);
    const refBorad = createRef();

    const [animationFlop, setAnimationFlop] = React.useState(false);
    const [animationTurn, setAnimationTurn] = React.useState(false);
    const [animationRiver, setAnimationRiver] = React.useState(false);
    useEffect(() => {
        setAnimationFlop(props.cards.length >= 3);
        setAnimationTurn(props.cards.length >= 4);
        setAnimationRiver(props.cards.length === 5);

    });
    useEffect(() => {
        dispatch({
            reducer: ReducerType.GAME,
            type: ReducerActions.GAME.SET_BOARD_COORDS,
            payload: {
                x: refBorad.current.offsetLeft,
                y: refBorad.current.offsetTop,
                w: refBorad.current.clientWidth,
                h: refBorad.current.clientHeight,
            }
        });
    }, []);

    return (
        <div className="felt" ref={refBorad}>
            <div className="board">
                {props.cards.map((card, i) => (
                    <img key={card.toString()} className={`card flop-${i}
                    ${animationFlop ? ' anim-flop' : ''}
                    ${animationTurn ? ' anim-turn' : ''}
                    ${animationRiver ? ' anim-river' : ''}
                    `
                    } src={state.deck.cardImgUrl(card)} alt={card} />
                ))}
            </div>
        </div>
    )
}