//This variable is refrenced multiple times for error checking, rolls, and displaying results. If changed by the user rather than function, the roller will not work...
let lineCount = 1;
//This variable prevents rolls from happening if not zero. Since the request sets this back to zero before checking for errors it is not vulnerable to user change outside of the script
let errorCount = null;
let allTot = null;

let xhibitResult = [];
let xhibitResultSum = [];
let resultHigh = [];
let resultLow = [];
//these variables exist solely so I can change limits easily if I choose to increase them !!IF CHANGED BE SURE TO UPDATE THE PLACEHOLDER TEXT FOR ALL FIVE LINES!!
const sidesMax = 1000;
const rollsMax = 100;
/*originally used to clear any error feedback but is obsolete
function errorClear(){ 
const errorColor =document.querySelectorAll("input");  
const errorReset =document.querySelectorAll(".error-text");
    for(i=0;i<errorReset.length; i++){
 errorReset[i].style.display = "none";
      
    }
    for(c=0;c<errorColor.length; c++){
      errorColor[c].style.background ="";
    }
 }
*/
function addLine() {
  document.getElementById("minus").style.opacity = "1";
  document.getElementById("minus").className="linebutton red";
  if (lineCount == 1) {
    document.getElementById("line1").style.display = "block";
    lineCount += 1;
  } else if (lineCount == 2) {
    document.getElementById("line2").style.display = "block";
    lineCount += 1;
  } else if (lineCount == 3) {
    document.getElementById("line3").style.display = "block";
    lineCount += 1;
  } else if (lineCount == 4) {
    document.getElementById("line4").style.display = "block";
    document.getElementById("plus").style.opacity = ".2";
    document.getElementById("plus").className="linebutton gray";
    lineCount += 1;
  }
}

function removeErrors (line){
      
    const clearSides = document.getElementById("sides"+line);
    const clearRolls = document.getElementById("rolls"+line);
    const clearTextSides = document.getElementById("error-sides"+line);
    const clearTextRolls = document.getElementById("error-rolls"+line);
    const clearSidesIndicator = document.getElementById("esides"+line);
    const clearRollsIndicator = document.getElementById("erolls"+line); 
    clearSides.value = "";
    clearSides.style.background = "";
    clearRolls.style.background = "";
    clearRolls.value = "";
    clearTextSides.style.display = "none";
    clearTextRolls.style.display = "none";
    clearSidesIndicator.style.visibility = "hidden";
    clearRollsIndicator.style.visibility = "hidden";
}

function removeLine() {
 
  document.getElementById("plus").style.opacity = "1";
  document.getElementById("plus").className="linebutton green";
  if (lineCount == 5) {
  removeErrors (4);
    document.getElementById("line4").style.display = "none";
    lineCount -= 1;
  } else if (lineCount == 4) {
    removeErrors (3);
    document.getElementById("line3").style.display = "none";
    lineCount -= 1;
  } else if (lineCount == 3) {
    removeErrors (2);
    document.getElementById("line2").style.display = "none";
    lineCount -= 1;
  } else if (lineCount == 2) {
    removeErrors (1);
    document.getElementById("line1").style.display = "none";
    document.getElementById("minus").style.opacity = ".5";
    document.getElementById("minus").className="linebutton gray";
    lineCount -= 1;
  }
  
}

//let's get whacky with error checking

function errorCheck(column, columnMax) {
  
  for (i = 0; i < lineCount; i++) {
    let fieldCheck = document.getElementById(column + i);
    let value = fieldCheck.value;
    const fieldNote = document.getElementById("line"+i);
    const sideError = "*Number of Sides must be an interger within range of 1-"+sidesMax;
    const rollError = "&#8224;Number of Rolls must be an interger within range of 1-"+rollsMax;
    let text = "";
    document.getElementById("error-"+ column + i).innerHTML = text;
    
    
    if (
      value < 1 ||
      value > columnMax ||
      isNaN(value) ||
      value != Math.floor(value)
    ) {

      document.getElementById("e" + column + i).style.visibility = "visible";
      document.getElementById(column + i).style.background = "#e6e29a";
      
      if (column =="sides") {text = sideError;} else
        if (column =="rolls") {text = rollError;};
      
      document.getElementById("error-"+ column + i).innerHTML = text;
      document.getElementById("error-"+column+i).style.display="block";
      errorCount += 1;
    } else {
      document.getElementById("e" + column + i).style.visibility = "hidden";
      document.getElementById(column + i).style.background = "";
    }
    
  }
}

