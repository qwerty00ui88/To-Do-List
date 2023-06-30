import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import Modal from './Modal';
import { useState } from 'react';
import { todayDate } from '../utils/todayDate';
import { deleteList } from '../utils/deleteList';
function List({ id, todoInfo, list, handleSetList }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSetIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleCheck = () => {
    const copy = list.slice();
    const findIdx = copy.findIndex((el) => el.id === todoInfo.id);
    const deleted = copy.splice(findIdx, 1);
    handleSetList([...copy, { ...deleted[0], isChecked: !todoInfo.isChecked }]);
  };

  const dDay =
    (new Date(todayDate) - new Date(todoInfo.dueDate)) / (24 * 60 * 60 * 1000);

  function drag(dragevent) {
    dragevent.dataTransfer.setData('storm-diagram-node', dragevent.target.id);
  }

  return (
    <>
      <Div
        id={id}
        isChecked={todoInfo.isChecked}
        draggable={true}
        onDragStart={drag}
      >
        <HiddenCheckBox
          id={id}
          type='checkbox'
          checked={todoInfo.isChecked}
          onChange={handleCheck}
        />
        <CheckBox htmlFor={id} onClick={handleCheck}>
          <FontAwesomeIcon icon={faCheck} />
        </CheckBox>
        <ModalOpenDiv onClick={handleSetIsOpen}>
          <Text>{todoInfo.text}</Text>
          <DueDate>{todoInfo.dueDate}</DueDate>
          <DDay isChecked={todoInfo.isChecked}>{`D${
            dDay === 0 ? '-' : dDay > 0 ? '+' : ''
          }${dDay}`}</DDay>
        </ModalOpenDiv>
        <Icon
          onClick={() => {
            deleteList(list, todoInfo, handleSetList);
          }}
        >
          <FontAwesomeIcon icon={faXmark} />
        </Icon>
      </Div>
      {isOpen ? (
        <Modal
          todo={todoInfo}
          status='edit'
          list={list}
          handleSetList={handleSetList}
          handleSetIsOpen={handleSetIsOpen}
        />
      ) : null}
    </>
  );
}

export default List;

const Div = styled.div`
  font-weight: 600;
  padding: 10px;
  margin: 7px 7px;
  background-color: ${(props) => {
    return props.isChecked ? '#b2b2b2' : '#fae8d5';
  }};
  display: flex;
  width: inherit;
  border-radius: 5px;
`;

const HiddenCheckBox = styled.input`
  display: none;
  + label {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 15px;
    height: 15px;
    border: 1px solid #bcbcbc;
    margin-right: 10px;
    background-color: white;
    cursor: pointer;
    path {
      fill: transparent;
    }
  }

  :checked + label {
    path {
      fill: currentColor;
    }
  }
`;

const CheckBox = styled.label`
  svg {
    width: 13px;
    height: 13px;
  }
`;

const ModalOpenDiv = styled.div`
  flex: 1;
  display: flex;
`;

const Text = styled.span`
  flex: 1;
  word-break: break-all;
  margin-right: 10px;
  font-size: medium;
  cursor: pointer;
`;

const DueDate = styled.span`
  white-space: nowrap;
  display: flex;
  align-items: center;
  text-align: right;
  width: 120px;
  @media screen and (max-width: 480px) {
    display: none;
  }
`;

const DDay = styled.span`
  display: flex;
  align-items: center;
  text-align: left;
  width: 50px;
  margin-right: 30px;
  white-space: nowrap;
  color: ${(props) => {
    return props.isChecked ? 'black' : '#c01a1a';
  }};
`;

const Icon = styled.div`
  cursor: pointer;
`;
