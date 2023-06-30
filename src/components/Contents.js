import List from './List';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import Modal from './Modal';
import { todayDate } from '../utils/todayDate';
import { defaultData } from '../utils/defaultData';

function Contents({ clicked, list, handleSetList }) {
  const [isOpen, setIsOpen] = useState(false);
  const showList = list.filter((el) =>
    clicked === 'todo' ? el.dueDate >= todayDate : el.dueDate < todayDate
  );

  const section = showList.reduce(
    (acc, cur) => {
      if (!cur.isChecked) {
        acc[0].data.push(cur);
      } else {
        acc[1].data.push(cur);
      }
      return acc;
    },
    [
      { id: 'section1', data: [] },
      { id: 'section2', data: [] },
    ]
  );

  const handleSetIsOpen = () => {
    setIsOpen(!isOpen);
  };

  function drop(dropevent) {
    dropevent.preventDefault();
    const targetedItem = dropevent.currentTarget;
    const dataId = dropevent.dataTransfer.getData('storm-diagram-node');
    const copy = list.slice();
    const findIdx = copy.findIndex((el) => el.id === dataId);
    const deleted = copy.splice(findIdx, 1);
    handleSetList([
      ...copy,
      { ...deleted[0], isChecked: targetedItem.id !== 'section1' },
    ]);
  }

  function allowDrop(allowdropevent) {
    allowdropevent.preventDefault();
  }

  useEffect(() => {
    handleSetList(JSON.parse(localStorage.getItem('todoList')));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  window.addEventListener('beforeunload', () => {
    localStorage.setItem('todoList', JSON.stringify(list));
  });

  return (
    <>
      {section.map((sectionItem) => {
        return (
          <Section
            key={sectionItem.id}
            id={sectionItem.id}
            onDrop={drop}
            onDragOver={allowDrop}
          >
            {sectionItem.data.map((listItem, idx) => {
              return (
                <List
                  key={listItem.id}
                  id={listItem.id}
                  todoInfo={listItem}
                  list={list}
                  handleSetList={handleSetList}
                />
              );
            })}
          </Section>
        );
      })}
      {isOpen ? (
        <Modal
          todo={defaultData(new Date())}
          status='add'
          list={list}
          handleSetList={handleSetList}
          handleSetIsOpen={handleSetIsOpen}
        />
      ) : null}
    </>
  );
}

export default Contents;

const Section = styled.section`
  height: 42vh;
  overflow: auto;
  border: 1px solid lightgray;
  background-color: #fdfdfd;
  margin: 5px;
`;
