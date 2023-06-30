import { useState } from 'react';
import styled from 'styled-components';
import useOutsideClick from '../utils/useOutsideClick';
import { deleteList } from '../utils/deleteList';
const Modal = ({ todo, status, list, handleSetList, handleSetIsOpen }) => {
  const [todoValue, setTodoValue] = useState(todo);
  const outsideRef = useOutsideClick(handleSetIsOpen);

  const handleSetDueDate = (e) => {
    setTodoValue({ ...todoValue, dueDate: e.target.value });
  };

  const handleSetText = (e) => {
    setTodoValue({ ...todoValue, text: e.target.value });
  };

  const addList = () => {
    handleSetList([...list, todoValue]);
    handleSetIsOpen();
  };

  const editValue = () => {
    const copy = list.slice();
    const newList = copy.map((el) => {
      if (el.id === todoValue.id) {
        el.text = todoValue.text;
        el.dueDate = todoValue.dueDate;
      }
      return el;
    });
    handleSetList(newList);
    handleSetIsOpen();
  };

  return (
    <Div className='modal' ref={outsideRef}>
      <Input
        id='dateInput'
        type='date'
        onChange={handleSetDueDate}
        value={todoValue.dueDate}
      />

      <Input type='text' value={todoValue.text} onChange={handleSetText} />
      <Buttons>
        {status === 'edit' ? (
          <button
            onClick={() => {
              deleteList(list, todoValue, handleSetList);
            }}
          >
            Delete
          </button>
        ) : null}
        <button onClick={status === 'edit' ? editValue : addList}>
          {status === 'edit' ? 'Edit' : 'Add'}
        </button>
      </Buttons>
    </Div>
  );
};

export default Modal;

const Div = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 160px;
  border-radius: 20px;
  box-shadow: 32px 38px 67px 8px rgb(15 3 34);
  background-color: #e8e7e0;
`;

const Input = styled.input`
  display: block;
  border: none;
  background-color: rgb(220, 220, 220);
  padding: 5px;
  margin-bottom: 3px;
`;

const Buttons = styled.div`
  > button {
    margin: 5px;
    width: 53px;
    height: 20px;
    border: 1px solid black;
    border-radius: 30px;
  }
`;
