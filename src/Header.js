import styled from 'styled-components';
const H1 = styled.h1`
  display: block;
  margin: 0 0 18px;
`;
function Header({ isToday, setIsToday }) {
  const handleSetIsToday = () => {
    setIsToday(!isToday);
  };
  return <H1 onClick={handleSetIsToday}>{isToday ? 'Today' : 'After'}</H1>;
}

export default Header;
