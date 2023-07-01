import styled from 'styled-components';
import Plus from './Plus';
function Tab({ handleClicked, clicked, list, handleSetList, children }) {
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
        <ButtonLi>
          <Plus list={list} handleSetList={handleSetList} />
        </ButtonLi>
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
  li {
    list-style: none;
  }
`;

const Li = styled.li`
  text-align: center;
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

const ButtonLi = styled.li`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`;
