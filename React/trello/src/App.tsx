import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { todoState } from './atoms';
import Board from './components/Board';

const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 10px;
`;

function App() {
  const [todos, setTodos] = useRecoilState(todoState);

  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    if (!destination) return;

    setTodos((oldTodos) => {
      const copyTodos = [...oldTodos.to_do];
      copyTodos.splice(source.index, 1);
      copyTodos.splice(destination.index, 0, draggableId);
      return { 'To Do': [...copyTodos], ...oldTodos };
    });
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(todos).map((boardId) => (
            <Board todos={todos[boardId]} boardId={boardId} key={boardId} />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
