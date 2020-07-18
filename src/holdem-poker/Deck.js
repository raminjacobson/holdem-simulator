function Deck() {
    const count = 52;
    const deck = Array(count).fill(0).map((v, i) => i);

    this.SUITS = ['c', 'd', 'h', 's'];
    this.SUIT_NAMES = {
        'c': 'Clubs',
        'd': 'Diamonds',
        'h': 'Hearts',
        's': 'Spades'
    };
    this.VALUES = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    this.VALUE_NAMES = {
        '2': '2',
        '3': '3',
        '4': '4',
        '5': '5',
        '6': '6',
        '7': '7',
        '8': '8',
        '9': '9',
        '10': '10',
        'J': 'Jack',
        'Q': 'Queen',
        'K': 'King',
        'A': 'Ace'
    };



    this.convertToShortDeck = (fromValue = 0, toValue = 12) => {
        const shortDeck = [];
        for (let i = 0; i < deck.length; ++i) {
            if (
                (i % 13 >= fromValue && i % 13 <= toValue)
            ) {
                shortDeck.push(i);
            }
        }
        deck.splice(0, deck.length);
        shortDeck.forEach(i => {
            deck.push(i);
        });
    }

    /**  
     * https://medium.com/@nitinpatel_20236/how-to-shuffle-correctly-shuffle-an-array-in-javascript-15ea3f84bfb 
     */
    this.shuffle = async () => {
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * i)
            const temp = deck[i]
            deck[i] = deck[j]
            deck[j] = temp
        }
        return this;
    }

    this.peelCards = (count) => {
        return deck.splice(deck.length - count, count);
    }

    this.remainingCards = deck;

    this.getCard = function (index) {
        const suit = this.SUITS[Math.floor(index / 13)];
        const value = this.VALUES[index % 13];
        return [value, suit];
    }
    this.cardImgUrl = function (value) {
        /**
         * return: e.g. [2, c]
         */
        const card = this.getCard(value).reverse().join('').toLowerCase();
        // const url = `https://estopoker.com/images/deck/classic/${card}.svg`;
        const url = `/images/${card}.svg`;
        return url;
    }
}
export default Deck;
