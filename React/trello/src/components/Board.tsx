import React, { useRef } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';

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
      ? '#dfe6e9'
      : props.isDraggingFromThis
      ? '#d2dae2'
      : 'transparent'};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  padding: 10px;
`;

interface BoardProps {
  todos: string[];
  boardId: string;
}

interface AreaProps {
  isDraggingFromThis: boolean;
  isDraggingOver: boolean;
}

const Board = ({ todos, boardId }: BoardProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const onClick = () => {
    inputRef.current?.focus();
  };
  return (
    <Wrapper>
      <input ref={inputRef} placeholder='grab me' />
      <button onClick={onClick}>click me</button>
      <Title>{boardId}</Title>
      <Droppable droppableId={boardId}>
        {(magic, info) => (
          <Area
            isDraggingFromThis={Boolean(info.draggingFromThisWith)}
            isDraggingOver={info.isDraggingOver}
            ref={magic.innerRef}
            {...magic.droppableProps}
          >
            {todos.map((todo, index) => (
              <DraggableCard key={index} index={index} toDo={todo} />
            ))}
            {magic.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
};

export default Board;
