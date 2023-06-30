import styled from 'styled-components';

function Tab({ handleClicked, clicked, children }) {
  return (
    <>
      <Ul>
        <Li
          id='todo'
          onClick={(e) => {
            handleClicked(e.target.id);
          }}
          isClicked={'todo' === clicked}
        >
          To Do
        </Li>
        <Li
          id='closed'
          onClick={(e) => {
            handleClicked(e.target.id);
          }}
          isClicked={'closed' === clicked}
        >
          Closed
        </Li>
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
  font-size: xx-large;
  font-weight: 700;
`;

const Li = styled.li`
  text-align: center;
  list-style: none;
  min-width: 120px;
  width: 18%;
  color: #3a3f3f;
  border-radius: 5px 5px 0 0;
  cursor: pointer;
  background-color: ${(props) => {
    return props.isClicked ? '#e8e7e0' : 'gray';
  }};
  height: ${(props) => {
    return props.isClicked ? '50px' : '40px';
  }};
  margin-top: ${(props) => {
    return props.isClicked ? '0' : '10px';
  }};
`;
