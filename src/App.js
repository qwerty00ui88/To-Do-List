import Header from './Header';
import Contents from './Pages/Contents';
import React, { useState } from 'react';
import styled from 'styled-components';

const Div = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 20px;
  min-height: 100vh;
  min-width: 360px;
  box-sizing: border-box;
  /* background-image: url('https://images.unsplash.com/photo-1517685633466-403d6955aeab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80'); */
  background-image: url('https://images.unsplash.com/photo-1573004653136-a6be2574248d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80');
  background-size: 100% 100%;
`;

function App() {
  const [isToday, setIsToday] = useState(true);
  return (
    <Div>
      <Header isToday={isToday} setIsToday={setIsToday} />
      <Contents isToday={isToday} />
    </Div>
  );
}

export default App;
