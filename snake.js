
// (function () {

function GameSnake() {
    this.areaRowsLengthX = 10
    this.areaColumnsLengthY = 10
    this.gameContainer = null
    this.scoreContainer = null
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

    this.positionSnakeHead = this.initialPositionSnakeHead 
    this.positionSnakeBody1 = this.initialPositionSnakeBody1
    this.positionSnakeBody2 = this.initialPositionSnakeBody2

    this.rememberTheLastMove = this.initialPosition(-1, 0)

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
    this.eventListeners()
    // this.setInterval(move(rememberTheLastMove.whatRow, rememberTheLastMove.whatColumn), 5000)    //i don't know if it works ?????!!!!
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

    this.area.forEach(areaRow => {
        var row = this.makeRowsforElementsInArea()

        areaRow.forEach(element => {
            var cell = this.makeCellforElementsThatInElementsInArea(element)
            row.appendChild(cell)
        })

        this.gameContainer.appendChild(row)

        console.log(this.gameContainer)   //it work i hope ;) 
    })
}
  
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

    switch (element) {
        case '0':
            return makeCellEmpty();
        case 'H':
            return makeCellHeadSnake()
        case '1':
            return makeCellBodySnake()
        case 'F': 
            return makeCellFood()
    }
}

GameSnake.prototype.addSnakeAndFoodToArea = function () {
    this.area[this.initialPositionSnakeHead.whatRow][this.initialPositionSnakeHead.whatColumn] = 'H'
    this.area[this.initialPositionSnakeBody1.whatRow][this.initialPositionSnakeBody1.whatColumn] = '1'
    this.area[this.initialPositionSnakeBody2.whatRow][this.initialPositionSnakeBody2.whatColumn] = '1'
    this.area[this.initialPositionFood.whatRow][this.initialPositionFood.whatColumn] = 'F'
}

GameSnake.prototype.eventListeners = function() {

    const self = this

    this.container.addEventListener('keydown', function(event){

        switch (event.key) {
            case 'ArrowLeft':
                self.move(0, -1)
                    break

            case 'ArrowUp':
                self.move(-1, 0)
                    break

            case 'ArrowRight':
               self. move(0, 1)
                    break

            case 'ArrowDown':
               self. move(1, 0)
                    break

            default: return 
        }

        event.preventDefault()

    })

}





GameSnake.prototype.move = function(whatRow, whatColumn) {

this.rememberTheLastMove.whatRow = whatRow
this.rememberTheLastMove.whatColumn = whatColumn

// this.positionSnakeBody2.whatRow = whatRow
// this.positionSnakeBody2.whatColumn = whatColumn


return console.log(this.rememberTheLastMove)

this.render()

}




new GameSnake()

// // })()

