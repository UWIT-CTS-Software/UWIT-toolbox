/*
checkboard.js

This file contains all code relating to checkboard and will manipulate the DOM in index.html accordingly
*/
function setChecker() {
    console.log('Switching to checkerboard')
    let progGuts = document.querySelector('.program_board .program_guts')
    let p = document.createElement('p')
    p.innerHTML = 'hello world - checkerboard'
    p.classList.add('program_guts')
    progGuts.replaceWith(p)
    return
  }
  

  
