// let boxes = document.querySelectorAll(".box");
// let reset = document.querySelector("reset");

// let playero = true;
//  const patterns = [
//      [0,1,2],
//      [3,4,5],
//      [6,7,8],
//      [0,3,6],
//      [1,4,7],
//      [2,5,8],
//      [0,4,8],
//      [2,4,6]
//  ];

//  boxes.forEach((box) => {
//     box.addEventListener("click", () => {
//         if(playero){
            
//             box.innerText = "O";
//             playero= false;
//         }
//         else{
//             box.innerText = "X";
//             playero= true;

//         }
//         box.disabled = true;
//         checker();
        
//     });
//  });



 

//  const checker = () => {
//     for ( let pattern of patterns) {
     
//         let pos1 = boxes[pattern[0]].innerText;
//         let pos2 = boxes[pattern[1]].innerText;
//         let pos3 = boxes[pattern[2]].innerText;
//         if (pos1 !== "" && pos2 !=="" && pos3!==""){
//             if(pos1===pos2 && pos2===pos3){
//                 console.log("win", pos1);
             
//             }
//         }
//     }
//  };

//  let boxes = document.querySelectorAll(".box");
// let reset = document.querySelector("#reset");

// let playero = true;

// const patterns = [
//   [0,1,2], [3,4,5], [6,7,8],  // Rows
//   [0,3,6], [1,4,7], [2,5,8],  // Columns
//   [0,4,8], [2,4,6]            // Diagonals
// ];

// // Click handler for each box
// boxes.forEach((box) => {
//   box.addEventListener("click", () => {
//     if (box.innerText !== "") return; // Already clicked

//     box.innerText = playero ? "O" : "X";
//     box.classList.add("clicked");
//     playero = !playero;

//     checker();
//   });
// });

// // Check for a win
// const checker = () => {
//   for (let pattern of patterns) {
//     let [a, b, c] = pattern;
//     let val1 = boxes[a].innerText;
//     let val2 = boxes[b].innerText;
//     let val3 = boxes[c].innerText;

//     if (val1 !== "" && val1 === val2 && val2 === val3) {
//       // Win detected
//       alert(`Player ${val1} wins!`);
//       disableAll();
//       return;
//     }
//   }

//   // Optional: Check for draw
//   if ([...boxes].every(box => box.innerText !== "")) {
//     alert("It's a draw!");
//   }
// };

// // Disable all boxes after win
// const disableAll = () => {
//   boxes.forEach(box => box.classList.add("clicked"));
// };

// // Reset functionality
// reset.addEventListener("click", () => {
//   boxes.forEach(box => {
//     box.innerText = "";
//     box.classList.remove("clicked");
//   });
//   playero = true;
// });



let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset");
let newGameBtn = document.querySelector(".new");

let playero = true; // true = O, false = X

const patterns = [
  [0,1,2], [3,4,5], [6,7,8],  // Rows
  [0,3,6], [1,4,7], [2,5,8],  // Columns
  [0,4,8], [2,4,6]            // Diagonals
];

// Box click handler
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.innerText !== "") return;

    box.innerText = playero ? "O" : "X";
    box.classList.add("clicked");
    playero = !playero;

    checker();
  });
});

// Check for winner
const checker = () => {
  for (let pattern of patterns) {
    let [a, b, c] = pattern;
    let val1 = boxes[a].innerText;
    let val2 = boxes[b].innerText;
    let val3 = boxes[c].innerText;

    if (val1 !== "" && val1 === val2 && val2 === val3) {
      alert(`Player ${val1} wins!`);
      disableAll();
      
      return;
    }
  }

  // Check for draw
  if ([...boxes].every(box => box.innerText !== "")) {
    alert("It's a draw!");
    clearBoard();
  }
};

// Disable all boxes after win
const disableAll = () => {
  boxes.forEach(box => box.classList.add("clicked"));
};

// Clear the board (used in both reset and new game)
const clearBoard = () => {
  boxes.forEach(box => {
    box.innerText = "";
    box.classList.remove("clicked");
  });
};

// Reset button — keeps the current turn
resetBtn.addEventListener("click", () => {
  clearBoard();
});

// New Game button — resets turn to Player O
newGameBtn.addEventListener("click", () => {
  clearBoard();
  playero = true; // Player O always starts
});
