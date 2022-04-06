import React, { useState } from 'react';

function Detail() {
  const [text, setText] = useState('');
  const onChange = (e) => {
    setText(e.target.value);
  };
  return (
    <>
      <h1>To Do</h1>;
      <input type='text' value={text} onChange={onChange} />
    </>
  );
}

export default Detail;
