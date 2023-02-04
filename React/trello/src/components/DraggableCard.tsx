import React, { memo } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Card = styled.div<{ isDragging: boolean }>`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) =>
    props.isDragging ? '#4bcffa' : props.theme.cardColor};
  box-shadow: ${(props) =>
    props.isDragging ? '0px 2px 15px rgba(0,0,0,0.5)' : 'None'};
`;

interface IDraggableCard {
  index: number;
  toDo: string;
}

const DraggableCard = ({ index, toDo }: IDraggableCard) => {
  return (
    <Draggable key={toDo} draggableId={toDo} index={index}>
      {(magic, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={magic.innerRef}
          {...magic.dragHandleProps}
          {...magic.draggableProps}
        >
          {toDo}
        </Card>
      )}
    </Draggable>
  );
};

export default memo(DraggableCard);
