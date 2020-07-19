import React from 'react';
import Deck from '../holdem-poker/Deck';

const DeckRangePicker = () => {
    const deck = new Deck();

    const options = deck.VALUES.map(i => <option value={i}>{i}</option>);
    return (
        <form method="get" action="?" style={{ display: 'inline-block' }}>
            Deck Range
            From:
            &nbsp;
            <select name="from">
                {options}
            </select>
            &nbsp;
            To:
            &nbsp;
            <select name="to">
                {options}
            </select>
            &nbsp;
            <input type="submit"></input>
        </form>
    )
}

export default DeckRangePicker;