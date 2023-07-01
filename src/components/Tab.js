import styled from 'styled-components';

function Tab({ handleClicked, clicked, children }) {
  const tabMenu = [
    { id: 'todo', title: 'To Do' },
    { id: 'closed', title: 'Closed' },
  ];

  return (
    <>
      <Ul>
        {tabMenu.map((menu) => {
          return (
            <Li
              key={menu.id}
              id={menu.id}
              onClick={(e) => {
                handleClicked(e.target.id);
              }}
              isClicked={clicked === menu.id}
            >
              {menu.title}
            </Li>
          );
        })}
      </Ul>
      {children}
    </>
  );
}

export default Tab;

const Ul = styled.ul`
  display: flex;
  margin: 0 0 -5px 5px;
  padding: 0;
  font-size: 2rem;
  font-weight: 700;
  @media screen and (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Li = styled.li`
  text-align: center;
  list-style: none;
  min-width: 120px;
  width: 18%;
  border-radius: 5px 5px 0 0;
  cursor: pointer;
  color: ${(props) => {
    return props.isClicked ? '#f8f8ff' : '#333d4b';
  }};
  background-color: ${(props) => {
    return props.isClicked ? 'hsl(218.35deg 87.39% 56.47%)' : '#b3b9c1';
  }};
  height: ${(props) => {
    return props.isClicked ? '50px' : '40px';
  }};
  margin-top: ${(props) => {
    return props.isClicked ? '0' : '10px';
  }};
  @media screen and (max-width: 768px) {
    height: ${(props) => {
      return props.isClicked ? '40px' : '35px';
    }};
    margin-top: ${(props) => {
      return props.isClicked ? '0' : '5px';
    }};
  }
`;
