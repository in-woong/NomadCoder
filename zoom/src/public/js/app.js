const socket = io();

const welcome = document.getElementById('welcome');
const form = welcome.querySelector('form');
const room = document.getElementById('room');

room.hidden = true;
let roomName, nickName;

function showRoom() {
  welcome.hidden = true;
  room.hidden = false;
  const h3 = room.querySelector('h3');
  h3.innerText = `Room ${roomName}`;
  const msgForm = room.querySelector('#msg');
  msgForm.addEventListener('submit', handleMessageSubmit);
}

function addMessage(messages) {
  const ul = room.querySelector('ul');
  const li = document.createElement('li');
  li.innerText = messages;
  ul.appendChild(li);
}

function handleMessageSubmit(event) {
  event.preventDefault();
  const input = room.querySelector('#msg input');
  const value = input.value;
  input.value = '';
  socket.emit('new_message', value, roomName, () => {
    addMessage(`You: ${value}`);
  });
}

function handleRoomSubmit(event) {
  event.preventDefault();
  const roomInput = form.querySelector('#roomname');
  const nameInput = form.querySelector('#nickname');
  roomName = roomInput.value;
  nickName = nameInput.value;
  roomInput.value = '';
  nameInput.value = '';

  socket.emit('enter_room', roomName, nickName, showRoom);
}

form.addEventListener('submit', handleRoomSubmit);

socket.on('welcome', (user, newCount) => {
  const h3 = room.querySelector('h3');
  h3.innerText = `Room ${roomName} (${newCount})`;
  addMessage(`${user} joined!`);
});

socket.on('bye', (user, newCount) => {
  const h3 = room.querySelector('h3');
  h3.innerText = `Room ${roomName} (${newCount})`;
  addMessage(`${user} left!`);
});

socket.on('new_message', addMessage);

socket.on('room_change', (rooms) => {
  const roomList = welcome.querySelector('ul');
  roomList.innerHTML = '';
  if (rooms.length === 0) {
    roomList.innerHTML = '';
    return;
  }

  rooms.forEach((room) => {
    const li = document.createElement('li');
    li.innerText = room;
    roomList.append(li);
  });
});
