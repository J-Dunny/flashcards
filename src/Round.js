const Turn = require('../src/Turn');
class Round {
  constructor(deck){
    this.deck = deck;
    this.turns = 0;
    this.incorrectGuesses = [];
  }

  returnCurrentCard(){
    return this.deck.cards[this.turns]
  }

  takeTurn(guess){
    const newTurn = new Turn(guess, this.returnCurrentCard())
    if(!newTurn.evaluateGuess()){
      this.incorrectGuesses.push(this.returnCurrentCard().id)
    }
    this.turns += 1;
    return newTurn.giveFeedback()
  }

  calculatePercentCorrect(){
    const correctGuesses = this.turns - this.incorrectGuesses.length;
    return (correctGuesses / this.turns) * 100
  }
}

module.exports = Round;
