 class Board {
     constructor(cards) {
         this.cards = cards;
     }
     shuffleCards() {
         if (!this.cards) return undefined;
         let arrayLength = this.cards.length;
         let randomElement;
         let lastElement;
         while (arrayLength) { // while there are remaining elements to shuffle…
             randomElement = Math.floor(Math.random() * arrayLength--); // pick a remaining element
             lastElement = this.cards[arrayLength]; // and swap it with the current element that's being iterated over
             this.cards[arrayLength] = this.cards[randomElement];
             this.cards[randomElement] = lastElement;
         }
     }
 }

 const cardsDog = [{
         name: 'squirrel',
         img: '/squirrel.svg',
         points: 150,
         msg: `<li class='up'>SQUIRREL!</li> `
     },
     {
         name: 'fireworks',
         img: '/fireworks.svg',
         points: -100,
         msg: `<li class='down'>Fireworks suck big time!</li> `
     },
     {
         name: 'vet',
         img: '/vet.svg',
         points: -30,
         msg: `<li class='down'>Time for a vet check-up!</li> `
     },
     {
         name: 'shoes',
         img: '/shoes.svg',
         points: 100,
         msg: `<li class='up'>An old shoe! Delicious.</li> `
     },
     {
         name: 'vacuum',
         img: '/vacuum.svg',
         points: -50,
         msg: `<li class='down'>Evil snake...</li> `
     },
     {
         name: 'bird',
         img: '/bird.svg',
         points: 50,
         msg: `<li class='up'>Is that a... BIRB!</li> `
     },
     {
         name: 'petshop',
         img: '/petshop.svg',
         points: 50,
         msg: `<li class='up'>Woo hoo a trip to the pet shop!</li> `
     },
     {
         name: 'bath',
         img: '/bath.svg',
         points: -30,
         msg: `<li class='down'>Oh no, bath time!</li> `
     },
     {
         name: 'toys',
         img: '/toys.svg',
         points: 100,
         msg: `<li class='up'>Life is great when you have toys!</li> `
     },
     {
         name: 'cat',
         img: '/cat.svg',
         points: -70,
         msg: `<li class='up'>Mr. Whiskers is an asshole!</li> `
     },
     {
         name: 'trash',
         img: '/trash.svg',
         points: 80,
         msg: `<li class='up'>Trash yay.</li> `
     },
     {
         name: 'post',
         img: '/post.svg',
         points: 30,
         msg: `<li class='up'>Postman time!</li> `
     },
 ];

 let board = new Board(cardsDog);
 board.shuffleCards();

 let points = 0;
 let currentWidth = 150;
 let currentStreak = 0;
 let turnedCards = [];

 document.querySelector('button').onclick = () => {
     document.querySelector('.start').classList.add('gameFade')
     setTimeout(() => {
         document.querySelector('.start').style.visibility = 'hidden';
         document.querySelector('button').style.visibility = 'hidden';
     }, 1000)

 }

 let html = '';
 board.cards.forEach(pic => {
     html += `<div class="card" id="${pic.points}">
                  <div class="back" id="${pic.msg}"></div>
                  <div class="front" style="background-image: url(img/${pic.img}) "></div>
               </div>`
 });

 document.querySelector('.cards-div').innerHTML = html;

 document.querySelectorAll('.card').forEach(card => {
     card.addEventListener('click', (card) => {

         card.target.parentNode.classList.add("turned"); // vira o card que o loop ta iterando sobre
         card.target.style.backgroundColor = '#fff'; // fade in do bgcolor

         turnedCards.push(card.target.parentNode); // contando o numero de cards virados

         document.querySelector('.turned-cards-div').innerHTML += `${card.target.id}`; // ação na coluna da dir

         points += Number(card.target.parentNode.id); // declarando q points é baseado no id do card
         let newWidth = currentWidth + points;
         document.querySelector('.meter-progress').style.width = `${newWidth}px`; // adicionando points to the width of the bar

         if (Number(card.target.parentNode.id) < 0) {
             currentStreak = 0;
             document.querySelector('.streak-nr').innerHTML = 0;
         } else {
             currentStreak = currentStreak + 1;
             document.querySelector('.streak-nr').innerHTML = `${currentStreak}`;
         }

         if (Number(card.target.parentNode.id) < 0) {
             document.querySelector('#emoji').innerText = '💔'
         } else {
             document.querySelector('#emoji').innerText = '💕'
         }

         if (turnedCards.length === 12 && newWidth < 500) { // if all cards were turned
             setTimeout(() => {
                 // alert('all cards turned');
                 document.querySelector('.game-over').style.visibility = 'visible';
                 document.querySelector('.ok-gif').style.visibility = 'visible';
                 document.querySelector('.ok-gif').innerHTML = 
                    `<h2>Almost there...</h2>
                    <img src="img/gameover_almost.gif" alt="OK PUPPY" />
                    <p class="gameOverTxt">But Bobby's just bamboozled now. <br>Not so helpful, you.</p>`
             }, 500);
         }

         if (newWidth > 0 && newWidth <= 150) { // if bar get empty
             document.querySelector('.meter-progress').innerHTML = '😧'
         } else if (newWidth > 150 && newWidth <= 250) {
             document.querySelector('.meter-progress').innerHTML = '😐'
         } else if (newWidth > 250 && newWidth <= 350) {
             document.querySelector('.meter-progress').innerHTML = '😊'
         } else if (newWidth > 350 && newWidth <= 550) {
             document.querySelector('.meter-progress').innerHTML = '🥰'
         }


         if (newWidth >= 550) { // if bar gets full
             document.querySelector('.meter-progress').style.width = '550px';
             setTimeout(() => {
                 document.querySelector('.game-over').style.visibility = 'visible';
                 document.querySelector('.happy-gif').style.visibility = 'visible';
                 document.querySelector('.happy-gif').innerHTML = 
                    `<h2>GOOD JOB! We have a happy Bobby!</h2>
                    <img src="img/gameover_happy.gif" alt="SAD PUPPY" />
                    <p class="gameOverTxt">You're such a good, good human! Oh yes, you are!</p>`
             }, 500);
         }

         if (newWidth < 0) { // if bar get empty
             document.querySelector('.meter-progress').style.width = '0px';
             document.querySelector('.meter-progress').innerHTML = '😭'
             document.querySelector('.streak-nr').innerHTML = `0`;

             setTimeout(() => {
                 document.querySelector('.game-over').style.visibility = 'visible';
                 document.querySelector('.sad-gif').style.visibility = 'visible';
                 document.querySelector('.sad-gif').innerHTML = 
                    `<h2>Oh no. You made Bobby extra sad.</h2> 
                    <img src="img/gameover_sad.gif" alt="SAD PUPPY" />
                    <p class="gameOverTxt">Why do you hate Bobby so much?</p>`
             }, 500)
         }

         card.target.parentNode.classList.add("noclick") // only clickable once 

     });
 });

 document.querySelector('footer div p').onclick = () => {
     location.reload();
 }