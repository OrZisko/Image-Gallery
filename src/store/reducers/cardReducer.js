const INIT_STATE = {
    cards: null,
}

export function cardReducer(state = INIT_STATE, action) {
    switch (action.type) {
        case 'SET_CARDS':
            return {
                ...state,
                cards: action.cards,
            };
        case 'ADD_CARD':
            return {
                ...state,
                cards: [action.card, ...state.cards]
            };
        case 'UPDATE_CARD':
            return {
                ...state,
                cards: state.cards.map(card => card.id === action.card.id ? action.card : card)
            }
        case 'REMOVE_CARD':
            return {
                ...state,
                cards: state.cards.filter(card => card.id !== action.cardId)
            }
        default:
            return state;
    }
}