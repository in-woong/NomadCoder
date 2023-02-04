import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';

import DraggableCard from './DraggableCard';

const Wrapper = styled.div`
  width: 300px;
  padding: 20px 10px;
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
    props.isDraggingOver ? 'pink' : props.isDraggingFromThis ? 'red' : 'blue'};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
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
  return (
    <Wrapper>
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
