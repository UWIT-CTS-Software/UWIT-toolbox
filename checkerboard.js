/*
checkboard.js

This file contains all code relating to checkboard and will manipulate the DOM in index.html accordingly
*/
function setChecker() {
    console.log('Switching to checkerboard')
    let progGuts = document.querySelector('.program_board .program_guts')

    let main_container = document.createElement('div')
    main_container.classList.add('cb_container')

    let header = document.createElement('p')
    header.classList.add('cb_header')
    header.innerHTML = 'hello world - checkerboard'

    let list_container = document.createElement('div')
    list_container.innerHTML = 'another child'

    let room_list = document.createElement('span')
    room_list.style='float: left'
    room_list.classList.add('cb_contents')
    room_list.innerHTML = 'Test 1 <br>A longer statement'

    let available_list = document.createElement('span')
    available_list.style='float: left'
    available_list.classList.add('cb_contents')
    available_list.innerHTML = 'Test 2 <br>A longer statement'

    list_container.append(room_list, available_list)

    main_container.append(header, list_container)
    progGuts.replaceWith(main_container)
    return
  }
