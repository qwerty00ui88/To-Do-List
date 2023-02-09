import styled from 'styled-components';
import Modal from './Modal';

const Div = styled.div`
  padding: 2px;
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
    fetch(`http://localhost:3001/todos/${e.target.id}`, {
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
      <input type='checkbox'></input>
      <label onClick={openModalToEdit} id={todoInfo.id}>
        {todoInfo.text + todoInfo.dueDate}
      </label>
      <span id={todoInfo.id} onClick={deleteList}>
        ❌
      </span>
    </Div>
  );
}

export default List;
