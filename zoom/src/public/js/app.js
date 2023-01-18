const socket = io();

const myFace = document.getElementById('myFace');
const muteBtn = document.getElementById('mute');
const cameraBtn = document.getElementById('camera');
const camerasSelect = document.getElementById('cameras');

const call = document.getElementById('call');
const welcome = document.getElementById('welcome');

call.hidden = true;

let myStream;
let muted = false;
let cameraOff = false;

let myPeerConnection;

async function getCameras() {
  try {
    ``;
    const devices = await navigator.mediaDevices.enumerateDevices();
    const cameras = devices.filter((device) => device.kind === 'videoinput');
    const currentCamera = myStream.getVideoTracks()[0];
    cameras.forEach((camera) => {
      const option = document.createElement('option');
      option.value = camera.deviceId;
      option.innerText = camera.label;
      if (currentCamera.label === camera.label) option.selected = true;
      camerasSelect.appendChild(option);
    });
  } catch (e) {
    console.log(e);
  }
}

async function getMedia(deviceId) {
  const initialConstrains = {
    audio: true,
    video: { facingMode: 'user' },
  };

  const cameraConstrains = {
    audio: true,
    video: { deviceId: { exact: deviceId } },
  };

  try {
    myStream = await navigator.mediaDevices.getUserMedia(
      deviceId ? cameraConstrains : initialConstrains
    );
    myFace.srcObject = myStream;
    if (!deviceId) {
      await getCameras();
    }
  } catch (e) {
    console.log(e);
  }
}

function handleMuteClick() {
  myStream
    .getAudioTracks()
    .forEach((track) => (track.enabled = !track.enabled));
  if (!muted) {
    muteBtn.innerText = 'Unmute';
    muted = true;
  } else {
    muteBtn.innerText = 'Mute';
    muted = false;
  }
}

function handleCameraClick() {
  myStream
    .getVideoTracks()
    .forEach((track) => (track.enabled = !track.enabled));
  if (cameraOff) {
    cameraBtn.innerText = 'Turn Camera Off';
    cameraOff = false;
  } else {
    cameraBtn.innerText = 'Turn Camera On';
    cameraOff = true;
  }
}

async function handleCameraChange() {
  await getMedia(camerasSelect.value);
}

const welcomeForm = welcome.querySelector('form');

let roomName;
let nickName;

async function initCall() {
  welcome.hidden = true;
  call.hidden = false;
  await getMedia();
  const h2 = call.querySelector('h2');
  h2.innerText = `Room ${roomName}`;

  makeConnection();
}

function addMessage(messages) {
  const ul = call.querySelector('ul');
  const li = document.createElement('li');
  li.innerText = messages;
  ul.appendChild(li);
}

async function handleWelcomeSubmit(event) {
  event.preventDefault();
  const roomNameInput = welcomeForm.querySelector('#roomname');
  const nickNameInput = welcomeForm.querySelector('#nickname');

  roomName = roomNameInput.value;
  roomNameInput.value = '';

  nickName = nickNameInput.value;
  nickNameInput.value = '';

  await initCall();
  socket.emit('enter_room', roomName, nickName);
}

//socket Code

socket.on('welcome', async (user, newCount) => {
  const h2 = call.querySelector('h2');
  h2.innerText = `Room ${roomName} (${newCount})`;
  addMessage(`${user} joined!`);

  const offer = await myPeerConnection.createOffer();
  myPeerConnection.setLocalDescription(offer);
  socket.emit('offer', offer, roomName);
  console.log('sent offer');
});

socket.on('bye', (user, newCount) => {
  const h2 = call.querySelector('h2');
  h2.innerText = `Room ${roomName} (${newCount})`;
  addMessage(`${user} left!`);
});

socket.on('room_change', (rooms) => {
  const roomList = welcome.querySelector('ul');
  roomList.innerHTML = '';
  if (!rooms.length) {
    roomList.innerHTML = '';
    return;
  }
});

socket.on('offer', async (offer) => {
  console.log('received offer');
  myPeerConnection.setRemoteDescription(offer);
  const answer = await myPeerConnection.createAnswer();
  myPeerConnection.setLocalDescription(answer);
  socket.emit('answer', answer, roomName);
  console.log('sent the answer');
});

socket.on('answer', (answer) => {
  console.log('received the  answer');
  myPeerConnection.setRemoteDescription(answer);
});

socket.on('ice', (ice) => {
  console.log('received candidate');
  myPeerConnection.addIceCandidate(ice);
});

muteBtn.addEventListener('click', handleMuteClick);
cameraBtn.addEventListener('click', handleCameraClick);
camerasSelect.addEventListener('input', handleCameraChange);
welcomeForm.addEventListener('submit', handleWelcomeSubmit);

//RTC Code

function makeConnection() {
  myPeerConnection = new RTCPeerConnection();
  myPeerConnection.addEventListener('icecandidate', handleIce);
  myPeerConnection.addEventListener('addstream', handleAddStream);
  myStream
    .getTracks()
    .forEach((track) => myPeerConnection.addTrack(track, myStream));
}

function handleIce(data) {
  console.log('got and sent iceCandidate');
  socket.emit('ice', data.candidate, roomName);
}

function handleAddStream(data) {
  const peersStream = document.querySelector('#peerFace');
  peersStream.srcObject = data.stream;
}
