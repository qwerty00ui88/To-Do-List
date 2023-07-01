import Tab from '../components/Tab';
import Contents from '../components/Contents';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

function Main() {
  const [list, setList] = useState([]);
  const [clicked, setClicked] = useState('todo');

  const handleSetList = (list) => {
    setList(list);
  };

  const handleClicked = (status) => {
    setClicked(status);
  };

  useEffect(() => {
    handleClicked(JSON.parse(localStorage.getItem('view')) || 'todo');
    handleSetList(JSON.parse(localStorage.getItem('todoList')) || []);
  }, []);

  window.addEventListener('beforeunload', () => {
    localStorage.setItem('view', JSON.stringify(clicked));
    localStorage.setItem('todoList', JSON.stringify(list));
  });

  return (
    <MainContent>
      <Tab
        handleClicked={handleClicked}
        clicked={clicked}
        list={list}
        handleSetList={handleSetList}
      >
        <Contents clicked={clicked} list={list} handleSetList={handleSetList} />
      </Tab>
    </MainContent>
  );
}

export default Main;

const MainContent = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  min-height: 100vh;
  min-width: 360px;
  box-sizing: border-box;
  width: 80vw;
  height: 80vh;
  margin: auto;
  @media screen and (max-width: 768px) {
    width: 100vw;
  }
`;
