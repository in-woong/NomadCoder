import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
// function ToDolist() {
//   const [toDo, setToDo] = useState('');
//   const [toDoError, setToDoError] = useState('');
//   const onChange = (e: React.FormEvent<HTMLInputElement>) => {
//     const {
//       currentTarget: { value },
//     } = e;
//     setToDoError('');
//     setToDo(value);
//   };
//   const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (toDo.length < 10) {
//       return setToDoError('To do should be longer');
//     }
//   };
//   return (
//     <div>
//       <form action='submit' onSubmit={onSubmit}>
//         <input
//           onChange={onChange}
//           value={toDo}
//           type='text'
//           placeholder='Write a to Do'
//         />
//         <button>Add</button>
//         {toDoError !== '' ? <span>{toDoError}</span> : null}
//       </form>
//     </div>
//   );
// }

interface IFormInput {
  toDo: string;
}

function ToDolist() {
  const { register, watch, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);
  return (
    <div>
      <form action='' onSubmit={handleSubmit(onSubmit)}>
        <input {...register('toDo')} type='text' />
        <button>Add</button>
      </form>
    </div>
  );
}

export default ToDolist;
