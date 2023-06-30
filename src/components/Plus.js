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
  background-color: transparent;
  padding: 0 5px;
  border: 0;
  border-radius: 5px;
  width: 45px;
  height: 45px;
  margin-right: 5px;
  cursor: pointer;
  path {
    fill: #3a3f3f;
  }
  :hover {
    path {
      fill: hsl(5.66deg 69.43% 55.1%);
    }
  }
  @media screen and (max-width: 768px) {
    width: 40px;
    height: 40px;
    svg {
      width: 25px;
    }
  }
  @media screen and (max-width: 480px) {
    width: 35px;
    height: 35px;
    svg {
      width: 23px;
    }
  }
`;
