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
         points: 10,
         msg: `<li class='up'>SQUIRREL!</li> `
     },
     {
         name: 'fireworks',
         img: '/fireworks.svg',
         points: -100,
         msg: `<li class='down'>noooo fireworks suck</li> `
     },
     {
         name: 'vet',
         img: '/vet.svg',
         points: -100,
         msg: `<li class='down'>vet time</li> `
     },
     {
         name: 'shoes',
         img: '/shoes.svg',
         points: 100,
         msg: `<li class='up'>an old shoe! hmmmm delicous</li> `
     },
     {
         name: 'fireworks',
         img: '/fireworks.svg',
         points: -100,
         msg: `<li class='down'>noooo fireworks suck</li> `
     },
     {
         name: 'bird',
         img: '/bird.svg',
         points: 100,
         msg: `<li class='up'>LOOK, BIRB!</li> `
     },
     {
         name: 'petshop',
         img: '/petshop.svg',
         points: 100,
         msg: `<li class='up'>trip to the petshop</li> `
     },
     {
         name: 'bath',
         img: '/bath.svg',
         points: -100,
         msg: `<li class='down'>oh no bath time</li> `
     },
     {
         name: 'toys',
         img: '/toys.svg',
         points: 10,
         msg: `<li class='up'>toys! life is great!</li> `
     },
     {
         name: 'cat',
         img: '/cat.svg',
         points: 10,
         msg: `<li class='up'>mr. whiskers. he's an asshole</li> `
     },
     {
         name: 'squirrel',
         img: '/squirrel.svg',
         points: 100,
         msg: `<li class='up'>saw a squirrel uhu</li> `
     },
     {
         name: 'squirrel',
         img: '/squirrel.svg',
         points: 100,
         msg: `<li class='up'>saw a squirrel uhu</li> `
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

 $('.cards-div').html(html);

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
                 document.querySelector('.ok-gif').innerHTML = `<h2>Now Bobby is confused...<br> AND still not amused.</h2>
                    <img src="https://media.giphy.com/media/1yiNv0xauBg8SHLAJT/giphy.gif" alt="OK PUPPY" />
                    <p class="gameOverTxt">Not so helpful, you.</p>`
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
                 document.querySelector('.happy-gif').innerHTML = `<h2>WOO HOO.<br>You've made Bobby happy!</h2>
                    <img src="https://media.giphy.com/media/3ndAvMC5LFPNMCzq7m/giphy.gif" alt="SAD PUPPY" />
                    <p class="gameOverTxt">Such a good, good human!</p>`
             }, 500);
         }

         if (newWidth < 0) { // if bar get empty
            document.querySelector('.meter-progress').style.width = '0px';
            document.querySelector('.meter-progress').innerHTML = '😭'
             document.querySelector('.streak-nr').innerHTML = `0`;

             setTimeout(() => {
                 document.querySelector('.game-over').style.visibility = 'visible';
                 document.querySelector('.sad-gif').style.visibility = 'visible';
                 document.querySelector('.sad-gif').innerHTML = `<h2>OH NO.<br>Bobby got extra sad.</h2> 
                    <img src="https://media.giphy.com/media/gFcIhCZWKaCy78bS4s/giphy.gif" alt="SAD PUPPY" />
                    <p class="gameOverTxt">Do you hate dogs or something?</p>`
             }, 500)
         }

         card.target.parentNode.classList.add("noclick") // only clickable once 

     });
 });

 document.querySelector('footer div p').onclick = () => {
     location.reload();
 }