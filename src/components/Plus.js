import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import Modal from './Modal';
import { useState } from 'react';

function Plus({ list, handleSetList }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSetIsOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Button
        onClick={() => {
          handleSetIsOpen();
        }}
      >
        <FontAwesomeIcon icon={faPlus} size='3x' />
      </Button>
      {isOpen ? (
        <Modal
          todo={{
            id: new Date().toISOString(),
            text: '',
            dueDate: `${new Date().getFullYear()}-${String(
              new Date().getMonth() + 1
            ).padStart(2, '0')}-${String(new Date().getDate()).padStart(
              2,
              '0'
            )}`,
            isChecked: false,
          }}
          status='add'
          handleSetList={handleSetList}
          handleSetIsOpen={handleSetIsOpen}
          list={list}
        />
      ) : null}
    </>
  );
}

export default Plus;

const Button = styled.button`
  position: absolute;
  top: 19px;
  right: 20px;
  background-color: #e8e7e0;
  padding: 0 5px;
  border: 0;
  border-radius: 5px;
  width: 45px;
  height: 45px;
  margin-right: 5px;
  svg > path {
    fill: #3a3f3f;
  }
`;
