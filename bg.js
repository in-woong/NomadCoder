const body = document.querySelector("body");

const IMG_NUMBER = 4;

function handleImgLoad(){
  console.log("finished ImgLoading");
}

function paintImage(randomNumber){
  const image = new Image();
  image.src = `image/${randomNumber + 1}.jpg`;
  image.classList.add("bgImage");
  body.appendChild(image);
  image.addEventListener("loadend", handleImgLoad);
}

function genRandom(){
  const number = Math.floor(Math.random() * IMG_NUMBER);
  return number;
}

function init(){
  const randomNumber = genRandom();
  paintImage(randomNumber);

}

init();