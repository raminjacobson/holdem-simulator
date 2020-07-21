import React, { useContext } from 'react';
import { Context } from '../store/Store';
import Deck from '../holdem-poker/Deck';
import PokerSolver from 'pokersolver';


export default function Player(props) {
    const [state] = useContext(Context);

    const [animation, setAnimation] = React.useState(false);
    React.useEffect(() => {
        setAnimation(props.cards.length === 2);
    });

    function handValue(props) {
        const sevenCards = props.cards.concat(state.boardCards);
        let value = `Player ${props.id}`;
        const deck = new Deck();
        const C = sevenCards.map(x => {
            const card = deck.getCard(x);
            return `${card[0].toUpperCase().replace('10', 'T')}${card[1]}`;
        });
        if (sevenCards.length === 7) {
            var hand1 = PokerSolver.Hand.solve(C);
            value = hand1.descr;
        }

        return (
            <div className={`value ${state.currentRound === 'DEAL_RIVER' ? 'fade-1sec' : ''}`}>{value}</div>
        )
    }

    const playerCards = props.cards.map(card =>
        <img key={card.toString()} className={`card-small player-card${animation ? ' fade' : ''}`}
            src={state.deck.cardImgUrl(card)}
            alt={state.deck.getCard(card).join('')}
            title={state.deck.getCard(card).join('')} />
    )

    return (
        <React.Fragment>
            <div className="player-cards"
                style={{ position: 'absolute', top: props.coords.y, left: props.coords.x }}>
                {playerCards}
                {handValue(props)}
            </div>
        </React.Fragment>
    );
}