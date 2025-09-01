var row = 5;
var columns = 5;

var currTile; //the refrences tile that we are to place at the board
var otherTile; //the tile that we are replacing with

var turns = 0;

//after loading the window
window.onload = function(){

    //display the boardn 5x5
    for(let r = 0; r < row; r++){
        for(let c = 0; c < columns; c++){
            //create a img tag to populat the images
            let tile = document.createElement("img");
            tile.src = "images/blank.jpg";

            // some drag functionality to process the game
            tile.addEventListener("dragstart", dragStart); //click on image to drag
            tile.addEventListener("dragover", dragOver); //dragging the selected element
            tile.addEventListener("dragenter", dragEnter); //dragging an image into another one
            tile.addEventListener("dragleave", dragLeave); //dragging an image from another one
            tile.addEventListener("drop", dragDrop); //drop an image onto another one
            tile.addEventListener("dragend", dragEnd); //after you completed dragdrop

            document.getElementById("board").append(tile);
        }
    }

    // now for the pieces
    let pieces = [];
    for(let i = 1; i <= row * columns; i++){
        pieces.push(i.toString()); //since its puzzel image names
    }

    // to suffle the images
    pieces.reverse();
    for(let i = 0; i < pieces.length; i++){
        // randomly generate a number and after swap it with the pieces array so it would be suffled more
        let j = Math.floor(Math.random() * pieces.length);

        // swapping
        let temp = pieces[i];
        pieces[i] = pieces[j];
        pieces[j] = temp;
    }
    //populate to ui
    for(let i = 0; i < pieces.length; i++){
        let tile = document.createElement("img");
        tile.src = "images/" + pieces[i] + ".jpg";

        // some drag functionality to process the game
        tile.addEventListener("dragstart", dragStart); //click on image to drag
        tile.addEventListener("dragover", dragOver); //dragging the selected element
        tile.addEventListener("dragenter", dragEnter); //dragging an image into another one
        tile.addEventListener("dragleave", dragLeave); //dragging an image from another one
        tile.addEventListener("drop", dragDrop); //drop an image onto another one
        tile.addEventListener("dragend", dragEnd); //after you completed dragdrop
        
        document.getElementById("pieces").append(tile);
    }

}

// drag tile 
function dragStart(){
    currTile = this; //this refers to the image that is clicked
}
function dragOver(e){
    e.preventDefault();
}
function dragEnter(e){
    e.preventDefault();
}
function dragLeave(){
    
}
function dragDrop(){
    otherTile = this; //this refers to the image that is droped on
}
function dragEnd(){
    // since we do not want to do anything with white image so 
    if(currTile.src.includes("blank")){
        return;
    }
    //swap the  images
    let currImg = currTile.src;
    let otherImg = otherTile.src;
    currTile.src = otherImg;
    otherTile.src = currImg;

    turns += 1;
    document.getElementById("turns").innerText = turns;
}
