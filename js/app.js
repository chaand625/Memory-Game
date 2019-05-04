// getting all the cards and storing them into allCards array
var allCards
allCards = [];
for (i of document.querySelectorAll('.card')) {
    allCards.push(i);
}

// shuffling the cards
shuffle(allCards);

// recreating the deck with the shuffled allCards
let deck = document.querySelector('.deck');
deck.innerHTML = "";
for (i of allCards) {
    deck.append(i);
}


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


// variable for storing the status of the game 
cardsOpened = 16;
shownCards = [];
moves = 0;
time = 0;
timerStarted = false;
var time_id;

// adding eventListener to the deck 
deck.addEventListener('click', function (eve) {
    if (shownCards.length < 2) {
        var card = eve.target;

        // checking the player clicked on the card 
        if (!card.classList.contains('deck')) {
            if (card.classList.contains('fa'))
                card = card.parentElemnt;

            // checking the player clicks on closed card and not on the prev card
            if (!card.classList.contains('open') && (shownCards.length === 0 || shownCards[0] !== card)) {
                card.classList.toggle('show');
                card.classList.toggle('match');
                shownCards.push(card);

                if (!timerStarted){
                    time_id = setInterval(timer, 1000);
                    timerStarted = true;
                }
            }

        }

        // matching the cards in the shownCards 
        if (shownCards.length === 2) {
            moves++;

            // opening the cards
            if (matched()) {
                for (i in shownCards) {
                    shownCards[i].classList.add('open');
                    shownCards[i].classList.remove('match');
                }
                shownCards = [];
                cardsOpened -= 2;
            } else {
                // closing the cards
                setTimeout(closeCards, 1000);
            }
        }
    }
    // update the moves and ratings
    updateRating();

    // checking if the game  is completeed and alerting the user
    if (!cardsOpened) {

        // stopping the watch 
        clearInterval(time_id);

        // alerting the user after 1sec
        setTimeout(() => {
            // counting the starts
            var noOfStars = document.querySelectorAll('.stars .fa').length;
            var starsHtml = "";

            // adding the stars to html
            while (noOfStars-- > 0) {
                starsHtml += '<i class="fa fa-star"></i>';
            }
            Swal.fire({
                    title: 'You won the game!',
                    html: 'Moves : ' + moves + '<br>' + 'Time : ' + time +  's<br> ' + starsHtml,
                    confirmButtonText: 'Play Again'
                })
                .then(() => {
                    totalReset();
                });

        }, 1000);
    }
})

// matching the cards 
function matched() {
    return shownCards[0].firstElementChild.className === shownCards[1].firstElementChild.className
}

// closing the shownCards
function closeCards() {

    for (i in shownCards) {
        shownCards[i].classList.toggle('show');
        shownCards[i].classList.toggle('match');
    }
    shownCards = [];
}

// update Rating
function updateRating() {
    let stars = document.querySelector('.stars');
    let moves_panel = document.querySelector('.moves');
    moves_panel.innerHTML = moves;

    if (moves > 10 && stars.childElementCount === 3)
        stars.removeChild(stars.firstElementChild);
    else if (moves > 20 && stars.childElementCount === 2)
        stars.removeChild(stars.firstElementChild);
}


// updating the time
function timer () {
    let span_time = document.querySelector('#span_time');
    time += 1;
    span_time.innerHTML = time;
}

// -------------------- Restart button---------------------  

var restart = document.querySelector('.restart');

restart.addEventListener('click', totalReset);

function totalReset() {
    location.reload();
}

