import { gameReducer, gameActions } from './reducers/gameReducer';

const ReducerType = {
    GAME: 'GAME',
}
const ReducerAction = {
    ...gameActions
}


const reducerMap = {
    [ReducerType.GAME]: gameReducer,
}

const Reducer = (state, action) => {
    const reducer = reducerMap[action.reducer];
    if (reducer) {
        return reducer.call(null, state, action);
    } else {
        return state;
    }
};

export { Reducer, ReducerType, ReducerAction };