function arrayBuilder() {
  xhibitResult = [];
  resultHigh = [];
  resultLow = [];
  for (let l = 0; l < lineCount; l++) {
    const rollCount = document.getElementById("rolls" + l);
    let value = rollCount.value;
    xhibitResult.push([]);
    resultLow.push();
    resultHigh.push();
    
    for (let i = 0; i < value; i++) {
      xhibitResult[l].push();
      xhibitResult[l][i] = i;
    }
  }
}

function rollDice() {
  for (let l = 0; l < lineCount; l++) {
    let rolls = document.getElementById("rolls" + l).value;
    let sides = document.getElementById("sides" + l).value;

    for (let i = 0; i < rolls; i++) {
      xhibitResult[l][i] =Math.floor(Math.random() * sides) + 1;
    }

  resultHigh[l] = Math.max.apply(Math, xhibitResult[l]);
  resultLow[l] = Math.min.apply(Math, xhibitResult[l]); 
    
    console.log("Max: "+resultHigh);
    console.log("Min: "+resultLow);
  }
}


function getSum() {
  xhibitResultSum = [];
  for (i = 0; i < xhibitResult.length; i++) {
    xhibitResultSum.push(0);
    let indTot = 0;
    for (l = 0; l < xhibitResult[i].length; l++) {
      indTot += xhibitResult[i][l];
    }
    xhibitResultSum[i] = indTot;
  }
}

function allSum() {
  allTot = 0;
  for (i = 0; i < xhibitResultSum.length; i++) {
    let type = document.getElementById("type"+i).value;
    if (type =="nor"){
    allTot += xhibitResultSum[i];}
    else if (type == "adv"){
      allTot += resultHigh[i];}
    else if (type == "dis"){
      allTot += resultLow[i];}    
  }
}

function results() {
  let prefix = "";
  let suffix ="Total:";
  let type = document.getElementById("type0").value;
  if (lineCount === 1 && type == "adv"){suffix = "Highest:"};
  if (lineCount === 1 && type == "dis"){suffix = "Lowest:"};
  if (lineCount>1){prefix = "Complete ";};
 const displayTotal = document.getElementById("allTotal");
displayTotal.innerHTML= prefix+suffix+"<br />"+allTot;
 const ordered = document.getElementById("rollsInOrder");
  let orderedString ="";
  for (i=0; i<lineCount; i++){
    const element = document.getElementById("sides"+i);
    const dtype = element.value;
    let array = [];
    for (l=0; l<xhibitResult[i].length; l++){
      array.push("");
      array[l] = " "+xhibitResult[i][l];
    }
    
    orderedString += "D"+dtype+" results:"+array+"<br />";  
  }
  ordered.innerHTML = orderedString;
  
  if (lineCount>1) {
    let subTot = document.createElement("div");
    subTot.setAttribute("id", "subTot")
    document.getElementById("allTotal").prepend(subTot);
    const width = 100 / lineCount;
  for (v=0; v<lineCount; v++) {
    let type = document.getElementById("type"+v);
    if (type.value == "nor") {
    let div = document.createElement("span");
    div.setAttribute("class", "sub-total");
    div.style.width = width+"%";
     let d = document.getElementById("sides"+v).value;
     div.innerHTML="D"+d+"<br /> Total: <br />"+xhibitResultSum[v];
      document.getElementById("subTot").append(div);
    } else if (type.value == "adv"){
       let div = document.createElement("span");
    div.setAttribute("class", "sub-total");
    div.style.width = width+"%";
     let d = document.getElementById("sides"+v).value;
     div.innerHTML="D"+d+"<br />Highest: <br />"+resultHigh[v];
      document.getElementById("subTot").append(div);
    } else if (type.value == "dis"){
       let div = document.createElement("span");
    div.setAttribute("class", "sub-total");
    div.style.width = width+"%";
     let d = document.getElementById("sides"+v).value;
     div.innerHTML="D"+d+"<br />Lowest:<br />"+resultLow[v];
      document.getElementById("subTot").append(div);
    }
  //g.setAttribute("id", "Div1")
  
  }
  }
  
 }

//testing building tables




function test1() {
 
    
  errorCount = 0;
  
  errorCheck("sides", sidesMax);
  errorCheck("rolls", rollsMax);
//  console.log(errorCount);
  if (errorCount == 0) {
    arrayBuilder();
    rollDice();
   // console.log(xhibitResult);
    getSum();
   // console.log(xhibitResultSum);
    allSum();
   // console.log("Full Total: " + allTot);
    results();
   
  }
  
}
function openHelp() {
  help = document.getElementById("notes");
  help.style.display="block";
  help.style.zIndex="2";
}
function closeHelp() {
  help = document.getElementById("notes");
  help.style.display="none";
  help.style.zIndex="-2";
}