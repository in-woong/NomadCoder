import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { isNativeError } from 'util/types';
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
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  password1: string;
}

function ToDolist() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IFormInput>({
    defaultValues: {
      toDo: 'write something',
      email: '@naver.com',
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    if (data.password !== data.password1) {
      setError(
        'password1',
        { message: 'Password are not the same' },
        { shouldFocus: true }
      );
    }
  };
  console.log(errors);
  return (
    <div>
      <form action='' onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('toDo', {
            required: 'toDo list is required',
            minLength: { value: 5, message: 'Your ToDo list is too short' },
          })}
          type='text'
        />

        <input
          {...register('email', {
            required: true,
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: 'Only naver.com emails allowed',
            },
          })}
          placeholder='Eamil'
        />
        <span>{errors.email?.message}</span>
        <input
          {...register('firstName', {
            required: true,
            minLength: 5,
            validate: (value) => !value.includes('nico'),
          })}
        />
        <input {...register('lastName', { required: true, minLength: 5 })} />
        <input {...register('username', { required: true, minLength: 5 })} />
        <input {...register('password', { required: true, minLength: 5 })} />
        <input {...register('password1', { required: true, minLength: 5 })} />
        <span>{errors.password1?.message}</span>
        <button>Add</button>
      </form>
    </div>
  );
}

export default ToDolist;
