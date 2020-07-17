import React, { useContext } from 'react';
import { Context, ReducerType } from '../store/Store';
import Deck from './Deck';
import Holdem from '../holdem-poker/Holdem';

export default function Player(props) {
    const [state, dispatch] = useContext(Context);

    const [animation, setAnimation] = React.useState(false);
    React.useEffect(() => {
        setAnimation(props.cards.length === 2);
    });

    function handValue(cards) {
        const holdem = new Holdem();
        const sevenCards = cards.concat(state.boardCards);
        holdem.setCards(sevenCards);
        const value = holdem.handStrength();

        return (
            <h3>{value}</h3>
        )
    }

    const p = props.cards.map(card =>
        <img key={card.toString()} className={`card-small player-card${animation ? ' fade' : ''}`}
            src={Deck.cardImgSrc(card)} alt={card} />
    )


    return (
        <React.Fragment>
            <h1>Player {props.id}</h1>
            {p}
            {handValue(props.cards)}
        </React.Fragment>
    );
}