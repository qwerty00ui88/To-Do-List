import List from '../components/List';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import Modal from '../components/Modal';

function Contents({ clicked, list, handleSetList }) {
  const [isOpen, setIsOpen] = useState(false);

  const today = new Date(
    new Date().getTime() - new Date().getTimezoneOffset() * 60000
  )
    .toISOString()
    .slice(0, 10);

  const showList = list.filter((el) =>
    clicked === 'todo' ? el.dueDate >= today : el.dueDate < today
  );
  const done = showList.filter((el) => el.isChecked);
  const notYet = showList.filter((el) => !el.isChecked);

  const handleSetIsOpen = () => {
    setIsOpen(!isOpen);
  };

  function drop(dropevent) {
    dropevent.preventDefault();
    let data = dropevent.dataTransfer.getData('storm-diagram-node');
    let targetedItem = dropevent.currentTarget;
    const copy = list.slice();
    const findIdx = copy.findIndex((el) => el.id === data);
    const deleted = copy.splice(findIdx, 1);
    handleSetList([
      ...copy,
      { ...deleted[0], isChecked: targetedItem.id !== 'div1' },
    ]);
  }

  function allowDrop(allowdropevent) {
    allowdropevent.preventDefault();
  }

  useEffect(() => {
    handleSetList(JSON.parse(localStorage.getItem('todoList')));
  }, []);

  window.addEventListener('beforeunload', () => {
    localStorage.setItem('todoList', JSON.stringify(list));
  });

  return (
    <>
      <Main id='div1' onDrop={drop} onDragOver={allowDrop}>
        {notYet.map((el, idx) => {
          return (
            <List
              id={el.id}
              key={idx}
              todoInfo={el}
              list={list}
              handleSetList={handleSetList}
            />
          );
        })}
      </Main>
      <Main id='div2' onDrop={drop} onDragOver={allowDrop}>
        {done.map((el, idx) => {
          return (
            <List
              id={el.id}
              key={idx}
              todoInfo={el}
              list={list}
              handleSetList={handleSetList}
            />
          );
        })}
      </Main>

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
          handleSetIsOpen={handleSetIsOpen}
          list={list}
          handleSetList={handleSetList}
        />
      ) : null}
    </>
  );
}

export default Contents;

const Main = styled.main`
  height: 42vh;
  overflow: auto;
  border: 2px solid lightgray;
  background-color: #c0c0c040;
  margin: 5px;
`;
