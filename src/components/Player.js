import React, { useContext } from 'react';
import { Context } from '../store/Store';
import Holdem from '../holdem-poker/Holdem';

export default function Player(props) {
    const [state] = useContext(Context);

    const [animation, setAnimation] = React.useState(false);
    React.useEffect(() => {
        setAnimation(props.cards.length === 2);
    });

    const holdem = new Holdem();
    function handValue(cards) {
        const sevenCards = cards.concat(state.boardCards);
        holdem.setCards(sevenCards);
        let value = holdem.handStrength();
        return (
            <div className={`value ${state.currentRound === 'DEAL_RIVER' ? 'fade-1sec' : ''}`}>{value}</div>
        )
    }

    const playerCards = props.cards.map(card =>
        <img key={card.toString()} className={`card-small player-card${animation ? ' fade' : ''}`}
            src={state.deck.cardImgUrl(card)} alt={card} />
    )

    return (
        <React.Fragment>
            <div class="player-cards"
                style={{ position: 'absolute', top: props.coords.y, left: props.coords.x }}>
                {playerCards}
                {handValue(props.cards)}
            </div>
        </React.Fragment>
    );
}