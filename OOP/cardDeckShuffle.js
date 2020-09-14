const { template } = require("@babel/core");

let suits = ["Spades", "Clubs", "Diamond", "Hearts"];
let vals = ["Ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "Jack", "Queen", "King"];

class Card {
  constructor(suit, val) {
    this.suit = suit;
    this.val = val;
    this.type = `${val} of ${suit}`;
  }
}

class Deck {
  constructor() {
    this.deck = [];
  }
  //cannot just do this. MUST put this in a function
  // for(val of vals) {
  // for (suit of suits){
  //   this.deck.push(new Card(val, suit))
  // }
  // }
  createDeck(suits, vals) {
    for (let val of vals) {
      //DON'T FORGET "LET"
      for (let suit of suits) {
        this.deck.push(new Card(suit, val));
      }
    }
    return this.deck;
  }

  shuffleDeck() {
    let count = this.deck.length,
      temp,
      randomIdx;
    count--;
    console.log(count);
    while (count > 0) {
      randomIdx = Math.floor(Math.random() * count--);
      temp = this.deck[count]; //NOT count-1 bc count-- from above already decremented the number to count-1 value. it doens't wait until the NEXT loop at all!
      this.deck[count] = this.deck[randomIdx];
      this.deck[randomIdx] = temp;
    }

    return this.deck;
  }

  dealCards(num) {
    let hand = [];
    while (hand.length < num) {
      hand.push(this.deck.pop());
    }
    return hand;
  }
}

let sampleDeck = new Deck();
// console.log(sampleDeck.deck);
sampleDeck.createDeck(suits, vals);
sampleDeck.shuffleDeck();
// console.log(sampleDeck.deck.length)
console.log(sampleDeck.dealCards(2));
