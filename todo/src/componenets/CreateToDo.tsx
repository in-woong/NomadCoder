import React from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { IToDo, toDoFilterState, toDoState } from '../toDoAtoms';

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(toDoFilterState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = (data: IForm) => {
    setToDos((oldToDos) => [
      ...oldToDos,
      { id: Date.now(), text: data.toDo, category },
    ]);
    setValue('toDo', '');
  };
  return (
    <form action='submit' onSubmit={handleSubmit(handleValid)}>
      <input
        {...register('toDo', { required: 'toDo is required' })}
        placeholder='Write a to Do'
      />
      <button>Add</button>
    </form>
  );
}

export default CreateToDo;
