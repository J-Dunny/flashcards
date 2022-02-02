const chai = require('chai');
const expect = chai.expect;
const Card = require('../src/Card');
const Turn = require('../src/Turn');
const Deck = require('../src/Deck');
const Round = require('../src/Round');

describe('Round', function() {


  // it('should be a function', function() {
  //   const round = new Round();
  //   expect(Round).to.be.a('function');
  // });

  it('should instantiate with a deck of cards', function() {
    const card1 = new Card(1, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
    const card2 = new Card(14, 'What organ is Khalid missing?', ['spleen', 'appendix', 'gallbladder'], 'gallbladder');
    const card3 = new Card(12, 'What is Travis\'s middle name?', ['Lex', 'William', 'Fitzgerald'], 'Fitzgerald');

    const deck = new Deck([card1, card2, card3]);
    const round = new Round(deck);

    expect(round.deck).to.deep.equal([card1, card2, card3]);
  });

  it('should have a method that returns current card being played', function() {
    const card1 = new Card(1, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
    const card2 = new Card(14, 'What organ is Khalid missing?', ['spleen', 'appendix', 'gallbladder'], 'gallbladder');
    const card3 = new Card(12, 'What is Travis\'s middle name?', ['Lex', 'William', 'Fitzgerald'], 'Fitzgerald');

    const deck = new Deck([card1, card2, card3]);
    const round = new Round(deck);

    expect(round.returnCurrentCard()).to.deep.equal({
                                                    id: 1,
                                                    question: 'What is Robbie\'s favorite animal',
                                                    answers: ['sea otter', 'pug', 'capybara'],
                                                    correctAnswer: 'sea otter'
                                                  });
  });

  it('should be able to keep track of the number of turns defaulting to 0', function() {
    const card1 = new Card(1, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
    const card2 = new Card(14, 'What organ is Khalid missing?', ['spleen', 'appendix', 'gallbladder'], 'gallbladder');
    const card3 = new Card(12, 'What is Travis\'s middle name?', ['Lex', 'William', 'Fitzgerald'], 'Fitzgerald');

    const deck = new Deck([card1, card2, card3]);
    const round = new Round(deck);

    expect(round.turns).to.equal(0);
  });

  it('should be able to store all incorrect guesses', function() {
    const card1 = new Card(1, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
    const card2 = new Card(14, 'What organ is Khalid missing?', ['spleen', 'appendix', 'gallbladder'], 'gallbladder');
    const card3 = new Card(12, 'What is Travis\'s middle name?', ['Lex', 'William', 'Fitzgerald'], 'Fitzgerald');

    const deck = new Deck([card1, card2, card3]);
    const round = new Round(deck);

    expect(round.incorrectGuesses).to.deep.equal([]);
  });


  it('should have a method called takeTurn that instantiates a new Turn which gives feedback for both correct and incorrect answers', function() {

    const card1 = new Card(1, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
    const card2 = new Card(14, 'What organ is Khalid missing?', ['spleen', 'appendix', 'gallbladder'], 'gallbladder');
    const card3 = new Card(12, 'What is Travis\'s middle name?', ['Lex', 'William', 'Fitzgerald'], 'Fitzgerald');

    const deck = new Deck([card1, card2, card3]);
    const round = new Round(deck);



    expect(round.takeTurn('sea otter')).to.equal('correct!');
    expect(round.takeTurn('yo')).to.equal('incorrect!');
  });

  it('The takeTurn method should update the turns count, regardless of whether the guess is correct or incorrect', function() {

    const card1 = new Card(1, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
    const card2 = new Card(14, 'What organ is Khalid missing?', ['spleen', 'appendix', 'gallbladder'], 'gallbladder');
    const card3 = new Card(12, 'What is Travis\'s middle name?', ['Lex', 'William', 'Fitzgerald'], 'Fitzgerald');

    const deck = new Deck([card1, card2, card3]);
    const round = new Round(deck);

    round.takeTurn('sea otter')
    round.takeTurn('yo')

    expect(round.turns).to.equal(2);
  });

  it('In the takeTurn method the next card becomes current card', function() {

    const card1 = new Card(1, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
    const card2 = new Card(14, 'What organ is Khalid missing?', ['spleen', 'appendix', 'gallbladder'], 'gallbladder');
    const card3 = new Card(12, 'What is Travis\'s middle name?', ['Lex', 'William', 'Fitzgerald'], 'Fitzgerald');

    const deck = new Deck([card1, card2, card3]);
    const round = new Round(deck);

    round.takeTurn('sea otter')
    round.takeTurn('yo')

    expect(round.turns).to.equal(2);
    expect(round.takeTurn('Fitzgerald')).to.equal('correct!')
    expect(round.turns).to.equal(3);
  });

  it('Guess is evaluated/recorded. Incorrect guesses will be stored (via the id) in an array of incorrectGuesses', function() {

    const card1 = new Card(1, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
    const card2 = new Card(14, 'What organ is Khalid missing?', ['spleen', 'appendix', 'gallbladder'], 'gallbladder');
    const card3 = new Card(12, 'What is Travis\'s middle name?', ['Lex', 'William', 'Fitzgerald'], 'Fitzgerald');

    const deck = new Deck([card1, card2, card3]);
    const round = new Round(deck);

    round.takeTurn('sea otter')
    round.takeTurn('yo')

    expect(round.turns).to.equal(2);
    expect(round.takeTurn('Fitzgerald')).to.equal('correct!')
    expect(round.turns).to.equal(3);
    expect(round.incorrectGuesses).to.deep.equal([14]);
  });

  it('calculatePercentCorrect: method that calculates and returns the percentage of correct guesses', function() {

    const card1 = new Card(1, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
    const card2 = new Card(14, 'What organ is Khalid missing?', ['spleen', 'appendix', 'gallbladder'], 'gallbladder');
    const card3 = new Card(12, 'What is Travis\'s middle name?', ['Lex', 'William', 'Fitzgerald'], 'Fitzgerald');

    const deck = new Deck([card1, card2, card3]);
    const round = new Round(deck);

    round.takeTurn('sea otter')
    round.takeTurn('yo')

    expect(round.returnCurrentCard()).to.deep.equal({
                                                     id: 12,
                                	                   question: 'What is Travis\'s middle name?',
                                	                   answers: ['Lex', 'William', 'Fitzgerald'],
                                	                   correctAnswer: 'Fitzgerald'
                                	                 });

    expect(round.calculatePercentCorrect()).to.equal(50);

  });

});
