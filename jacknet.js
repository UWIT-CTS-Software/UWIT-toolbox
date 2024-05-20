/*
jacknet.js

This file contains all code relating to jacknet and will manipulate the DOM in index.html accordingly
*/

function setJackNet() {
    console.log('Switching to jacknet')
    let progGuts = document.querySelector('.program_board .program_guts')
    let p = document.createElement('p')
    p.innerHTML = 'hello world - jacknet'
    p.classList.add('program_guts')
    progGuts.replaceWith(p)
    return
  }
