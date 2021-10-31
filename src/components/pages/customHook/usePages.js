    
import React, { useEffect,useState } from 'react'


const usePages = async(Data, itemPerPage) => {

    const [pages, setPages] = useState();

    const getPages = () => {
        const lengthPages = Math.ceil(Data.length / itemPerPage);

        const Pages = Array.from({ length: lengthPages }, (_, index) => {
            const firstIndexOfPage = index * itemPerPage;
            const page = Data.slice(firstIndexOfPage, firstIndexOfPage + itemPerPage);
            return page
        });
        return Pages ;
    };
     
    useEffect(() => {
        const Pages = getPages()
        setPages(Pages);
    } ,[Data])

    return await Promise.resolve([pages])
};
    
export default usePages