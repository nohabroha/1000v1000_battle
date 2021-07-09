// setup two formations of 100 each
let armySize = 1000;
let blueLeftFormation = [];
let blueCenterFormation = [];
let blueRightFormation = [];
let redLeftFormation = [];
let redCenterFormation = [];
let redRightFormation = [];
let blueCasualty = 0;
let redCasualty = 0;
let battleResults = [];
let battleResultsCount = 0;

// creates UI/UX
var oneDiv = document.createElement('div');
var twoDiv = document.createElement('div');
var threeDiv = document.createElement('div');
var fourDiv = document.createElement('div');
var fiveDiv = document.createElement('div');
var sixDiv = document.createElement('div');
var spacer = document.createElement('div');
var spacer2 = document.createElement('div');
oneDiv.id = 'block';
twoDiv.id = 'block2';
threeDiv.id = 'block3';
fourDiv.id = 'block4';
fiveDiv.id = 'block5';
sixDiv.id = 'block6';
spacer.id = 'spacer'
spacer2.id = 'spacer2'
oneDiv.textContent = 'Red Left';
twoDiv.textContent = 'Blue Left';
threeDiv.textContent = 'Red Center';
fourDiv.textContent = 'Blue Center';
fiveDiv.textContent = 'Red Right';
sixDiv.textContent = 'Blue Right';


document.getElementsByTagName('body')[0].appendChild(oneDiv);
document.getElementsByTagName('body')[0].appendChild(twoDiv);
document.getElementsByTagName('body')[0].appendChild(threeDiv);
document.getElementsByTagName('body')[0].appendChild(fourDiv);
document.getElementsByTagName('body')[0].appendChild(fiveDiv);
document.getElementsByTagName('body')[0].appendChild(sixDiv);
document.getElementsByTagName('body')[0].append(spacer);
spacer.style = `height: 350px;`
document.getElementsByTagName('body')[0].append(spacer2);

oneDiv.style = `height: 10%; width: 50%; position: fixed; left: 50%; top: 0px;  background-color: red;`

twoDiv.style = `height: 10%; width: 50%; position: fixed; left: 50%; top: 0px;  background-color: blue; transform: translate(-100%, 0)`

threeDiv.style = `height: 10%; width: 50%; position: fixed; left: 50%; top: 100px;  background-color: red;`

fourDiv.style = `height: 10%; width: 50%; position: fixed; left: 50%; top: 100px;  background-color: blue; transform: translate(-100%, 0)`

fiveDiv.style = `height: 10%; width: 50%; position: fixed; left: 50%; top: 200px;  background-color: red;`

sixDiv.style = `height: 10%; width: 50%; position: fixed; left: 50%; top: 200px;  background-color: blue; transform: translate(-100%, 0)`


// red team kill bar
function moveLeft(id, formation, casualties) {
  var elem = document.getElementById(id);  
  var width = 0;
  var id = setInterval(frame, 25);
  function frame() {
    if (width == formation.length) {
      clearInterval(id);
    } else {
      width = casualties--; 
      elem.style.width = width + 200 + 'px';

    }
  }
}

//blue team kill bar
function moveRight(id, formation, casualties) {
  var elem = document.getElementById(id);   
  var width = 0;
  var id = setInterval(frame, 25);
  function frame() {
    if (width == formation.length) {
      clearInterval(id);
    } else {
      width = casualties--; 
      elem.style.width = width + 200 + 'px'; 
    }
  }
}



// assign power level and health to each unit
createArmy = (formation, color, armySize) => {
  for (let i = 0; i < armySize; i++) {
    formation.push(
      {health: Math.floor(Math.random()*200), power: Math.floor(Math.random()*100), hitChance: Math.random(), unitNumber: i, color: color, casualty: armySize}
    )
  }
}

createArmy(blueLeftFormation, "Blue", armySize);
createArmy(blueCenterFormation, "Blue", armySize);
createArmy(blueRightFormation, "Blue", armySize);
createArmy(redLeftFormation, "Red", armySize);
createArmy(redCenterFormation, "Red", armySize);
createArmy(redRightFormation, "Red", armySize);


// fight takes the formations and uses a find() search to locate living units. Then runs a target number of times. 

