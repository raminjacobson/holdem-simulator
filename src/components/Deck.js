import React, { useState } from 'react';

export default function Deck() {
    const count = 52;
    const newDeck = Array(count).fill(0).map((v, i) => i);
    let [deck, setDeck] = useState(newDeck);

    const reset = function() {
        deck.splice(0, deck.length);;
        for(let i = 0; i < count; i++) { deck.push(i); }
        setDeck(deck);
    }

    const selectCard = function () {
        const index = Math.floor(Math.random() * (deck.length - 1));
        const value = deck.splice(index, 1);
        return value[0];
    }

    const remainingCards = function () {
        return (
            deck.map(card => (
                <img key={card.toString()} className="card-small" src={Deck.cardImgSrc(card)} alt={card} />
            ))
        )
    }

    return {
        reset,
        selectCard,
        remainingCards,
    }
}

function getCard(value) {
    const suits = ['c', 'd', 'h', 's'];
    const cards = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    const suit = suits[Math.floor(value / 13)];
    const index = value % 13;
    return `${suit}${cards[index]}`;
}

Deck.cardImgSrc = function (value) {
    const card = getCard(value).toLowerCase();
    const url = `https://estopoker.com/images/deck/classic/${card}.svg`;
    return url;
}
