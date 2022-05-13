const endGameData = [
  {
    name: "space-stone",
    avengers: ["captain-america", "iron-man"],
  },
  {
    name: "mind-stone",
    avengers: ["ant-man", "captain-america"],
  },
  {
    name: "reality-stone",
    avengers: ["rocket-raccoon", "thor"],
  },
  {
    name: "power-stone",
    avengers: ["war-machine", "nebula"],
  },
  {
    name: "time-stone",
    avengers: [{ name: "hulk" }],
  },
  {
    name: "soul-stone",
    avengers: ["black-widow", "hawkeye"],
  },
];

const stones = document.querySelectorAll(".stone");
const avengers = document.querySelectorAll(".avenger");
const glove = document.querySelector(".infinity_glove");

const allStones = endGameData.map(function (value) {
  return value.name;
});
let current = { stone: "", avengers: [], clicked: [] };
let correct = {};

stones.forEach((stone) => {
  stone.addEventListener("click", ({ target }) => {
    onStoneClicked(target);
  });
});

function onStoneClicked(target) {
  current.stone = target.id;
  changeBackground(target, "red");
  current.clicked.push(target);
}

avengers.forEach((avenger) => {
  avenger.addEventListener("click", ({ target }) => {
    onAvengerClicked(target);
  });
});

function onAvengerClicked(target) {
  if (!current.avengers.includes(target.id)) {
    current.avengers.push(target.id);
  }
  changeBackground(target, "blue");
  current.clicked.push(target);
}

glove.addEventListener("click", ({ target }) => {
  onGloveClicked(target);
});

function onGloveClicked(target) {
  endGameData.forEach((item) => {
    if (item.name === current.stone) {
      let dataAvengers = item.avengers;
      if (current.stone === "time-stone") {
        dataAvengers = [item.avengers[0].name];
      }
      if (isSameArray(dataAvengers, current.avengers)) {
        alert("Success");
        if (!correct.includes(item)) {
          correct.push(item);
        }
        alert(correct);
        if (isSameArray(correct, allStones)) {
          alert("Found Them All!");
        }
      } else {
        current.clicked.map((target) => {
          changeBackground(target, "");
        });
        alert("Wrong Match, Try Again...");
      }
      current.stone = "";
      current.avengers = [];
    }
  });
}

function isSameArray(array1, array2) {
  const isInArray1 = array1.every((item) =>
    array2.find((item2) => item === item2)
  );
  const isInArray2 = array2.every((item) =>
    array1.find((item2) => item === item2)
  );

  const isSameArray =
    array1.length === array2.length && isInArray1 && isInArray2;

  return isSameArray;
}

function changeBackground(target, color) {
  target.style.background = color;
}
