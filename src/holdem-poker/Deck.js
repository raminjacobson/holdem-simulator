module.exports = function Deck() {
    const count = 52;
    const shuffleCount = 30;
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

    this.shuffle = () => {
        function swap(arr, i, j) {
            const temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
        function getRandomNumber() {
            return Math.floor(Math.random() * 52);
        }
        for (let i = 0; i < shuffleCount; i++) {
            const p1 = getRandomNumber();
            const p2 = getRandomNumber();
            swap(deck, p1, p2);
        }
    }

    this.peelCards = (count) => {
        return deck.splice(deck.length - count, count);
    }

    this.remainingCards = function () {
        return deck;
    }


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
        const url = `https://estopoker.com/images/deck/classic/${card}.svg`;
        return url;
    }
}