'use strict';
import { createStore } from 'redux';

const add = document.getElementById('add');
const minus = document.getElementById('minus');
const number = document.querySelector('span');

const countModifier = (count = 0, action) => {
  console.log(count, action);
  switch (action.type) {
    case 'add':
      return count + 1;
    case 'minus':
      return count - 1;
    default:
      return count;
  }
};

const countStore = createStore(countModifier);

const handleAdd = () => {
  countStore.dispatch({ type: 'add' });
};

const handleMinus = () => {
  countStore.dispatch({ type: 'minus' });
};

const onChange = () => {
  number.innerText = countStore.getState();
};

countStore.subscribe(onChange);

add.addEventListener('click', handleAdd);
minus.addEventListener('click', handleMinus);
