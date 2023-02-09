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
  box-sizing: border-box;
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
