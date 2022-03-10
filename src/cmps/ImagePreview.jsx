import React from 'react';

function ImagePreview({ card, onSelectCard }) {

    return (
        <article onClick={() => onSelectCard(card)}>
            <img src={card.url} />
        </article>
    );
}

export default ImagePreview;
