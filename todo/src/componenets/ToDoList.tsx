import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { filteredToDoState, toDoFilterState, toDoState } from '../toDoAtoms';
import CreateToDo from './CreateToDo';
import ToDo from './ToDo';

function ToDolist() {
  const toDos = useRecoilValue(toDoState);
  const filteredToDos = useRecoilValue(filteredToDoState);
  const [filter, setFilter] = useRecoilState(toDoFilterState);
  const updateFilter = (data: React.FormEvent<HTMLSelectElement>) => {
    setFilter(data.currentTarget.value as any);
  };
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <select value={filter} onChange={updateFilter}>
        <option value='TO_DO'>TO DO</option>
        <option value='DOING'>DOING</option>
        <option value='DONE'>DONE</option>
      </select>
      <CreateToDo />
      {/* <ul>
        {toDos.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul> */}

      <ul>
        {filteredToDos.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
    </div>
  );
}

// interface IFormInput {
//   toDo: string;
//   email: string;
//   firstName: string;
//   lastName: string;
//   username: string;
//   password: string;
//   password1: string;
// }

// function ToDolist() {
//   const {
//     register,
//     watch,
//     handleSubmit,
//     formState: { errors },
//     setError,
//   } = useForm<IFormInput>({
//     defaultValues: {
//       toDo: 'write something',
//       email: '@naver.com',
//     },
//   });

//   const onSubmit: SubmitHandler<IFormInput> = (data) => {
//     if (data.password !== data.password1) {
//       setError(
//         'password1',
//         { message: 'Password are not the same' },
//         { shouldFocus: true }
//       );
//     }
//   };
//   console.log(errors);
//   return (
//     <div>
//       <form action='' onSubmit={handleSubmit(onSubmit)}>
//         <input
//           {...register('toDo', {
//             required: 'toDo list is required',
//             minLength: { value: 5, message: 'Your ToDo list is too short' },
//           })}
//           type='text'
//         />

//         <input
//           {...register('email', {
//             required: true,
//             pattern: {
//               value: /^[A-Za-z0-9._%+-]+@naver.com$/,
//               message: 'Only naver.com emails allowed',
//             },
//           })}
//           placeholder='Eamil'
//         />
//         <span>{errors.email?.message}</span>
//         <input
//           {...register('firstName', {
//             required: true,
//             minLength: 5,
//             validate: (value) => !value.includes('nico'),
//           })}
//         />
//         <input {...register('lastName', { required: true, minLength: 5 })} />
//         <input {...register('username', { required: true, minLength: 5 })} />
//         <input {...register('password', { required: true, minLength: 5 })} />
//         <input {...register('password1', { required: true, minLength: 5 })} />
//         <span>{errors.password1?.message}</span>
//         <button>Add</button>
//       </form>
//     </div>
//   );
// }

export default ToDolist;
