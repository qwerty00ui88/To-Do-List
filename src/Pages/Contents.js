import List from '../components/List';
import Plus from '../components/Plus';
import styled, { css } from 'styled-components';
import { useState, useEffect } from 'react';
import Modal from '../components/Modal';

const Main = styled.main`
  height: 42vh;
  overflow: auto;
  border: 2px solid lightgray;
  background-color: #c0c0c040;
  margin: 5px;

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
  const [reRender, setReRender] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const today = new Date(
    new Date().getTime() - new Date().getTimezoneOffset() * 60000
  )
    .toISOString()
    .slice(0, 10);

  const todayList = list.filter((el) => {
    return el.dueDate >= today;
  });

  const afterList = list.filter((el) => {
    return el.dueDate < today;
  });

  const showList = isToday ? todayList : afterList;
  const done = showList.filter((el) => {
    return el.isChecked;
  });
  const notYet = showList.filter((el) => {
    return !el.isChecked;
  });
  const handleSetIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleSetReRender = () => {
    setReRender(!reRender);
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/todos`)
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

  return (
    <>
      <Main isEmpty={!showList.length}>
        {notYet.map((el, idx) => {
          return (
            <List
              key={idx}
              todoInfo={el}
              handleSetReRender={handleSetReRender}
              isOpen={isOpen}
              handleSetIsOpen={handleSetIsOpen}
            />
          );
        })}
      </Main>
      <Main isEmpty={!showList.length}>
        {done.map((el, idx) => {
          return (
            <List
              key={idx}
              todoInfo={el}
              handleSetReRender={handleSetReRender}
              isOpen={isOpen}
              handleSetIsOpen={handleSetIsOpen}
            />
          );
        })}
      </Main>
      <Plus handleSetReRender={handleSetReRender} isCenter={!list.length} />
      {isOpen ? (
        <Modal
          todo={{
            id: new Date().toISOString(),
            text: '',
            dueDate: `${new Date().getFullYear()}-${String(
              new Date().getMonth() + 1
            ).padStart(2, '0')}-${String(new Date().getDate()).padStart(
              2,
              '0'
            )}`,
            isChecked: false,
          }}
          status='add'
          handleSetReRender={handleSetReRender}
          handleSetIsOpen={handleSetIsOpen}
        />
      ) : null}
    </>
  );
}

export default Contents;
