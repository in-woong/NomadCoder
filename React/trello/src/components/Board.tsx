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
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

interface BoardProps {
  todos: string[];
  boardId: string;
}

const Board = ({ todos, boardId }: BoardProps) => {
  return (
    <Droppable droppableId={boardId}>
      {(magic) => (
        <Wrapper ref={magic.innerRef} {...magic.droppableProps}>
          <Title>{boardId}</Title>
          {todos.map((todo, index) => (
            <DraggableCard key={index} index={index} toDo={todo} />
          ))}
          {magic.placeholder}
        </Wrapper>
      )}
    </Droppable>
  );
};

export default Board;