fight = (formation1, formation2, runTimes) => {
  for (let g = 0; g < runTimes; g++) {
    if (formation1.length > 0 && formation2.length > 0) {
      let fighterLocator1 = formation1.find( ({health}) => health > 0);
      let fighterLocator2 = formation2.find( ({health}) => health > 0);
      if (fighterLocator1 === undefined && fighterLocator2 === undefined) {
        console.log("Both Sides suffered deep losses and neither can claim victory.");
        break;
      } else if (fighterLocator1 === undefined) {
        console.log("Red team takes the day. Blue Team Loses");
        return false;
        break;
      } else if (fighterLocator2 === undefined) {
        console.log ("Blue team takes the day. Red Team Loses");
        return true;
        break;
      } else {
        fightCalc (fighterLocator1, fighterLocator2, formation1, formation2);
        
      }
    }
  }
  console.log(`The battle was hard fought my liege. The battle was ferocious but at the end of the day the ${formation2[0].color} Army lost ${redCasualty} men while our Army lost ${blueCasualty}.`);
}



// determines outcome of the fight. Takes 4 inputs. 1 & 2) fighters with greater than 0 health. 3 & 4) formation info to get totals.    
fightCalc = (fighter1, fighter2, formation1, formation2) => {
  if (fighter2.hitChance > Math.random()) {
    fighter1.health = fighter1.health - fighter2.power;
    console.log(`${fighter1.color} fighter ${fighter1.unitNumber} took ${fighter2.power} damage from ${fighter2.color} ${fighter2.unitNumber}. ${fighter1.health} health remaining.`);
    if (fighter1.health <= 0) {
      console.log(`${fighter1.color} Unit #${fighter1.unitNumber} is dead. Took ${fighter2.power} damage`);
      blueCasualty++;
      formation1[0].casualty--;
      console.log(`${blueCasualty} ${formation1[0].color} fighters have died...`);
    }
  }
  if (fighter1.hitChance > Math.random()){
    fighter2.health = fighter2.health - fighter1.power;
    console.log(`${fighter2.color} fighter ${fighter2.unitNumber} took ${fighter1.power} damage from ${fighter1.color} ${fighter1.unitNumber}. ${fighter2.health} health remaining.`);
    if (fighter2.health <= 0) {
      console.log(`${fighter2.color} Unit #${fighter2.unitNumber} is dead. Took ${fighter1.power} damage`);
      redCasualty++;
      formation2[0].casualty--;
      console.log(`${redCasualty} ${formation2[0].color} fighters have died...`);
    }
  }
}




// runs battles on left, center, and right. Logs results and final # of soldiers winner killed. 

battleResults.push(`Red fields ${(redLeftFormation.length + redCenterFormation.length + redRightFormation.length)} Soldiers`);
battleResults.push(`Blue fields ${(blueLeftFormation.length + blueCenterFormation.length + blueRightFormation.length)} Soldiers`);
battleResults.push(`The battle rages on...`);
battleResults.push(`Night settles in...`);

if (fight(blueLeftFormation, redLeftFormation, armySize*25) === false) {
  battleResults.push(`Red won the battle on the Left`);
  battleResultsCount++;
} else {
  battleResults.push(`Blue won the battle on the Left`);

}

if (fight(blueCenterFormation, redCenterFormation, armySize*25) === false) {
  battleResults.push(`Red won the battle in the Center`);
  battleResultsCount++;
} else {
  battleResults.push(`Blue won the battle on the Center`);

}

if (fight(blueRightFormation, redRightFormation, armySize*25) === false) {
  battleResults.push(`Red won the battle on the Right`);
  battleResultsCount++;
} else {
  battleResults.push(`Blue won the battle on the Right`);
}


if (battleResultsCount >= 2 ) {
  battleResults.push(`Red killed ${blueCasualty} soldiers.`);
  battleResults.push(`Blue killed ${redCasualty} soldiers.`);
} else {
  battleResults.push(`Red killed ${blueCasualty} soldiers.`);
  battleResults.push(`Blue killed ${redCasualty} soldiers.`);
}

console.log(battleResults);

moveLeft("block", redLeftFormation, redLeftFormation[0].casualty);
moveRight("block2", blueLeftFormation, blueLeftFormation[0].casualty);

moveLeft("block3", redCenterFormation, redCenterFormation[0].casualty);
moveRight("block4", blueCenterFormation, blueCenterFormation[0].casualty);

moveLeft("block5", redRightFormation, redRightFormation[0].casualty);
moveRight("block6", blueRightFormation, blueRightFormation[0].casualty);

var finalStatus = document.createElement('div');

finalStatus.id = 'final';

finalStatus.textContent = battleResults;

document.getElementById('spacer2').append(finalStatus);
