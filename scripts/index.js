// Улучшение:
// 1. Добавить фоновую музыку из "Пиратов Карибского моря".

// Объект представления
const view = {
  displayMessage: function(msg) {
    const messageArea = document.querySelector('.board__message-area');
    messageArea.textContent = msg;

    console.log(messageArea)
  },

  displayHit: function(location) {
    const cell = document.getElementById(location);
    cell.classList.add('hit');
  },

  displayMiss: function(location) {
    const cell = document.getElementById(location);
    cell.classList.add('miss');
  }
}

// Объект модели
const model = {
  boardSize: 7,
  numShips: 3,
  shipLength: 3,
  shipsSunk: 0,
  ships: [
    { locations: ['06', '16', '26'], hits: ['', '', ''] },
    { locations: ['24', '34', '44'], hits: ['', '', ''] },
    { locations: ['10', '11', '12'], hits: ['', '', ''] }
  ],

  fire: function(guess) {
    for (let i = 0; i < this.numShips; i++) {
      let ship = this.ships[i];
      let index = ship.locations.indexOf(guess);

      if (index >= 0) {
        ship.hits[index] = 'hit';
        view.displayHit(guess);
        view.displayMessage('HIT!');

        if (this.isSunk(ship)) {
          view.displayMessage('You sank my battleship!');
          this.shipsSunk++;
        }

        return true;
      }
    }
    view.displayMiss(guess);
    view.displayMessage('You missed');

    return false;
  },

  isSunk: function(ship) {
    for (let i = 0; i < this.shipLength; i++) {
      if (ship.hits[i] !== 'hit') {
        return false;
      }
    }

    return true;
  }
}

// Объект контроллера
const controller = {
  guesses: 0,

  processGuess: function(guess) {
    const location = this.parseGuess(guess);

    if (location) {
      this.guesses++;
      const hit = model.fire(location);

      if (hit && model.shipsSunk === model.numShips) {
        view.displayMessage(`You sank all my battleships, in ${this.guesses} guesses`)
      }
    }
  },

  parseGuess: function(guess) {
    const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

    if (guess === null || guess.length !== 2) {
      alert('Oops, please enter a letter and a number on the board');
    } else {
      let firstChar = guess.charAt(0);
      let row = alphabet.indexOf(firstChar);
      let column = guess.charAt(1);

      if (isNaN(row) || isNaN(column)) {
        alert("Oops, that isn't on the board");
      } else if ((row < 0 || row >= model.boardSize) || (column < 0 || column >= model.boardSize)) {
        alert("Oops, that's off the board!");
      } else {
        return row + column;
      }
    }

    return null;
  }
}


// Тесты
// console.log(controller.processGuess('A0'));

// console.log(controller.processGuess('A6'));
// console.log(controller.processGuess('B6'));
// console.log(controller.processGuess('C6'));

// console.log(controller.processGuess('C4'));
// console.log(controller.processGuess('D4'));
// console.log(controller.processGuess('E4'));

// console.log(controller.processGuess('B0'));
// console.log(controller.processGuess('B1'));
// console.log(controller.processGuess('B2'));


/*

// NB! Проблемы
// 1) Если пользователь ничего не вводит, то считается, что он выводит 0 и выходит "MISS" => добавить условие
// 2) Пользователь не может закрыть модальное окно, пока не закончится цикл
// 3) Можно ввести строковое значение и оно будет считаться как "MISS" => валидация
// 4) Можно стрелять в одну и ту же клетку (таким образом потопить корабль) => запретить это действие


// ПЕРЕМЕННЫЕ
// Позиция каждой клетки корабля
const locationRandom = Math.floor(Math.random() * 5);
const location1 = locationRandom;
const location2 = location1 + 1;
const location3 = location2 + 1;

// Номер ячейки для выстрела
let guess;
// Количество попаданий
let hits = 0;
// Количество попыток
let guesses = 0;

// Потоплен корабль или нет
let isSunk = true;


// ФУНКЦИИ
while (isSunk) {
  guess = prompt('Ready, aim, fire! (enter a number 0-6):');

  if (+guess < 0 || +guess > 6) {
    alert('Please enter a valid cell number!');
  } else {
    guesses += 1;

    if (+guess === location1 || +guess === location2 || +guess === location3) {
      alert('HIT!');
      hits += 1;

      if (hits === 3) {
        isSunk = false;
        alert('You sank my battleship!');
      }
    } else {
        alert('MISS!');
    }
  }
}

// Вывод результата на экран
// Точность попадания
const shootingAccuracy = 3 / guesses * 100;
const stats = `You took ${guesses} guesses to sink the battleship, which means your shooting accuracy was ${shootingAccuracy}%`;
alert(stats);

*/
