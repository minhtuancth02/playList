import React from 'react'

const CardItem = ({ src, label, text, setIsModal , setModalContent }) => {
    
    const handleEvent = () => {
        setIsModal(prev => !prev);
        setModalContent({
            img: src,
            text: text,
            label: label
        });
    };

    return (
        <>
            <li
                className='cards__item'
                onClick={handleEvent}
            >
                <div className='cards__item__link'>
                    <figure className='cards__item__pic-wrap' data-category={label}>
                        <img
                            loading='lazy'
                            className='cards__item__img'
                            src={src}
                            alt='Travel Image'
                        />
                    </figure>
                    <div className='cards__item__info'>
                        <h5 className='cards__item__text'>{text}</h5>
                    </div>
                </div>
            </li>
        </>
    )
};

export default CardItem
