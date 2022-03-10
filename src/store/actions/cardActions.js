import { cardService } from "../../services/cardService"

export function loadCards() {
    return async (dispatch) => {
        const cards = await cardService.query()
        dispatch({ type: 'SET_CARDS', cards })
    }
}
export function saveCard(card) {
    if (card.id) {
        cardService.updateCard(card)
        return async (dispatch) => {
            dispatch({ type: 'UPDATE_CARD', card })
        }
    } else {
        card.id = cardService.makeId()
        cardService.addCard(card)
        return async (dispatch) => {
            dispatch({ type: 'ADD_CARD', card })
        }
    }

}
export function removeCard(cardId) {
    cardService.removeCard()
    return async (dispatch) => {
        dispatch({type: 'REMOVE_CARD', cardId})
    }
}
