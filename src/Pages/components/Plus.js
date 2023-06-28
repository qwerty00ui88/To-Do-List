import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import Modal from './Modal';
import { useState } from 'react';

const Div = styled.div`
  position: absolute;
  bottom: ${(props) => {
    return props.isCenter ? '50%' : '20px';
  }};
  right: ${(props) => {
    return props.isCenter ? '50%' : '20px';
  }};
  transform: ${(props) => {
    return props.isCenter && 'translate(50%, 50%)';
  }};
  svg > path {
    fill: ${(props) => {
      return props.isCenter ? '#e8e7e0' : '#235167';
    }};
  }
`;

function Plus({ handleSetReRender, isCenter }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSetIsOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Div
        onClick={() => {
          handleSetIsOpen();
        }}
        isCenter={isCenter}
      >
        <FontAwesomeIcon icon={faPlus} size='3x' />
      </Div>
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
          handleSetIsOpen={handleSetIsOpen}
          handleSetReRender={handleSetReRender}
        />
      ) : null}
    </>
  );
}

export default Plus;
