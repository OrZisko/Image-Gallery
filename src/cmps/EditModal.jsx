import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { cardService } from '../services/cardService';


function EditModal({ cardToEdit, onCloseModal, onSaveCard, onRemoveCard }) {
    
    const { register, handleSubmit, watch, formState: {errors} } = useForm({
        defaultValues: {
            id: cardToEdit.id,
            title: cardToEdit.title,
            url: cardToEdit.url
        }
    })
    const imageUrl = watch('url')

    const [isDeleting, setIsDeleting] = useState(false)
    const [errMessage, setErrMessage] = useState('')
    
    const urlRegex = new RegExp(/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/)

    const onSubmitForm = (e) => {
        e.preventDefault()
        handleSubmit((card) => {
            const msg = cardService.checkIsExists(card)
            if (msg) setErrMessage(msg)
            else onSaveCard(card)
        })()
    }
    return (
        <div className='background-modal' onClick={onCloseModal}>
            <div className='edit-modal' onClick={(e) => { e.stopPropagation() }}>
                <button className='exit-btn' onClick={() => onCloseModal()}>X</button>
                {cardToEdit.id && <h4>Id: {cardToEdit.id}</h4>}
                {errMessage && <p className='errMsg'>{errMessage}</p>}
                <form className='card-edit-form' onSubmit={onSubmitForm}>
                    <input type="text" {...register('id')} hidden />
                    <label>Title:
                        <input type="text" {...register('title', {required: 'Title must be entered'})} />
                        {errors.title && <span className="errMsg">{errors.title.message}</span>}
                    </label>
                    <label>ImageUrl:
                        <input type="string" {...register('url', { validate: value => urlRegex.test(value) })} />
                        {!urlRegex.test(imageUrl) && <span className='errMsg'>Invalid URL adress</span>}
                    </label>
                    <div className='img-container'>
                        <img src={urlRegex.test(imageUrl) ? imageUrl : cardToEdit.url} />
                    </div>
                    <button className="save-btn">Save</button>
                </form>
                {cardToEdit.id && <div className='delete-container'>
                    <button onClick={() => setIsDeleting(true)} className='del-btn'>Delete Image</button>
                    {isDeleting && <p>Are you sure?
                        <span onClick={() => onRemoveCard(cardToEdit.id)}>Yes</span>/
                        <span onClick={() => setIsDeleting(false)}>No</span></p>}
                </div>}
            </div>
        </div>
    );
}

export default EditModal;