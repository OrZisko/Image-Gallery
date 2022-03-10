import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ImagePreview from '../cmps/ImagePreview';
import Pagination from '../cmps/Pagination';
import { loadCards, saveCard, removeCard } from '../store/actions/cardActions';
import EditModal from '../cmps/EditModal';
import { cardService } from '../services/cardService';

export const Home = () => {
    const { cards } = useSelector(state => state);
    const dispatch = useDispatch()
    const [cardsToDisplay, setCardsToDisplay] = useState([])
    const [pageIndex, setPageIndex] = useState(0)
    const [cardToEdit, setCardToEdit] = useState(null)
    const pageSize = 12
    useEffect(() => {
        dispatch(loadCards())
    }, [])
    useEffect(() => {
        if (cards) {
            setCardsToDisplay([...cards].splice(pageIndex * pageSize, pageSize))
        }
    }, [cards, pageIndex])

    const onChangePage = idx => {
        setPageIndex(idx)
    }

    const onSelectCard = card => {
        setCardToEdit(card)
    }

    const onSaveCard = (card) => {
        dispatch(saveCard(card))
        setCardToEdit(null)
    }
    const onAddNewCard = () => {
        const newCard = cardService.getEmptyCard()
        onSelectCard(newCard)
    }
    const onRemoveCard = (cardId) => {
        dispatch(removeCard(cardId))
        setCardToEdit(null)
    }

    return (
        <div className='home'>
            {cardToEdit && <EditModal onRemoveCard={onRemoveCard} onSaveCard={onSaveCard} onCloseModal={() => setCardToEdit(null)} cardToEdit={cardToEdit}></EditModal>}
            {cards && <Pagination changePage={onChangePage} pagesSum={Math.floor(cards.length / pageSize)} pageIndex={pageIndex + 1} />}
            <button onClick={onAddNewCard} className="add-btn">Add New</button>
            <main className='gallery-container'>
                {cardsToDisplay && cardsToDisplay.map(card => <ImagePreview onSelectCard={onSelectCard} key={card.id} card={card} />)}
            </main>
            {cards && <Pagination changePage={onChangePage} pagesSum={Math.floor(cards.length / pageSize)} pageIndex={pageIndex + 1} />}
        </div>
    );
}
