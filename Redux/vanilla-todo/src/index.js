const { createStore } = require('redux');

const $form = document.querySelector('form');
const $input = document.querySelector('input');
const $ul = document.querySelector('ul');

const ADD_TODO = 'ADD_TODO';
const DELETE_TODO = 'DELETE_TODO';

const addToDo = (text) => {
  return { type: ADD_TODO, text };
};

const deleteToDo = (id) => {
  return { type: DELETE_TODO, id };
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      const newTodoObj = { text: action.text, id: Date.now() };
      return [newTodoObj, ...state];
    case DELETE_TODO:
      console.log(action.id, state[0].id);
      const clenaned = state.filter((toDo) => toDo.id !== parseInt(action.id));
      return clenaned;
    default:
      return state;
  }
};

const store = createStore(reducer);

// store.subscribe(() => console.log(store.getState()));

const dispatchAddTodo = (text) => {
  store.dispatch(addToDo(text));
};

const dispatchDeleteTodo = (e) => {
  const id = e.target.parentNode.id;
  store.dispatch(deleteToDo(id));
};

const paintTodos = () => {
  console.log('paint', store.getState());
  $ul.innerHTML = '';

  const toDos = store.getState();
  toDos.forEach((toDo) => {
    const $li = document.createElement('li');
    const $btn = document.createElement('button');
    $btn.innerText = 'Del';
    $btn.addEventListener('click', dispatchDeleteTodo);
    $li.id = toDo.id;
    $li.innerText = toDo.text;
    $li.appendChild($btn);
    $ul.appendChild($li);
  });
};

const onSubmit = (e) => {
  e.preventDefault();
  const toDo = $input.value;
  $input.value = '';
  dispatchAddTodo(toDo);
};

$form.addEventListener('submit', onSubmit);
store.subscribe(paintTodos);
