import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import type { Todo } from '../atoms';
import { todoState } from '../atoms';

import DraggableCard from './DraggableCard';

const Wrapper = styled.div`
  width: 300px;
  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

const Area = styled.div<AreaProps>`
  background-color: ${(props) =>
    props.isDraggingOver
      ? '#afe2f3'
      : props.isDraggingFromThis
      ? '#b2bec3'
      : 'transparent'};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  padding: 10px;
`;

const Form = styled.form`
  width: 100%;
  justify-content: center;
  display: flex;
  input {
    width: 90%;
    border-radius: 10px;
    border: 0px;
    padding: 8px 10px;
  }
`;
interface BoardProps {
  todos: Todo[];
  boardId: string;
}

interface AreaProps {
  isDraggingFromThis: boolean;
  isDraggingOver: boolean;
}

interface IForm {
  todo: string;
}

const Board = ({ todos, boardId }: BoardProps) => {
  const setTodos = useSetRecoilState(todoState);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onValid = ({ todo }: IForm) => {
    const newTodo = { id: Date.now(), text: todo };
    setTodos((allBoards) => {
      return {
        ...allBoards,
        [boardId]: [newTodo, ...allBoards[boardId]],
      };
    });
    setValue('todo', '');
  };
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register('todo', { required: true })}
          type='text'
          placeholder={`add task on ${boardId}`}
        />
      </Form>

      <Droppable droppableId={boardId}>
        {(magic, info) => (
          <Area
            isDraggingFromThis={Boolean(info.draggingFromThisWith)}
            isDraggingOver={info.isDraggingOver}
            ref={magic.innerRef}
            {...magic.droppableProps}
          >
            {todos.map((todo, index) => (
              <DraggableCard
                key={todo.id}
                index={index}
                todoId={todo.id}
                todoText={todo.text}
              />
            ))}
            {magic.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
};

export default Board;
