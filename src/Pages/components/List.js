import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import Modal from './Modal';
import { useState } from 'react';

const Div = styled.div`
  padding: 10px;
  margin: 5px 0;
  background-color: #f8f8ff85;
  display: flex;
  width: inherit;
`;

const ModalClickDiv = styled.div`
  flex: 1;
  display: flex;
  input {
    margin-right: 10px;
    cursor: pointer;
  }
  label {
    flex: 1;
    word-break: break-all;
    margin-right: 10px;
    cursor: pointer;
  }
  > div {
    white-space: nowrap;
    margin-right: 10px;
    display: flex;
    align-items: center;
  }
`;

const Icon = styled.div`
  cursor: pointer;
`;

function List({ todoInfo, handleSetReRender }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSetIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const deleteList = (e) => {
    e.stopPropagation();
    fetch(`${process.env.REACT_APP_URL}/todos/${todoInfo.id}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (!res.ok) {
          throw Error('could not fetch the data for that resource');
        }
        return res.json();
      })
      .then(() => {
        handleSetReRender();
        isOpen && handleSetIsOpen();
      })
      .catch((err) => {
        console.error('Error', err);
      });
  };

  const handleCheck = () => {
    fetch(`${process.env.REACT_APP_URL}/todos/${todoInfo.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ isChecked: !todoInfo.isChecked }),
    })
      .then((res) => {
        if (!res.ok) {
          throw Error('could not fetch the data for that resource');
        }
        return res.json();
      })
      .then(() => {
        handleSetReRender();
      })
      .catch((err) => {
        console.error('Error', err);
      });
  };

  return (
    <>
      <Div>
        <input
          type='checkbox'
          checked={todoInfo.isChecked}
          onChange={handleCheck}
        />
        <ModalClickDiv
          onClick={() => {
            handleSetIsOpen();
          }}
        >
          <label>{todoInfo.text}</label>
          <div>{todoInfo.dueDate}</div>
        </ModalClickDiv>
        <Icon onClick={deleteList}>
          <FontAwesomeIcon icon={faXmark} />
        </Icon>
      </Div>
      {isOpen ? (
        <Modal
          todo={todoInfo}
          handleSetIsOpen={handleSetIsOpen}
          status='edit'
          handleSetReRender={handleSetReRender}
        />
      ) : null}
    </>
  );
}

export default List;
