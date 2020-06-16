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
        { name: 'squirrel', img: '/squirrel.svg', points: 100, msg: `<li class='up'>⬆ laaaaaa</li> `},
        { name: 'fireworks', img: '/fireworks.svg', points: -100, msg: `<li class='down'>⬇ laaaaaa</li> `},
        { name: 'fireworks', img: '/fireworks.svg', points: -10, msg: `<li class='down'>⬇ laaaaaa</li> `},
        { name: 'squirrel', img: '/squirrel.svg', points: 10, msg: `<li class='up'>⬆ laaaaaa</li> `},
        { name: 'fireworks', img: '/fireworks.svg', points: -100, msg: `<li class='down'>⬇ laaaaaa</li> `},
        { name: 'squirrel', img: '/squirrel.svg', points: 10, msg: `<li class='up'>⬆ laaaaaa</li> `},
        { name: 'squirrel', img: '/squirrel.svg', points: 10, msg: `<li class='up'>⬆ laaaaaa</li> `},
        { name: 'fireworks', img: '/fireworks.svg', points: -100, msg: `<li class='down'>⬇ laaaaaa</li> `},
        { name: 'squirrel', img: '/squirrel.svg', points: 10, msg: `<li class='up'>⬆ laaaaaa</li> `},
        { name: 'squirrel', img: '/squirrel.svg', points: 50, msg: `<li class='up'>⬆ laaaaaa</li> `},
        { name: 'squirrel', img: '/squirrel.svg', points: 10, msg: `<li class='up'>⬆ laaaaaa</li> `},
        { name: 'squirrel', img: '/squirrel.svg', points: 10, msg: `<li class='up'>⬆ laaaaaa</li> `},
      ];

    let board = new Board(cards);
    board.shuffleCards();
    let points = 0;
    let currentWidth = 150;
    let currentStreak = 0;
    let turnedCards = [];

    document.querySelector('button').onclick = () => {
        document.querySelector('.start').style.visibility = 'hidden';
        document.querySelector('button').style.visibility = 'hidden';
    }
    
    let html = '';
    board.cards.forEach(pic => {
      html += `<div class="card" id="${pic.points}">
                  <div class="back" id="${pic.msg}"></div>
                  <div class="front" style="background-image: url(img/${pic.img}) "></div>
               </div>`
    });

    $('.cards-div').html(html);

    // how to write this in jquery?
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', (card) => {
            card.target.parentNode.classList.add("turned"); // vira o card que o loop ta iterando sobre
            document.querySelector('.turned-cards-div').innerHTML += `${card.target.id}`;
            points += Number(card.target.parentNode.id);

            turnedCards.push(card.target.parentNode);
            // if (Number(card.target.parentNode.id) > 0) {
            //     card.target.classList.add("positive")
            // }
            let newWidth = currentWidth + points;
            document.querySelector('.meter-progress').style.width = `${newWidth}px`; // adding point to the width of the bar
            // console.log(`${card.target.parentNode.name}`)
            if (Number(card.target.parentNode.id) < 0) {
                currentStreak = 0;
                document.querySelector('.streak-nr').innerHTML = 0;
            } else {currentStreak = currentStreak + 1;
                document.querySelector('.streak-nr').innerHTML = `${currentStreak}`;}

            if (Number(card.target.parentNode.id) < 300) {
                document.querySelector('#emoji').innerText = '🙂'
            }
            if (turnedCards.length === 12) {   // if all cards were turned
                setTimeout(() => {
                    // alert('all cards turned');
                    document.querySelector('.game-over').style.visibility = 'visible';
                    document.querySelector('.ok-gif').style.visibility = 'visible';
                }, 500);
            }

            if (newWidth >= 500) {   // if bar gets full
                setTimeout(() => {
                    newWidth = 500;
                    document.querySelector('.game-over').style.visibility = 'visible';
                    document.querySelector('.happy-gif').style.visibility = 'visible';
                }, 500);
            }

            if (newWidth < 0) {   // if bar get empty
                document.querySelector('.meter-progress').style.visibility = 'hidden';
                document.querySelector('.streak-nr').innerHTML = `0`;
                // document.querySelector('.cards-div').innerHTML = `the dog died of sadness 😭😭😭😭😭😭` // kk arrumar isso aqui, uma tela na frente com .gif?

                setTimeout(() => {
                    document.querySelector('.game-over').style.visibility = 'visible';
                    document.querySelector('.sad-gif').style.visibility = 'visible';
                    document.querySelector('footer div p').innerText = '😭'
                }, 500)
            }

            card.target.parentNode.classList.add("noclick") // only clickable once 
            
        });
      });

    //   document.querySelector('.streak-nr').innerHTML = `AYOOOOO`;



   




    $('footer div p').on('click', () => {
        console.log('ioooo');
        location.reload();
    })

  })