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
