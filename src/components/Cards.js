import React, { useEffect, useState, Suspense } from 'react'
import '../components/Cards.css'
import Modal from '../Modal'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { MdClose } from 'react-icons/md'
import { useSpring, animated } from 'react-spring';

import { useAuth } from 'F:/React-Random/travel-web/src/contexts/AuthContexts.js'
import data from "../data/static.json";
const Page = React.lazy(() => import("./Page"));


const ModalWrapper = styled.div`
  width: 800px;
  height: 500px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: relative;
  z-index: 10;
  border-radius: 10px;
`;

const ModalImg = styled.img`
  width: 100%;
  height: 500px;
  border-radius: 10px 0 0 10px;
  background: #000;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 2;
  color: #141414;
  p {
    margin-bottom: 1.3rem;
    text-align: center;
    color: gray;
    max-width: 88%;
  }
  button {
    padding: 10px 24px;
    background: linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%);
    color: #fff;
    border: none;
    cursor: pointer;
    box-shadow: 0 2px 5px 2px rgba(255, 105, 135, .3);
    font-style: oblique;
    border-radius: 6px;
  }
`;

const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  color: linear-gradient( #FE6B8B 30%, #FF8E53 90%);
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 1000;
`;


const Cards = () => {
    const dataMemo = React.useMemo(() => data, [])
    const { currentUser } = useAuth();
    const [isModal, setIsModal] = useState(false);
    const [modalContent, setModalContent] = useState({
        img: null, text: '', label: ''
    });

    const animation = useSpring({
        config: {
            duration: 200
        },
        opacity: isModal ? 1 : 0,
        transform: isModal ? `translateY(0%)` : `translateY(-100%)`
    });
  
    // Props modal collection 
    const PropsModal = { isModal, setIsModal, setModalContent };

  return (
    <div className="cards">
      <Modal {...PropsModal}>
        <animated.div style={animation}>
          <ModalWrapper showModal={isModal}>
            <ModalImg src={modalContent.img} />
            <ModalContent>
              {currentUser ? (
                <p>{`"${modalContent.text}"`}</p>
              ) : (
                <>
                  <h1>Are you ready?</h1>
                  <p>Get exclusive access to our next launch.</p>
                  <Link to="/login">
                    <button>Join Now</button>
                  </Link>
                </>
              )}
            </ModalContent>
            <CloseModalButton
              aria-label="Close modal"
              onClick={() => setIsModal((prev) => !prev)}
            />
          </ModalWrapper>
        </animated.div>
      </Modal>

      <h1>
        Check Out These EPIC Destinations{" "}
        <i className="fas fa-map-marked-alt" style={{ color: "#2a89d1ab" }} />
      </h1>
      <DisplayItems
        data={ dataMemo }
        render={(data) =>
          data[0] ? (
            <List {...{ PropsModal }} data={data} />
          ) : (
            <h1>Check your Data!!!</h1>
          )
        }
      />
    </div>
  );
}

// items filter by Tag select
const DisplayItems = ({ render , data }) => {
  const categories = ["All", ...new Set(data.map((item) => item.label))];
  const [select, setSelect] = useState("");
  const [list, setList] = useState(filterItem(data, select));

  function filterItem(array , select) {
    if (select === "All") { return array }
    else {
      return array.filter((item) => item["label"].includes(select))
    }
  };
  useEffect(() => {
    setList(filterItem(data, select))
  } , [data ,select])

  return (
    <>
      <div className="tagFilter">
        {data.length > 0 && categories.map((label) => (
          <button onClick={(e) => setSelect(e.target.value)} value={label}>
            {label}
          </button>
        ))}
      </div>
      { render(list) }
    </>
  );
};;


const List = ({ data, PropsModal }) => {
  //data === list
  const [itemPerPage] = useState(6);
  const initialPages = React.useCallback(total_Pages(data, itemPerPage),[data.length, itemPerPage]);

  const [pages, setPages] = useState(initialPages);
  const [currentPage, setCurrentPage] = useState({
    number: 1,
    value: [...pages[0]],
  });

  // pagination
  const [range] = useState(3);
  const [begin, setBegin] = useState(0);
  const [end, setEnd] = useState(3);

  function total_Pages(Data, itemPerPage) {
      const lengthPages = Math.ceil(Data.length / itemPerPage);
      const Pages = Array.from({ length: lengthPages }, (_, index) => {
        const firstIndexOfPage = index * itemPerPage;
        const page = Data.slice(
          firstIndexOfPage,
          firstIndexOfPage + itemPerPage
        );
        return page;
      });
    
      return Pages
  };

  const getPage = (number) => {
    (number <= pages.length && number > 0 ) &&
      setCurrentPage({
        number: number,
        value: pages[number - 1],
      });
  };
  const nextEvent = (number) => {
    getPage(number + 1);
    if (number + 1 > end) {
      setEnd(end + range);
      setBegin(begin + range);
    }
  };
  const prevEvent = function () {
    getPage(currentPage.number - 1);
    if ((currentPage.number - 1) % range === 0) {
      setEnd(end - range);
      setBegin(begin - range);
    }
  };

  let dotNext,
 dotPrev = null;
  if (end - pages.length < 0) {
    dotNext = <button className="loadmore">&hellip;</button>;
  }
  if (begin > 0) {
    dotPrev = <button className="loadmore">&hellip;</button>;
  }

  // page navbar
  const PageNumbers = pages.map((_, index) => {
    if (index >= begin && index <= end - 1) {
      return (
        <li>
          <button
            className={currentPage.number === index + 1 ? "active" : null}
            key={index + 1}
            onClick={() => getPage(index + 1)}
          >
            {index + 1}
          </button>
        </li>
      );
    } else {
      return undefined;
    }
  });

  useEffect(() => {
    setPages(initialPages);
  }, [initialPages]);

  useEffect(() => {
    setCurrentPage({
      number: 1,
      value: [...pages[0]],
    });
    setEnd(3);
    setBegin(0);
  }, [pages]);

  return (
    <div>
      <ul className="pageNumbers">
        {PageNumbers.length >= range && currentPage.number > 1 && (
          <li>
            <button
              onClick={prevEvent}
              disabled={currentPage.value === pages[0] ? true : false}
            >
              Prev
            </button>
          </li>
        )}

        {dotPrev}
        {PageNumbers}
        {dotNext}

        {currentPage.number < PageNumbers.length && (
          <li>
            <button
              onClick={() => nextEvent(currentPage.number)}
              disabled={
                currentPage.value === pages[pages.length - 1] ? true : false
              }
            >
              Next
            </button>
          </li>
        )}
      </ul>
      <Suspense
        fallback={
          <div
            style={{ fontSize: "1.6rem", textAlign: "center", margin: "7rem" }}
          >
            Loading Page...
          </div>
        }
      >
        <Page currentPage={currentPage} PropsModal={{ ...PropsModal }} />
      </Suspense>
    </div>
  );
};;

export default Cards