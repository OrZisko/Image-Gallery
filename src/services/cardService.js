export const cardService = {
    query,
    getEmptyCard,
    makeId,
    addCard,
    updateCard,
    removeCard,
    checkIsExists
}

var gCards

async function query() {
    gCards =await _loadCards()
    return gCards
}

function getEmptyCard() {
    return {
        title: '',
        url: ''
    }
}
function addCard(card) {
    gCards.shift(card)
}
function updateCard(editedCard) {
    gCards = gCards.map(card => card.id === editedCard.id ? editedCard : card)
}
function removeCard(cardId) {
    const idx = gCards.findIndex(card => card.id === cardId)
    gCards.splice(idx, 1)
}

function checkIsExists(cardToCheck) {
    const isTitleExists = gCards.find(card =>cardToCheck.id !== card.id && card.title === cardToCheck.title)
    if (isTitleExists) {
        return 'Title already exists'
    } 
    const isUrlExists = gCards.find(card =>cardToCheck.id !== card.id && card.url === cardToCheck.url)
    if (isUrlExists) {
        return 'URL already exists'
    } 
    return false
}

function makeId(length = 5) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

async function _loadCards() {
    const data = await fetch('https://jsonplaceholder.typicode.com/photos')
    const cards = await data.json()
    return cards.map(card => ({ title: card.title, url: card.url, id: card.id }))
}

