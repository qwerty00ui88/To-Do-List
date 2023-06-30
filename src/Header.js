import styled from 'styled-components';
const H1 = styled.h1`
  display: block;
  margin: 0 0 18px;
  color: #f8f8ff;
  margin-left: 5px;
  cursor: pointer;
`;
function Header({ isToday, setIsToday }) {
  const handleSetIsToday = () => {
    setIsToday(!isToday);
  };
  return <H1 onClick={handleSetIsToday}>{isToday ? 'To Do' : 'Close'}</H1>;
}

export default Header;
