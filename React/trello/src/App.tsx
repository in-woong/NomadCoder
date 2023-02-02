import React from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

function App() {
  const onDragEnd = () => {};
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        <Droppable droppableId='3'>
          {(magic) => (
            <ul ref={magic.innerRef} {...magic.droppableProps}>
              <Draggable draggableId='first' index={0}>
                {(some) => (
                  <li
                    ref={some.innerRef}
                    {...some.draggableProps}
                    {...some.dragHandleProps}
                  >
                    one
                  </li>
                )}
              </Draggable>
              <Draggable draggableId='two' index={1}>
                {(some) => (
                  <li
                    ref={some.innerRef}
                    {...some.draggableProps}
                    {...some.dragHandleProps}
                  >
                    two
                  </li>
                )}
              </Draggable>
            </ul>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
}

export default App;
