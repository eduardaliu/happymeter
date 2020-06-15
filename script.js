$(document).ready(() => {
 
    class Board {
        constructor(cards){
          this.cards = cards;
        }
        shuffleCards() {
          if (!this.cards) return undefined;
          let arrayLength = this.cards.length;
          let randomElement;
          let lastElement;  
          while (arrayLength) {  // while there are remaining elements to shuffle…
            randomElement = Math.floor(Math.random() * arrayLength--);  // pick a remaining element
            lastElement = this.cards[arrayLength];  // and swap it with the current element that's being iterated over
            this.cards[arrayLength] = this.cards[randomElement];
            this.cards[randomElement] = lastElement;
          }
         }
      }

    const cards = [
        { name: 'squirrel', img: '/squirrel.svg', points: 10},
        { name: 'squirrel', img: '/fireworks.svg', points: -100} ,
        { name: 'squirrel', img: '/fireworks.svg', points: -100},
        { name: 'squirrel', img: '/squirrel.svg', points: 10},
        { name: 'squirrel', img: '/fireworks.svg', points: -100},
        { name: 'squirrel', img: '/squirrel.svg', points: 10},
        { name: 'squirrel', img: '/squirrel.svg', points: 10},
        { name: 'squirrel', img: '/fireworks.svg', points: -100},
        { name: 'squirrel', img: '/squirrel.svg', points: 10},
        { name: 'squirrel', img: '/squirrel.svg', points: 10},
        { name: 'squirrel', img: '/squirrel.svg', points: 10},
        { name: 'squirrel', img: '/squirrel.svg', points: 10}
      ];

    let board = new Board(cards);
    board.shuffleCards();
    let points = 0;
    let currentWidth = 150;
    let currentStreak = 0;
    
    let html = '';
    board.cards.forEach(pic => {
      html += `<div class="card" id="${pic.points}">
                  <div class="back"></div>
                  <div class="front" style="background-image: url(img/${pic.img}) "></div>
               </div>`
    });

    $('.cards-div').html(html);

    // how to write this in jquery?
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', (card) => {
            card.target.parentNode.classList.add("turned"); // vira o card que o loop ta iterando sobre
            points += Number(card.target.parentNode.id)
            console.log(Number(card.target.parentNode.id));
            let newWidth = currentWidth + points;
            document.querySelector('.meter-progress').style.width = `${newWidth}px`; // adding point to the width of the bar
            if (Number(card.target.parentNode.id) < 0) {
                currentStreak = 0;
                document.querySelector('.streak-nr').innerHTML = 0;
            } else {currentStreak = currentStreak + 1;
                document.querySelector('.streak-nr').innerHTML = `${currentStreak}`;}
            if (newWidth < 0) {
                document.querySelector('.meter-progress').style.visibility = 'hidden';
                document.querySelector('.streak-nr').innerHTML = `0`;
                // document.querySelector('.cards-div').innerHTML = `the dog died of sadness 😭😭😭😭😭😭` // kk arrumar isso aqui, uma tela na frente com .gif?
                document.querySelector('.game-over').style.visibility = 'visible';
                document.querySelector('.sad-gif').style.visibility = 'visible';
            }
            card.target.parentNode.classList.add("noclick") // only clickable once 
            // console.log($('.front').target);
            
        });
      });

    //   document.querySelector('.streak-nr').innerHTML = `AYOOOOO`;



   




    $('footer div p').on('click', () => {
        console.log('ioooo');
        location.reload();
    })

  })