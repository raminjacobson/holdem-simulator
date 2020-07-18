import React, { useContext } from 'react';
import { Context } from '../store/Store';

export default function Board(props) {
    const [state] = useContext(Context);

    const [animationFlop, setAnimationFlop] = React.useState(false);
    const [animationTurn, setAnimationTurn] = React.useState(false);
    const [animationRiver, setAnimationRiver] = React.useState(false);
    React.useEffect(() => {
        setAnimationFlop(props.cards.length >= 3);
        setAnimationTurn(props.cards.length >= 4);
        setAnimationRiver(props.cards.length === 5);
    });

    return (
        <>
            <div className="felt">
                {props.cards.map((card, i) => (
                    <img key={card.toString()} className={`card flop-${i}
                    ${animationFlop ? ' anim-flop' : ''}
                    ${animationTurn ? ' anim-turn' : ''}
                    ${animationRiver ? ' anim-river' : ''}
                    `
                    } src={state.deck.cardImgUrl(card)} alt={card} />
                ))}
            </div>
        </>
    )
}