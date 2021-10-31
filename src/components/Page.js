import React, { useEffect, useState } from 'react'
import CardItem from './CardItem'

// display current Page 
const Page = ({ currentPage, PropsModal }) => {
    const [Page, setPage] = useState([]);

    useEffect(() => {
        const PageLoading = new Promise((resolve) => {
            setTimeout(() => {
                resolve(currentPage.value)
            }, 100);
        });
        
        PageLoading.then(result => setPage(result))
    }, [currentPage]);


    return (
        <div className="cards__container" defer>
          {Page.map(({ img, text, label }) => (
            <div className="cards__wrapper">
              <ul className="cards__items">
                <CardItem
                  src={img} text={text} label={label}
                  {...PropsModal}
                />
              </ul>
            </div>
          ))}
        </div>
    );
};
export default Page