/*
jacknet.js

This file contains all code relating to jacknet and will manipulate the DOM in index.html accordingly
*/

// buildingData is a list of dictionaries containing buildings on campus and the rooms within that are being maintained/monitored by CTS
import data from './campus.json' with { type: "json" };
const buildingData = data.buildingData;
console.log(buildingData);

// SETTING THE HTML DOM
export function setJackNet() {
    console.log('Switching to jacknet');
    let progGuts = document.querySelector('.program_board .program_guts');
    let main_container = document.createElement('div');
    main_container.innerHTML = '<p>hello world - jacknet</p>';

    // Make a box for list of buildings
    /* 
    POSSIBLE HTML TAGS
        select
        optgroup (Zone 1...)
        option
        label
        dt      
    */
    // UNcomment this if the fieldset supremecy mindset sucks
    let buildingSelect = document.createElement('select');
    buildingSelect.classList.add('building_List');
    let option = document.createElement('option');
    option.innerHTML = 'All Buildings';
    buildingSelect.appendChild(option);
    // NOT GONNA WORK FOR LOOP - THIS WAS TO POPULATE DROPDOWN w/ JSON
    let bl = getBuildingList();
    console.log(bl);
    for(var i in bl) {
        let option = document.createElement('option');
        option.innerHTML = bl[i];
        buildingSelect.appendChild(option);
    };
    // let buildingSelect = document.createElement("fieldset");
    // buildingSelect.classList.add('buildingList');
    // buildingSelect.innerHTML = '<legend>Choose Buildings/Zones: </legend> \n <input type ="checkbox" id="eb" name="sOpt1" value="everyBuilding" /> \n <label for="eb"> Every Building </label><br> \n <input type ="checkbox" id="z1" name="sOpt2" value="Zone1" /> \n <label for="z1">Zone 1</label><br> \n <input type ="checkbox" id="z2" name="sOp3" value="Zone 3" /> \n <label for="z2">Zone 2</label><br> \n <input type ="checkbox" id="z3" name="sOp4" value="Zone 3" /> \n <label for="z3">Zone 3</label><br>\n';

    // make options for touch panel, proc, etc
    /*
    POSSIBLE HTML TAGS
        label
        legend
    */
    let devSelect = document.createElement("fieldset");
    devSelect.classList.add('devSelect');
    devSelect.innerHTML = '<legend>Choose Devices to Search For: </legend> \n <input type ="checkbox" id="procs" name="dev1" value="Processors" /> \n <label for="procs"> Processors </label><br> \n <input type ="checkbox" id="proj" name="dev2" value="Projectors" /> \n <label for="proj">Projectors</label><br> \n <input type ="checkbox" id="wys" name="dev3" value="Wyo Share" /> \n <label for="wys">Wyo Shares</label><br> \n <input type ="checkbox" id="tp" name="dev4" value="Touch Panels" /> \n <label for="tp">Touch Panels</label><br>\n';

    // log progress (use tag progress)

    // Console Output
    let consoleOutput = document.createElement("fieldset");
    consoleOutput.classList.add('consoleOutput');
    consoleOutput.innerHTML = '<legend> Console Output: </legend> \n <textarea readonly rows="10" cols ="80" class="innerConsole" name="consoleOutput" spellcheck="false"> Console: Example </textarea>';

    // Bottom Menu buttons
    // html options: menu
    let bottomMenu = document.createElement("fieldset");
    bottomMenu.classList.add('bottomMenu');
    bottomMenu.innerHTML = '<legend>Options: </legend> \n <menu> \n <button id="run" onclick="module.runSearch()">Run Search</button> \n <button id="export">Export as .csv </button> \n <button id="clearCon" onclick="module.clearConsole()"> Clear Console </button> \n </menu>';

    // PUT EVERYTHING TOGETHER MAIN_CONTAINER
    main_container.appendChild(buildingSelect);
    main_container.appendChild(devSelect);
    main_container.appendChild(consoleOutput);
    main_container.appendChild(bottomMenu);
    main_container.classList.add('program_guts');
    //p.appendChild(select)
    progGuts.replaceWith(main_container);
    return;
  };

// Tied to 'Clear Console' button, clears the console
export function clearConsole() {
    let consoleObj = document.querySelector('.innerConsole');
    consoleObj.value = '';
    return;
};

// updates the console by appending an item of text to contents
function updateConsole(text) {
    let consoleObj = document.querySelector('.innerConsole');
    const beforeText = consoleObj.value.substring(0, consoleObj.value.length);
    consoleObj.value = beforeText + '\n' + text;
    return;
};

// Returns a list of buildings
function getBuildingList() {
    let bl = [];
    for(var i = 0; i < buildingData.length; i++) {
        bl[i] = buildingData[i].name;
    };
    return bl;
};

// Returns a list of rooms given a building name
function getRooms(buildingName) {
    for(var i = 0; i < buildingData.length; i++) {
        if(buildingData[i].name == buildingName) {
            return buildingData[i].Rooms;
        };
    };
};

// Returns a building abbreviation given a building name
function getAbbrev(buildingName) {
    for(var i = 0; i < buildingData.length; i++) {
        if(buildingData[i].name == buildingName) {
            return buildingData[i].abbrev;
        };
    };
};

//TO-DO: generate host names based on rooms/devices selected.
function genHostnames(devices, buildingName) {
    ab = getAbbrev(buildingName);
    rms = getRooms(buildingName);
    hnList = [];
    // go through devices here and generate hostnames
    // ABBREVIATION-####-DEVICE#
    return hnList;
};

// TODO: Ping
function pingThis() {
    return;
};

// TODO: Export findings as csv
function exportCsv() {
    return;
};

// TODO: Main function
// runs the search and calls the above functions to do so.
export function runSearch() {
    updateConsole("Teest");
    return;
};

// DEBUG/testing commands
// let bl = getBuildingList()
// console.log(bl)
// let rooms_test = getRooms(bl[0])
// console.log(rooms_test)