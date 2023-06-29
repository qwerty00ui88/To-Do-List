import { useState } from 'react';
import styled from 'styled-components';
import useOutsideClick from '../utils/useOutsideClick';

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

const Modal = ({ todo, handleSetIsOpen, status, handleSetReRender }) => {
  const [todoValue, setTodoValue] = useState(todo);
  const outsideRef = useOutsideClick(handleSetIsOpen);

  const handleSetDueDate = (e) => {
    setTodoValue({ ...todoValue, dueDate: e.target.value });
  };

  const handleSetText = (e) => {
    setTodoValue({ ...todoValue, text: e.target.value });
  };

  const addList = () => {
    fetch(`${process.env.REACT_APP_URL}/todos/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todoValue),
    })
      .then((res) => {
        if (!res.ok) {
          throw Error('could not fetch the data for that resource');
        }
        return res.json();
      })
      .then(() => {
        handleSetReRender();
        handleSetIsOpen();
      })
      .catch((err) => {
        console.error('Error', err);
      });
  };

  const editValue = () => {
    fetch(`${process.env.REACT_APP_URL}/todos/${todoValue.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: todoValue.text,
        dueDate: todoValue.dueDate,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw Error('could not fetch the data for that resource');
        }
        return res.json();
      })
      .then(() => {
        handleSetReRender();
        handleSetIsOpen();
      })
      .catch((err) => {
        console.error('Error', err);
      });
  };

  const deleteList = () => {
    fetch(`${process.env.REACT_APP_URL}/todos/${todoValue.id}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (!res.ok) {
          throw Error('could not fetch the data for that resource');
        }
        return res.json();
      })
      .then((data) => {
        handleSetReRender();
        handleSetIsOpen();
      })
      .catch((err) => {
        console.error('Error', err);
      });
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
          <button onClick={deleteList}>Delete</button>
        ) : null}
        <button onClick={status === 'edit' ? editValue : addList}>
          {status === 'edit' ? 'Edit' : 'Add'}
        </button>
      </Buttons>
    </Div>
  );
};

export default Modal;
