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
    // TO-DO: add zone options here
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

    // REDO: what flags for checkbox are neccessary?
    //   - do we need value and name?
    let devSelect = document.createElement("fieldset");
    devSelect.classList.add('devSelect');
    devSelect.innerHTML = '<legend>Choose Devices to Search For: </legend> \n <input type ="checkbox" id="procs" name="dev" value="PROC" /> \n <label for="procs"> Processors </label><br> \n <input type="checkbox" id="proj" name="dev" value="PROJ" /> \n <label for="proj">Projectors</label><br> \n <input type="checkbox" id="wys" name="dev" value="WS" /> \n <label for="wys">Wyo Shares</label><br> \n <input type="checkbox" id="tp" name="dev" value="TP" /> \n <label for="tp">Touch Panels</label><br>\n';

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

// - -- - -- - - - CONSOLE FUNCTIONS
// Tied to 'Clear Console' button, clears the console
export function clearConsole() {
    let consoleObj = document.querySelector('.innerConsole');
    consoleObj.value = '';
    return;
};

// updates the console by appending an item of text to contents
// TODO: Move the slider to make the last line visible
function updateConsole(text) {
    let consoleObj = document.querySelector('.innerConsole');
    const beforeText = consoleObj.value.substring(0, consoleObj.value.length);
    consoleObj.value = beforeText + '\n' + text;
    consoleObj.scrollTop = consoleObj.scrollHeight;
    return;
};

// - - -- ----- - - CMAPUS.JSON GET INFO FUNCTIONS
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

// ---- ---- -- -- -  GET USER CONFIG FUNCTIONS
// TO-DO: return list of checked devices
function getSelectedDevices() {
    let devices = document.getElementsByName('dev');
    let devList = [];
    for (var i = 0; i < devices.length; ++i) {
        if(devices[i].checked) {
            devList.push(devices[i].value);
        };
    };
    return devList;
}

// TO-DO: return the selected option in the dropdown menu for buildings/zones
function getBuildingSelection() {
    let select = document.querySelector('.building_List');
    return select.value;
}

// Super cool padding function i took of stackoverflow and i want to understand it
function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }

// - - ---- -- - ---- PING FUNCTIONS
function genHostnames(devices, buildingName) {
    let ab = getAbbrev(buildingName);
    let rms = getRooms(buildingName);
    let hnList = [];
    // go through devices here and generate hostnames
    // ABBREVIATION-####-DEVICE#
    for(var i = 0; i < rms.length; ++i) {
        for(var j = 0; j < devices.length; ++j) {
            hnList.push(ab + '-' + pad(rms[i], 4) + '-' + devices[j] + '1');
        }
    }
    return hnList;
};

// TODO: Ping
// will likely need to be asyncronous and need to timeout very fast
function pingThis(hostname) {
    return;
};

// - ---- ----- - - - EXPORT FUNCTIONS
// TODO: Export findings as csv
function exportCsv() {
    return;
};

// TODO: Main function
// Needs to be asyncronyous
// runs the search and calls the above functions to do so.
export function runSearch() {
    updateConsole("====--------------------========--------------------====");
    const devices = getSelectedDevices();
    const building = getBuildingSelection();
    let hostnames = []
    let packBuild = false;
    let totalNumDevices = 0;
    updateConsole("Selected Devices: " + devices);
    // When the time comes do something simular for zones
    if (building == "All Buildings") {
        packBuild = true;
        let buildingList = getBuildingList();
        updateConsole("Selected Buildings: " + buildingList);
        // iterate through each building and create hostnames for each and ping
        for(var i=0; i < buildingList.length; ++i) {
            let newHosts = genHostnames(devices, buildingList[i])
            totalNumDevices += newHosts.length;
            hostnames.push(newHosts);
        }
        //updateConsole(hostnames);
        //console.log(hostnames)
    }
    else {
        updateConsole("Selected Building: " + building);
        // generate hostnames
        hostnames = genHostnames(devices, building);
        totalNumDevices = hostnames.length;
        //updateConsole(hostnames);
    }
    updateConsole("Searching for " + totalNumDevices + " devices.");
    // build progress bar here ?

    // Check if the pack of building flag is raised (all buildings/zone selection) and then ping every generated hostname
    if(packBuild) {
        for(var i = 0; i < hostnames.length; ++i) {
            for(var j = 0; j < hostnames[i].length; ++j) {
                //updateConsole(hostnames[i][j]);
                pingThis(hostnames[i][j])
            }
        }
    }
    else {
        for(var i = 0; i < hostnames.length; ++i) {
            //updateConsole(hostnames[i]);
            pingThis(hostnames[i]);
        }
    }
    return;
};

// DEBUG/testing commands
// let bl = getBuildingList()
// console.log(bl)
// let rooms_test = getRooms(bl[0])
// console.log(rooms_test)