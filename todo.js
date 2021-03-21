const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  pendingList = document.querySelector(".pendingList"),
  finishedList = document.querySelector(".finishedList");

const pending_LS = "pendingToDos",
  finished_LS = "finishedToDos";

let pendingToDos = [];
let finishedToDos = [];
let idNumbers = 1;

function saveToDo() {
  localStorage.setItem(pending_LS, JSON.stringify(pendingToDos));
  localStorage.setItem(finished_LS, JSON.stringify(finishedToDos));
  //pendingToDos에 있는 내용을 pending_LS(localStorage)에 저장
  //finishedToDos에 있는 내용을 string으로 변경하여 finished_LS(localStorage)에 저장
}

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  //클릭한 list를 li로 정의
  if (li.parentNode === pendingList) {
    pendingList.removeChild(li);
    //html상에서 삭제
    const cleanToDos = pendingToDos.filter(function (toDo) {
      return parseInt(toDo.id) !== parseInt(li.id);
    });
    //localstorage에서  id를 기준으로 필터링
    pendingToDos = cleanToDos;
    //대체
  } else {
    finishedList.removeChild(li);
    //html상에서 삭제
    const cleanToDos = finishedToDos.filter(function (toDo) {
      return parseInt(toDo.id) !== parseInt(li.id);
    });
    //localstorage에서  id를 기준으로 필터링
    finishedToDos = cleanToDos;
    //대체
  }
  saveToDo();
}

function backToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const span = li.childNodes[0];
  const text = span.innerText;

  paintToDo(text);
  deleteToDo(event);
}

function finishedToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const span = li.childNodes[0];
  const delBtn = li.childNodes[1];
  const finishBtn = li.childNodes[2];
  const text = span.innerText;
  deleteToDo(event);
  li.removeChild(delBtn);
  li.removeChild(finishBtn);
  newFinishToDo(text);
}

function newFinishToDo(text) {
  const li = document.createElement("li");
  const deleteBtn = document.createElement("button");
  const beforeBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = idNumbers;
  //클릭한 list를 li로 정의
  span.innerText = text;
  deleteBtn.innerText = "❌";
  deleteBtn.addEventListener("click", deleteToDo);
  beforeBtn.innerText = "⏮";
  beforeBtn.addEventListener("click", backToDo);
  //beforeBtn.addEventListener("click", beforeToDo);
  li.appendChild(span);
  li.appendChild(deleteBtn);
  li.appendChild(beforeBtn);
  li.id = newId;
  //finish를 삭제후 before 추가
  finishedList.appendChild(li);
  //pending html상에서 삭제, finished html 상에 추가
  const finishedObj = {
    text: text,
    id: newId
  };
  finishedToDos.push(finishedObj);
  //list를 finished_LS로 이동
  idNumbers += 1;
  saveToDo();
}

function paintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const finishBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = idNumbers;

  span.innerText = text;
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteToDo);
  finishBtn.innerText = "✅";
  finishBtn.addEventListener("click", finishedToDo);
  //구성요소 만들기

  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(finishBtn);
  li.id = newId;
  //list 구성

  pendingList.appendChild(li);
  //html상의 Pending에 보이기

  const pendingObj = {
    text: text,
    id: newId
  };
  pendingToDos.push(pendingObj);
  saveToDo();

  idNumbers += 1;
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function loadToDos() {
  const pLoadedToDos = localStorage.getItem(pending_LS);
  const fLoadedToDos = localStorage.getItem(finished_LS);
  if (pLoadedToDos !== null) {
    const parsedToDos = JSON.parse(pLoadedToDos);
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text);
    });
  }
  if (fLoadedToDos !== null) {
    const parsedToDos = JSON.parse(fLoadedToDos);
    parsedToDos.forEach(function (toDo) {
      newFinishToDo(toDo.text);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();