import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import Modal from './Modal';
import { useState } from 'react';

const Div = styled.div`
  padding: 10px;
  margin: 7px 7px;
  background-color: ${(props) => {
    return props.isChecked ? '#878787d1' : '#f8f8ff';
  }};
  display: flex;
  width: inherit;
  border-radius: 5px;
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
`;

const DueDate = styled.div`
  white-space: nowrap;
  display: flex;
  align-items: center;
  text-align: right;
  width: 120px;
`;

const DDay = styled.div`
  display: flex;
  align-items: center;
  text-align: left;
  width: 50px;
  margin-right: 30px;
  white-space: nowrap;
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
  const today = new Date(
    new Date().getTime() - new Date().getTimezoneOffset() * 60000
  )
    .toISOString()
    .slice(0, 10);
  const dDay =
    (new Date(today) - new Date(todoInfo.dueDate)) / (24 * 60 * 60 * 1000);

  return (
    <>
      <Div isChecked={todoInfo.isChecked}>
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
          <DueDate>{todoInfo.dueDate}</DueDate>
          <DDay>{`D${dDay === 0 ? '-' : dDay > 0 ? '+' : ''}${dDay}`}</DDay>
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
