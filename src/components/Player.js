import React from 'react';
import Deck from './Deck';


export default function Player(props) {
    const [animation, setAnimation] = React.useState(false);
    React.useEffect(() => {
        setAnimation(props.cards.length === 2);
    });

    return (
        <React.Fragment>
            <h1>Player {props.id}</h1>
            {
                props.cards.map(card =>
                    <img key={card.toString()} className={`card-small player-card${animation ? ' fade' : ''}`}
                        src={Deck.cardImgSrc(card)} alt={card} />)
            }
        </React.Fragment>
    );
}