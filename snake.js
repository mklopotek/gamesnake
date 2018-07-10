
(function () {

//"GLOBAL" VARIABLES

    //this two variable are the number of rows (areaLengthX) and the number of columns (areaLenghtY)
    var areaRowsLengthX = 10
    var areaColumnsLengthY = 10

    var gameContainer
    var scoreContainer
    var timeContainer

    //here we declaared that when we call initialArea it call the function createClearArea and give her a two variable -areaRowsLenghtX and areaColumnsLenghtY 
    var initialArea = createClearArea(areaRowsLengthX, areaColumnsLengthY)

    console.log(initialArea) //it works

    var clearArea = JSON.parse(JSON.stringify(initialArea))

    console.log(clearArea)                   //it works
    console.log(initialArea !== clearArea)   //it works because it says: true! (so it copy a old area but without references!!!! (changing area not changing a initialArea))


    class initialPosition {
        constructor(whatRow, whatColumn) {
            this.whatRow = whatRow;
            this.whatColumn = whatColumn;
        }
    }

    var initialPositionSnakeHead = new initialPosition(6,6)
    var initialPositionSnakeBody1 = new initialPosition(7,6)
    var initialPositionSnakeBody2 = new initialPosition(8,6)
    var initialPositionFood = new initialPosition(3,3)

    console.log(initialPositionSnakeHead)

    var foodPosition

    var time
    var score 

    var gameInterval 

    //this function create clear area

    function createClearArea(areaRowsLengthX, areaColumnsLengthY){
        return Array(areaRowsLengthX).fill(0).map(function(element, index, array){
            return Array(areaColumnsLengthY).fill(0)
        })
    }

    console.log(createClearArea(12,3))     //it works

    function init(container) {
        prepareLayout(container)
        // this function should be called when we want to init game
        // it accepts 1 argument - dom node of the container
        // where game should be rendered, eg it can be body of document
        // this function should render first frame of game and set all
        // of the variables like time to game end that werent predefinied
    } 
    
    function prepareLayout(container) {

        gameContainer = document.createElement('div')
        scoreContainer = document.createElement('div')
        timeContainer = document.createElement('div')
        container.appendChild(scoreContainer)
        container.appendChild(timeContainer)
        container.appendChild(gameContainer)
    }


    //this function will be transform the table from js to HTML 
    function render() {

    gameContainer.innerHTML = ''

    




    }


    console.log(render)     //




    function addToAreaSnakeAndFood () {

        clearArea = JSON.parse(JSON.stringify(initialArea))    //is this declaration is necessary? this is also in top 

        clearArea[initialPositionSnakeHead.whatRow][initialPositionSnakeHead.whatColumn] = 'H'

        clearArea[initialPositionSnakeBody1.whatRow][initialPositionSnakeBody1.whatColumn] = '1'
        clearArea[initialPositionSnakeBody2.whatRow][initialPositionSnakeBody2.whatColumn] = '1'

        clearArea[initialPositionFood.whatRow][initialPositionFood.whatColumn] = 'F'

    }

    console.log(addToAreaSnakeAndFood())
    console.log(clearArea)   //it works the clear area have changed and added H, F, 1, 1 :) 
















    // here you can put some functions taht renders only parts of the game 
    // and will be used in render function

    // here you will attach all events listeners like oncliks or keydowns
    function attachEventListeners() { }

    // move should be another function called eg. when event is fired
    // it is quite obvious that move bakwards is a move fovard with minus sign ;)
    function move() { }

    // in this fucntion you can do all stuff that needs to be repeated
    // you can invoke this function in an interval
    // you can set that interval in init function
    function gameTick() { }

    // below functions are self-describing ;)
    function incScore() { }
    function displayScore() { }

    function decTime() { }
    function displayTIme() { }

    // invoked when game ends (you can check if time elepsed eg. in gameTick function)
    function endGame() { }

    // HELPERS

    // here put some functions that are not directly itto the game
    // but will help to do some general stuff - like make an array of ...

    // START GAME
    // document.body is an example of the container for the game





    
    init(document.body)
})()