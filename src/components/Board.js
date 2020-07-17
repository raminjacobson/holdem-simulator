import React from 'react';
import Deck from './Deck'

export default function Board(props) {
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
                    } src={Deck.cardImgSrc(card)} alt={card} />
                ))}
            </div>
        </>
    )
}