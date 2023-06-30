import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import Modal from './Modal';
import { useState } from 'react';

function List({ id, todoInfo, list, handleSetList }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSetIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const deleteList = (e) => {
    e.stopPropagation();
    const copy = list.slice();
    const findIdx = copy.findIndex((el) => el.id === todoInfo.id);
    copy.splice(findIdx, 1);
    handleSetList(copy);
    isOpen && handleSetIsOpen();
  };

  const handleCheck = () => {
    const copy = list.slice();
    const findIdx = copy.findIndex((el) => el.id === todoInfo.id);
    const deleted = copy.splice(findIdx, 1);
    handleSetList([...copy, { ...deleted[0], isChecked: !todoInfo.isChecked }]);
  };

  const today = new Date(
    new Date().getTime() - new Date().getTimezoneOffset() * 60000
  )
    .toISOString()
    .slice(0, 10);
  const dDay =
    (new Date(today) - new Date(todoInfo.dueDate)) / (24 * 60 * 60 * 1000);

  function drag(dragevent) {
    dragevent.dataTransfer.setData('storm-diagram-node', dragevent.target.id);
  }

  return (
    <div>
      <Div
        id={id}
        isChecked={todoInfo.isChecked}
        draggable={true}
        onDragStart={drag}
      >
        <input
          id={id}
          type='checkbox'
          checked={todoInfo.isChecked}
          onChange={handleCheck}
        />
        <label htmlFor={id} onClick={handleCheck}>
          <FontAwesomeIcon icon={faCheck} />
        </label>
        <ModalClickDiv onClick={handleSetIsOpen}>
          <label htmlFor={id}>{todoInfo.text}</label>
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
          handleSetList={handleSetList}
          handleSetIsOpen={handleSetIsOpen}
          status='edit'
          list={list}
        />
      ) : null}
    </div>
  );
}

export default List;

const Div = styled.div`
  font-weight: 600;
  padding: 10px;
  margin: 7px 7px;
  background-color: ${(props) => {
    return props.isChecked ? '#878787d1' : '#f8f8ff';
  }};
  display: flex;
  width: inherit;
  border-radius: 5px;
  > input {
    display: none;
  }
  > input + label {
    display: inline-block;
    width: 15px;
    height: 15px;
    border: 1px solid #bcbcbc;
    margin-right: 10px;
    cursor: pointer;
  }
  > input:checked + label {
    background-color: #666666;
    svg {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 13px;
      height: 13px;
      margin-left: 1px;
      path {
        fill: #ffffff;
      }
    }
  }
`;

const ModalClickDiv = styled.div`
  flex: 1;
  display: flex;
  label {
    flex: 1;
    word-break: break-all;
    margin-right: 10px;
    font-size: medium;
    cursor: pointer;
  }
`;

const DueDate = styled.div`
  white-space: nowrap;
  display: flex;
  align-items: center;
  text-align: right;
  width: 120px;
  @media screen and (max-width: 480px) {
    display: none;
  }
`;

const DDay = styled.div`
  display: flex;
  align-items: center;
  text-align: left;
  width: 50px;
  margin-right: 30px;
  white-space: nowrap;
  color: #c01a1a;
`;

const Icon = styled.div`
  cursor: pointer;
`;
