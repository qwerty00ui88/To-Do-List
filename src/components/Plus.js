import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import Modal from './Modal';
import { useState } from 'react';
import { defaultData } from '../utils/defaultData';

function Plus({ list, handleSetList }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSetIsOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Button onClick={handleSetIsOpen}>
        <FontAwesomeIcon icon={faPlus} size='3x' />
      </Button>
      {isOpen ? (
        <Modal
          todo={defaultData(new Date())}
          status='add'
          list={list}
          handleSetList={handleSetList}
          handleSetIsOpen={handleSetIsOpen}
        />
      ) : null}
    </>
  );
}

export default Plus;

const Button = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: #e8e7e0;
  padding: 0 5px;
  border: 0;
  border-radius: 5px;
  width: 45px;
  height: 45px;
  margin-right: 5px;
  path {
    fill: #3a3f3f;
  }
  @media screen and (max-width: 480px) {
    width: 35px;
    height: 35px;
    background-color: transparent;
    svg {
      width: 20px;
    }
  }
`;
