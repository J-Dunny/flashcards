const data = require('./data');
const prototypeQuestions = data.prototypeData;
const util = require('./util');
const Card = require('../src/Card');
const Turn = require('../src/Turn');
const Deck = require('../src/Deck');
const Round = require('../src/Round');

class Game {
  constructor() {
    this.currentRound = {};
  }

  start(){
    let cards = []
    prototypeQuestions.forEach((card, i) => {
      i = new Card(card.id, card.question, card.answers, card.correctAnswer)
      cards.push(i)
    });

    const deck = new Deck(cards);
    const round = new Round(deck);

    this.currentRound = round;
  }

  printMessage(deck, round) {
    console.log(`Welcome to FlashCards! You are playing with ${deck.countCards()} cards.
-----------------------------------------------------------------------`)
  }

  printQuestion(round) {
      util.main(round);
  }
}

module.exports = Game;
