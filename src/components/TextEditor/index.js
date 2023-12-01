import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const Inner = styled.div`
padding: 4px;
min-width: 20px; 
box-sizing: content-box;

input {
  border: 0;
  font-size: 14px;
  margin: 0 0;
  min-height: 30px;
  outline: 0;
  width: 100%; 
  font-weight: bold
  text-align: center;
  padding: 0 5px ;
}
`;

const Button = styled.div`
background: #0c8cf5;
border: 0;
box-sizing: border-box;
color: white;
font-size: 1rem;
margin: 0;
outline: 0;
padding: 8px; 
text-align: center;
text-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);
width: 100%;
cursor: pointer;
transition: background 0.21s ease-in-out;

&:focus,
&:hover {
  background: #3699ff;
}
`;

function TextEditor(props) {
  const [inputValue, setInputValue] = useState(props.value || ''); // Initialize with props.value or an empty string

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    if (props.onChange) {
      props.onChange(e);
    }
  };

  return (
    <React.Fragment>
      <Inner>
        <input
          type="text"
          placeholder="Add a Label"
          onFocus={props.onFocus}
          onBlur={props.onBlur}
          onChange={handleInputChange}
          value={inputValue}
        />
      </Inner>
      {inputValue && (
        <Button onClick={props.onSubmit}>Add +</Button>
      )}
    </React.Fragment>
  );
}

export default TextEditor;
