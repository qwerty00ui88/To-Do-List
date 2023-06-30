import Tab from './components/Tab';
import Contents from './Pages/Contents';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Plus from './components/Plus';

function App() {
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
    <Div>
      <Plus list={list} handleSetList={handleSetList} />
      <Tab handleClicked={handleClicked} clicked={clicked}>
        <Contents clicked={clicked} list={list} handleSetList={handleSetList} />
      </Tab>
    </Div>
  );
}

export default App;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 20px;
  min-height: 100vh;
  min-width: 360px;
  box-sizing: border-box;
  background-image: url('https://images.unsplash.com/photo-1573004653136-a6be2574248d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80');
  background-size: 100% 100%;
`;
