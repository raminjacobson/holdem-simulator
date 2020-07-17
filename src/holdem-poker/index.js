const Deck = require('./Deck');
const Holdem = require('./Holdem');

let hand = null;

function handStrength(hand) {
    const deck = new Deck();
    deck.shuffle();
    const holdem = new Holdem();
    holdem.setCards(hand);

    console.log(holdem.print().map(x => x.join('')));
    console.log(holdem.handStrength());
    console.log('---------');
}

hand = [51, 50, 49, 48, 47, 3, 7]; // => Spades Royal Flush
handStrength(hand);

hand = [46, 50, 49, 48, 47, 3, 7]; // => Spades K High Flush
handStrength(hand);

hand = [0, 13, 26, 39, 40, 51, 6]; // => Four of a Kind, 2s
handStrength(hand);

hand = [12, 25, 7, 38, 19, 2, 20]; // => Full House, As and 9s
handStrength(hand);

hand = [0, 1, 4, 6, 10, 30, 40]; // => Q high Flush
handStrength(hand);


hand = [3, 18, 4, 6, 28, 30, 40]; // => 8 High Straight
handStrength(hand);

hand = [0, 14, 2, 3, 12, 40, 41];  // => Wheel (5 high straight)
handStrength(hand);

hand = [9, 22, 35, 2, 3, 4, 50]; // => Three of a Kind, Js
handStrength(hand);



hand = [1, 14, 12, 25, 30, 35, 50]; // => Two Pair, As and 3s
handStrength(hand);

hand = [3, 19, 12, 20, 30, 16, 50]; // => One Pair, 5s
handStrength(hand);

hand = [0, 1, 2, 3, 31, 19, 21]; // => 10 High
handStrength(hand);


// deck.shuffle();
// hand = deck.peelCards(7);
// holdem = new Holdem(deck, hand);
// determine(hand);

