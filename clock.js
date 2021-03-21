const clockContainer = document.querySelector(".js-clock"),
clockTitle = clockContainer.querySelector(".clock"),
clockNumber = document.querySelector(".clockNumber");

let Num = 1;

function toggle(){
  Num = Num *(-1);
}

function getTime(){
    const date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    if(Num === 1){
      clockTitle.innerText = `${
      hours < 10 ? `0${hours}`: hours}: ${
      minutes < 10 ? `0${minutes}` : minutes}: ${
      seconds < 10 ? `0${seconds}`: seconds}`;
    }else{
      var ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12;
      clockTitle.innerText = `${
        hours < 10 ? `0${hours}`: hours}: ${
        minutes < 10 ? `0${minutes}` : minutes}: ${
        seconds < 10 ? `0${seconds}`: seconds} ${ampm}`; // the hour '0' should be '12'
    }
}
function init(){
  setInterval(getTime, 1000);
  clockNumber.addEventListener("click", toggle);
}

init();