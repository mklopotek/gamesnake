
// (function () {

//"GLOBAL" VARIABLES
function GameSnake() {
    this.areaRowsLengthX = 10
    this.areaColumnsLengthY = 10

    this.gameContainer = ''
    this.scoreContainer = ''

    //here we declaared that when we call initialArea it call the function createEmptyArea and give her a two variable -areaRowsLenghtX and areaColumnsLenghtY 
    this.initialArea = this.createEmptyArea(this.areaRowsLengthX, this.areaColumnsLengthY)

    // var clearArea = JSON.parse(JSON.stringify(initialArea))  //i dont know yet if there should be a clear, first area or only one area for all
    this.area = JSON.parse(JSON.stringify(this.initialArea))
    // console.log(initialArea !== clearArea)   //it works because it says: true! (so it copy a old area but without references!!!! (changing area not changing a initialArea))

    this.initialPosition = (whatRow, whatColumn) => ({
        whatRow: whatRow,
        whatColumn: whatColumn
    })

    this.initialPositionSnakeHead = this.initialPosition(6, 6)
    this.initialPositionSnakeBody1 = this.initialPosition(7, 6)
    this.initialPositionSnakeBody2 = this.initialPosition(8, 6)
    this.initialPositionFood = this.initialPosition(3, 3)
    this.foodPosition = null
    this.score = null
    this.gameInterval = null
    this.container = document.body


    this.init()
}

GameSnake.prototype.createEmptyArea = function (areaRowsLengthX, areaColumnsLengthY) {
    return Array(areaRowsLengthX).fill('0').map(function (element, index, array) {
        return Array(areaColumnsLengthY).fill('0')
    })
}

GameSnake.prototype.init = function () {
    this.prepareLayout()
    this.addSnakeAndFoodToArea()
    this.render()
}

GameSnake.prototype.prepareLayout = function () {

    function makeGameContainer() {
        gameContainer = document.createElement('div')
        gameContainer.classList.add('game')

        return gameContainer
    }

    this.gameContainer = makeGameContainer()
    this.scoreContainer = document.createElement('div')
    this.container.appendChild(this.scoreContainer)
    this.container.appendChild(this.gameContainer)
}

//this function will be transform the table from js to HTML 
GameSnake.prototype.render = function () {
    this.gameContainer.innerHTML = ''

    this.area.forEach((areaRow, index, array) => {
        var row = this.makeRowsforElementsInArea()

        areaRow.forEach( (element, index, array) => {
            var cell = this.makeCellforElementsThatInElementsInArea(element)
            row.appendChild(cell)
        })

        this.gameContainer.appendChild(row)

        console.log(this.gameContainer)   //it work i hope ;) 
    })
}


// console.log(render())     

GameSnake.prototype.makeRowsforElementsInArea = function () {
    const row = document.createElement('div')
    row.classList.add('game__row')
    return row
}

GameSnake.prototype.makeCellforElementsThatInElementsInArea = function (element) {
    const makeGameElement = (modifier) => () => {
        const el = document.createElement('div')
        el.classList.add('game__cell--' + modifier)
        return el
    }

    const makeCellEmpty = makeGameElement('empty')
    const makeCellHeadSnake = makeGameElement('snake-head')
    const makeCellBodySnake = makeGameElement('snake-body')
    const makeCellFood = makeGameElement('food')

    // @TODO - change if else to switch
    if (element === '0') {
        return makeCellEmpty()
    } else if (element === 'H') {
        return makeCellHeadSnake()
    } else if (element === '1') {
        return makeCellBodySnake()
    } else if (element === 'F') {
        return makeCellFood()
    }
}

GameSnake.prototype.addSnakeAndFoodToArea = function () {
    this.area[this.initialPositionSnakeHead.whatRow][this.initialPositionSnakeHead.whatColumn] = 'H'
    this.area[this.initialPositionSnakeBody1.whatRow][this.initialPositionSnakeBody1.whatColumn] = '1'
    this.area[this.initialPositionSnakeBody2.whatRow][this.initialPositionSnakeBody2.whatColumn] = '1'
    this.area[this.initialPositionFood.whatRow][this.initialPositionFood.whatColumn] = 'F'
}


// // console.log(area)   //it works the clear area have changed and added H, F, 1, 1 :) 

// // here you can put some functions taht renders only parts of the game 
// // and will be used in render function

// // here you will attach all events listeners like oncliks or keydowns
// function attachEventListeners() { }

// // move should be another function called eg. when event is fired
// // it is quite obvious that move bakwards is a move fovard with minus sign ;)
// function move() { }

// // in this fucntion you can do all stuff that needs to be repeated
// // you can invoke this function in an interval
// // you can set that interval in init function
// function gameTick() { }

// // below functions are self-describing ;)
// function incScore() { }
// function displayScore() { }

// function decTime() { }
// function displayTIme() { }

// // invoked when game ends (you can check if time elepsed eg. in gameTick function)
// function endGame() { }

// // HELPERS

// // here put some functions that are not directly itto the game
// // but will help to do some general stuff - like make an array of ...

// // START GAME
// // document.body is an example of the container for the game

// // })()

new GameSnake()