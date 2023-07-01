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
      <input
        id='dateInput'
        type='date'
        onChange={handleSetDueDate}
        value={todoValue.dueDate}
      />

      <textarea
        id='textInput'
        type='text'
        value={todoValue.text}
        onChange={handleSetText}
      />
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
  width: 450px;
  height: 300px;
  border-radius: 10px;
  box-shadow: 5px 5px 10px 0px #989898;
  background-color: #f8f8f8;

  textarea {
    height: 100px;
  }

  input,
  textarea {
    display: block;
    border: none;
    background-color: rgb(220, 220, 220);
    padding: 5px;
    margin-bottom: 3px;
    width: 250px;
    :focus {
      outline: none;
      border: 1px solid #abcdf8;
      box-shadow: 0px 0px 3px 2px #d0e4fd;
    }
  }

  @media screen and (max-width: 480px) {
    width: 300px;
    height: 160px;
    input,
    textarea {
      height: 15px;
      width: 150px;
    }
  }
`;

const Buttons = styled.div`
  > button {
    padding: 0;
    margin: 5px;
    width: 70px;
    height: 25px;
    border: 1px solid #b2b2b2;
    border-radius: 30px;
    :hover {
      background-color: hsl(218.35deg 87.39% 56.47%);
      color: #fdfdfd;
    }
    @media screen and (max-width: 480px) {
      width: 53px;
      height: 20px;
    }
  }
`;
