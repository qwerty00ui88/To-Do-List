import List from './components/List';
import Modal from './components/Modal';
import Plus from './components/Plus';
import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import styled, { css } from 'styled-components';
import { useState, useEffect } from 'react';

const Div = styled.div`
  height: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex-grow: 1;
  height: 100%;
  ${(props) => {
    return (
      props.isEmpty &&
      css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      `
    );
  }};
`;

function Contents({ isToday }) {
  const [list, setList] = useState([]);
  const [text, setText] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentList, setCurrentList] = useState({});
  const [reRender, setReRender] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3001/todos')
      .then((res) => {
        if (!res.ok) {
          throw Error('could not fetch the data for that resource');
        }
        return res.json();
      })
      .then((data) => {
        setList(data);
      });
  }, [reRender]);

  const modalRef = useRef(null);

  const handleSetIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleModalClose = (e) => {
    if (isOpen && modalRef.current !== e.target) {
      setIsOpen(!isOpen);
      setIsEdit(false);
      setText('');
    }
  };

  const today = new Date(
    new Date().getTime() - new Date().getTimezoneOffset() * 60000
  )
    .toISOString()
    .slice(0, 10);

  const todayList = list.filter((el) => {
    return el.dueDate === today;
  });

  const afterList = list.filter((el) => {
    return el.dueDate !== today;
  });

  const showList = isToday ? todayList : afterList;

  return (
    <Div>
      {!showList.length ? (
        <Main isEmpty={true} onClick={handleSetIsOpen}>
          <FontAwesomeIcon icon={faPlus} size='3x' />
        </Main>
      ) : (
        <Main isEmpty={false} onClick={handleModalClose}>
          {showList.map((el, idx) => {
            return (
              <List
                key={idx}
                todoInfo={el}
                setIsOpen={setIsOpen}
                setIsEdit={setIsEdit}
                setText={setText}
                setCurrentList={setCurrentList}
                reRender={reRender}
                setReRender={setReRender}
              />
            );
          })}
          <Plus
            showList={showList}
            handleSetIsOpen={handleSetIsOpen}
            isToday={isToday}
          />
        </Main>
      )}
      {isOpen ? (
        <Modal
          ref={modalRef}
          text={text}
          setText={setText}
          dueDate={dueDate}
          setDueDate={setDueDate}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          currentList={currentList}
          reRender={reRender}
          setReRender={setReRender}
        />
      ) : null}
    </Div>
  );
}

export default Contents;
