import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
const Div = styled.div`
  padding: 10px;
  margin: 5px 0;
  background-color: #f8f8ff85;
  display: flex;
`;

const Label = styled.label`
  flex: 1;
`;

const Icon = styled.div`
  svg {
    pointer-events: none;
    padding-left: 10px;
  }
`;

function List({
  todoInfo,
  setIsOpen,
  setIsEdit,
  setText,
  setCurrentList,
  reRender,
  setReRender,
}) {
  const deleteList = (e) => {
    fetch(`${process.env.REACT_APP_URL}/todos/${e.target.id}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (!res.ok) {
          throw Error('could not fetch the data for that resource');
        }
        return res.json();
      })
      .then((data) => {
        setReRender(!reRender);
      })
      .catch((err) => {
        console.error('Error', err);
      });
  };

  const openModalToEdit = (e) => {
    setIsOpen(true);
    setIsEdit(true);
    setText(e.target.textContent.slice(0, -10));
    setCurrentList(e.target.id);
  };

  return (
    <Div>
      <input type='checkbox' />
      <Label onClick={openModalToEdit} id={todoInfo.id}>
        {todoInfo.text}
      </Label>
      <div id={todoInfo.id}>{todoInfo.dueDate}</div>
      <Icon id={todoInfo.id} onClick={deleteList}>
        <FontAwesomeIcon icon={faXmark} />
      </Icon>
    </Div>
  );
}

export default List;
