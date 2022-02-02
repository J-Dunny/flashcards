const Turn = require('../src/Turn');
class Round {
  constructor(deck){
    this.deck = deck.cards;
    this.turns = 0;
    this.incorrectGuesses = [];
  }

  returnCurrentCard(){
    return this.deck[this.turns]
  }

  takeTurn(guess){
    const newTurn = new Turn(guess, this.returnCurrentCard())
    this.turns += 1;
    return newTurn.giveFeedback()

  }
}

module.exports = Round;
