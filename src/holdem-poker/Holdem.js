var Deck = require('./Deck');
/**
 * Returns a string indicating the hand strength.
 */
module.exports = function Holdem() {
    const arrayMax = (arr) => arr.reduce((a, b) => Math.max(a, b));
    const deck = new Deck();

    this.cards = [];
    this.setCards = function (cards) {
        this.cards = cards;
    }
    this.print = function () {
        const result = [];
        this.cards.forEach(card => {
            result.push(deck.getCard(card));
        });
        return result;
    }

    function analyze(cards) {
        const desc = (a, b) => b - a;
        const sorted = [...cards].sort(desc);
        const breakdown = {
            sortedCards: sorted,
            sortedValues: sorted.map(x => x % 13).sort(desc),
            values: {},
            suits: {},
            quads: [],
            trips: [],
            pairs: []
        }
        Array(13).fill(0).forEach((v, i) => breakdown.values[i] = 0);
        deck.SUITS.forEach(suit => breakdown.suits[suit] = []);
        cards.forEach(card => {
            const value = card % 13;
            const suit = deck.SUITS[Math.floor(card / 13)];
            breakdown.values[value]++;
            breakdown.suits[suit].push(value);
        });
        deck.SUITS.forEach(suit => breakdown.suits[suit].sort(desc));

        for (let i = 12; i >= 0; i--) {
            switch (breakdown.values[i]) {
                case 4: breakdown.quads.push(i); break;
                case 3: breakdown.trips.push(i); break;
                case 2: breakdown.pairs.push(i); break;
                default: break;
            }
        }
        return breakdown;
    }

    this.handStrength = function () {
        const breakdown = analyze(this.cards);
        const order = [
            isStraightFlush,
            FourOfAKind,
            FullHouse,
            Flush,
            Straight,
            ThreeOfAKind,
            TwoPair,
            OnePair,
            HighCard
        ];
        for (let item of order) {
            const result = item.call(null, breakdown);
            if (result[0] === true) {
                return result[1];
            }
        }
        throw new Error("Hand strength NOT detected");
    }

    function is5Consecutive(arr, start, finish) {
        let result = true;
        for (let i = start; i < finish; i++) {
            if (arr[i] - arr[i + 1] !== 1) {
                result = false;
                break;
            }
        }
        return result;
    }

    function isStraightFlush(breakdown) {
        let message = '';
        let straighFlush = false;
        const cards = breakdown.sortedCards;
        for (let i = 0; i < 3; i++) {
            straighFlush = is5Consecutive(cards, i, i + 4);
            if (straighFlush) {
                const [value, suit] = deck.getCard(cards[i]);
                const name = deck.VALUE_NAMES[value];
                if (value === 'A') {
                    message = `${deck.SUIT_NAMES[suit]} Royal Flush`;
                } else {
                    message = `${deck.SUIT_NAMES[suit]} ${name}-high Straight Flush`;
                }
                break;
            }
        }
        const result = [straighFlush, message];
        return result;
    }

    function FourOfAKind(breakdown) {
        if (breakdown.quads.length === 1) {
            const value = breakdown.quads[0];
            const name = deck.VALUE_NAMES[deck.getCard(value)[0]];
            return [true, `Four of a Kind, ${name}s`];
        }
        return [false, ''];
    }


    function FullHouse(breakdown) {
        if (breakdown.trips.length > 0 && breakdown.pairs.length > 0) {
            const name1 = deck.VALUE_NAMES[deck.getCard(breakdown.trips[0])[0]];
            const name2 = deck.VALUE_NAMES[deck.getCard(breakdown.pairs[0])[0]];
            return [true, `Full House, ${name1}s and ${name2}s`];
        }
        return [false, ''];
    }


    function Flush(breakdown) {
        for (let suit of deck.SUITS) {
            if (breakdown.suits[suit].length >= 5) {
                let highCard = arrayMax(breakdown.suits[suit]);
                const name = deck.VALUE_NAMES[deck.getCard(highCard)[0]];
                return [true, `${name}-high ${deck.SUIT_NAMES[suit]} Flush`];
            }
        }
        return [false, ''];
    }

    function Straight(breakdown) {
        let cards = new Set(breakdown.sortedValues);
        cards = [...cards];
        for (let i = 0; i < 3; i++) {
            const straight = is5Consecutive(cards, i, i + 4);
            if (straight) {
                const [value] = deck.getCard(cards[i]);
                const name = deck.VALUE_NAMES[value];
                const message = `${name}-high Straight`;
                return [true, message];
            }
        }
        return [false, ''];
    }

    function ThreeOfAKind(breakdown) {
        if (breakdown.trips.length === 1) {
            const trips = breakdown.trips[0];
            const name = deck.VALUE_NAMES[deck.getCard(trips)[0]];
            return [true, `Three of a Kind, ${name}s`];
        }
        return [false, ''];
    }

    function TwoPair(breakdown) {
        if (breakdown.pairs.length >= 2) {
            const hiPair = breakdown.pairs[0];
            const loPair = breakdown.pairs[1];
            const name1 = deck.VALUE_NAMES[deck.getCard(hiPair)[0]];
            const name2 = deck.VALUE_NAMES[deck.getCard(loPair)[0]];
            return [true, `Two Pair, ${name1}s and ${name2}s`];
        }
        return [false, ''];
    }
    function OnePair(breakdown) {
        if (breakdown.pairs.length === 1) {
            const pair = breakdown.pairs[0];
            const name = deck.VALUE_NAMES[deck.getCard(pair)[0]];
            return [true, `One Pair, ${name}s`];
        }
        return [false, ''];
    }

    function HighCard(breakdown) {
        const index = breakdown.sortedValues[0];
        const card = deck.getCard(index);
        const name = deck.VALUE_NAMES[card[0]];
        return [true, `${name} High`];
    }
}
