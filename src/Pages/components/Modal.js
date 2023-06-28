//자식 컴포넌트 태그의 ref를 부모 컴포넌트로 가져오기
//1.부모 컴포넌트에서 const 변수 = useRef(null)
//2.부모 컴포넌트 return 안의 해당 자식 컴포넌트 태그에 ref={변수}
//3.자식 컴포넌트에 import { forwardRef } from 'react';
//3.자식 컴포넌트 함수의 인자로 'props, ref' 내려줌, 구조분해할당으로 다른 인자를 받고 있다면 '{다른 인자}, ref'로 넣어 줌
//4.자식 컴포넌트 내부에서 가져오고 싶은 html 태그에 ref={ref}
//5. export default forwardRef(자식 컴포넌트 이름);
//6.부모 컴포넌트에서 변수.current로 자식 컴포넌트 내부의 html ref 가져오기 가능

//중괄호 있으면 return 꼭 쓰기

import { forwardRef } from 'react';
import styled from 'styled-components';

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
  box-shadow: 42px 38px 67px 8px rgba(168, 168, 168, 0.65);
  background-color: #d0e7e4b0;
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
    width: 50px;
    height: 20px;
    border: 1px solid black;
    border-radius: 30px;
  }
`;

const Modal = (
  {
    text,
    setText,
    dueDate,
    setDueDate,
    isOpen,
    setIsOpen,
    isEdit,
    setIsEdit,
    currentList,
    reRender,
    setReRender,
  },
  ref
) => {
  const handleSetDueDate = (e) => {
    setDueDate(e.target.value);
  };

  const handleSetText = (e) => {
    setText(e.target.value);
  };

  const addList = () => {
    let newList = {
      id: new Date().toISOString(),
      text,
      dueDate,
    };

    fetch(`${process.env.REACT_APP_URL}/todos/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newList),
    })
      .then((res) => {
        if (!res.ok) {
          throw Error('could not fetch the data for that resource');
        }
        return res.json();
      })
      .then((data) => {
        setReRender(!reRender);
      })
      .catch((err) => {
        console.error('Error', err);
      });

    setIsOpen(!isOpen);
    setIsEdit(false);
    setText('');
  };

  const editText = () => {
    fetch(`${process.env.REACT_APP_URL}/todos/${currentList}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: text }),
    })
      .then((res) => {
        if (!res.ok) {
          throw Error('could not fetch the data for that resource');
        }
        return res.json();
      })
      .then((data) => {
        setReRender(!reRender);
      })
      .catch((err) => {
        console.error('Error', err);
      });

    setIsOpen(!isOpen);
    setIsEdit(false);
    setText('');
  };

  const deleteList = () => {
    fetch(`${process.env.REACT_APP_URL}/todos/${currentList}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (!res.ok) {
          throw Error('could not fetch the data for that resource');
        }
        return res.json();
      })
      .then((data) => {
        setReRender(!reRender);
      })
      .catch((err) => {
        console.error('Error', err);
      });

    setIsOpen(false);
    setIsEdit(false);
    setText('');
  };
  return (
    <Div ref={ref} className='modal'>
      {isEdit ? null : <Input type='date' onChange={handleSetDueDate} />}
      <Input type='text' value={text} onChange={handleSetText} />
      <Buttons>
        {isEdit ? <button onClick={deleteList}>Delete</button> : null}
        <button onClick={isEdit ? editText : addList}>
          {isEdit ? 'Edit' : 'Add'}
        </button>
      </Buttons>
    </Div>
  );
};

export default forwardRef(Modal);
