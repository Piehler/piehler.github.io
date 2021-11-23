function colorStates(states, cssClass) {
  if (states === undefined || states === null) {
    return;
  }

  states = getElementsOfStates(states);

  for (var i = 0; i < states.length; i++) {
    states[i].children("ellipse").each(function () {
      $(this).attr("class", cssClass);
    });
  }
}

function colorDiv(divId, intervals, cssClass) {
  var regex = $("#" + divId).html();

  var start = 0;
  var out = "";

  for (var i = 0; i < intervals.length; i++) {
    out += regex.slice(start, intervals[i][0]);
    out += '<font class="' + cssClass + '">' + regex.slice(intervals[i][0], intervals[i][1]) + '</font>';
    start = intervals[i][1];
  }

  out += regex.slice(start);

  $("#" + divId).html(out);
}

function getElementsOfStates(states) {
  var retVal = [];

  for (var i = 0; i < states.length; i++) {
    $("title:contains('" + states[i].toString() + "')").each(function (index, element) {
      if ($(this).text() === states[i].toString()) {
        retVal.push($(this).parent());
      }
    });
  }

  return retVal;
}

function reorderCirclesInAcceptingStates(states) {
  var stateElements = getElementsOfStates(states);

  for (var i = 0; i < stateElements.length; i++) {
    var e1 = $(stateElements[i].children("ellipse")[0]);
    var e2 = $(stateElements[i].children("ellipse")[1]);
    e1.insertAfter(e2);
  }
}

// function drawGraph() {
//   automaton = noam.fsm.parseFsmFromString(array2stringM(Automat));
//   // automaton = noam.fsm.parseFsmFromString(Auto.array2string());
//   var dotString = noam.fsm.printDotFormat(automaton);
//   var gvizXml = Viz(dotString, "svg");

//   // console.log(Viz(noam.fsm.printDotFormat(noam.fsm.parseFsmFromString(array2stringM(Automat))), "svg"));

//   // $("#automatonGraph").html(gvizXml);
//   $("#Graph").html(gvizXml);
//   reorderCirclesInAcceptingStates(automaton.acceptingStates);
//   // $("#automatonGraph svg").width($("#automatonGraph").width());
//   $("#Graph svg").width($("#Graph").width());
// }

function drawGraphM() {
  var dotString = noam.fsm.printDotFormat(automatonM);
  var gvizXml = Viz(dotString, "svg");
  $("#MinGraph").html(gvizXml);
  reorderCirclesInAcceptingStates(automatonM.acceptingStates);
  $("#MinGraph svg").width($("#MinGraph").width());
}

function drawGraphSelber() {
  var dotString = noam.fsm.printDotFormat(automatonSelber);
  var gvizXml = Viz(dotString, "svg");
  $("#automatonGraphSelber").html(gvizXml);
  reorderCirclesInAcceptingStates(automatonSelber.acceptingStates);
  $("#automatonGraphSelber svg").width($("#automatonGraphSelber").width());
}

function colorize() {
  colorStates(automaton.states, "inactiveStates");
  colorStates(previousStates, "previousState");
  colorStates(nextStates, "nextState");
  colorStates(currentStates, "currentState");
}

$("#generateRandomString").click(function () {
  if ($("#startStop").text() === "Stop") {
    $("#startStop").click();
  }

  $("#inputString").val(Math.random() >= 0.5 ?
    noam.fsm.randomStringInLanguage(automaton).join("") :
    noam.fsm.randomStringNotInLanguage(automaton).join(""));
  onInputStringChange();
});

$("#generateRandomAcceptableString").click(function () {
  if ($("#startStop").text() === "Stop") {
    $("#startStop").click();
  }

  var s = noam.fsm.randomStringInLanguage(automaton).join("");
  $("#inputString").val(s);
  onInputStringChange();
});

$("#generateRandomUnacceptableString").click(function () {
  if ($("#startStop").text() === "Stop") {
    $("#startStop").click();
  }

  var s = noam.fsm.randomStringNotInLanguage(automaton).join("");
  $("#inputString").val(s);
  onInputStringChange();
});

$("#startStop").click(function () {
  if ($("#startStop").text() === "Start") {
    var r = $("#inputString").val();
    $("#inputString").parent().html('<div id="inputString" type="text" class="input-div input-block-level monospaceRegex" placeholder="See if this fits"><br></div>');
    $("#inputString").html(r === "" ? '<br>' : r);
    resetAutomaton();
    $("#inputString").removeAttr("contenteditable");
    $("#inputFirst").attr("disabled", false);
    $("#inputNext").attr("disabled", false);
    $("#inputPrevious").attr("disabled", false);
    $("#inputLast").attr("disabled", false);
    $("#startStop").text("Stop");
  } else {
    var r = $("#inputString").text();
    $("#inputString").parent().html('<input id="inputString" type="text" class="input-block-level monospaceRegex" placeholder="See if this fits">');
    $("#inputString").keyup(onInputStringChange);
    $("#inputString").change(onInputStringChange);
    $("#inputString").val(r);
    $("#inputString").attr("contenteditable", "");
    $("#inputFirst").attr("disabled", true);
    $("#inputNext").attr("disabled", true);
    $("#inputPrevious").attr("disabled", true);
    $("#inputLast").attr("disabled", true);
    $("#startStop").text("Start");
    $("#inputString").html(($("#inputString").text()));
    $("#inputString").focus();
  }
});

function onInputStringChange() {
  var chars = $("#inputString").val().split("");
  var isValidInputString = -1;
  for (var i = 0; i < chars.length; i++) {
    if (!noam.util.contains(automaton.alphabet, chars[i])) {
      isValidInputString = i;
      break;
    }
  }

  if (isValidInputString === -1) {
    $("#startStop").attr("disabled", false);
    $("#inputString").parent().addClass("success");
    $("#inputString").parent().removeClass("error");
    $("#inputError").hide();
  } else {
    $("#startStop").attr("disabled", true);
    $("#inputString").parent().removeClass("success");
    $("#inputString").parent().addClass("error");
    $("#inputError").show();
    $("#inputError").text("Error: input character at position " + i + " is not in FSM alphabet.");
  }
}

function colorNextSymbol() {
  $("#inputString").html(inputString);

  if ($("#inputString").html() === "") {
    $("#inputString").html("<br>");
  }

  if (nextSymbolIndex < inputString.length) {
    colorDiv("inputString", [[nextSymbolIndex, nextSymbolIndex + 1]], "nextSymbol");
  }
}

function resetAutomaton() {
  currentStates = noam.fsm.computeEpsilonClosure(automaton, [automaton.initialState]);
  inputString = $("#inputString").text();
  nextSymbolIndex = 0;
  colorize();
  colorNextSymbol();
}

$("#inputFirst").click(function () {
  resetAutomaton();
});

$("#inputPrevious").click(function () {
  if (nextSymbolIndex > 0) {
    currentStates = noam.fsm.readString(automaton, inputString.substring(0, nextSymbolIndex - 1).split(""));
    nextSymbolIndex = nextSymbolIndex - 1;
    colorize();
    colorNextSymbol();
  }
});

$("#inputNext").click(function () {
  if (nextSymbolIndex < inputString.length) {
    currentStates = noam.fsm.makeTransition(automaton, currentStates, inputString[nextSymbolIndex]);
    nextSymbolIndex += 1;
    colorize();
    colorNextSymbol();
  }
});

$("#inputLast").click(function () {
  while (nextSymbolIndex < inputString.length) {
    currentStates = noam.fsm.makeTransition(automaton, currentStates, inputString[nextSymbolIndex]);
    nextSymbolIndex += 1;
    colorize();
    colorNextSymbol();
  }
});

function initialize() {
  inputStringLeft = null;
  currentStates = null;
  inactiveStates = null;
  previousStates = null;
  nextStates = null;
}

var regex = null;
var automaton = null;
var inputString = null;
var nextSymbolIndex = 0;
var currentStates = null;
var inactiveStates = null;
var previousStates = null;
var nextStates = null;
var inputIsRegex = false;//true;

// $("#regexinput").click(function(){
//   inputIsRegex = true;
// });

// $("#fsminput").click(function(){
//   inputIsRegex = false;
// });

$("#generateRegex").click(function () {
  regex = noam.re.string.random(5, "abcd", {});
  regex = noam.re.string.simplify(regex);
  $("#regex").val(regex);
  $("#regex").focus();
  onRegexOrAutomatonChange();
});

function generateAutomaton(fsmType) {
  automaton = noam.fsm.createRandomFsm(fsmType, 4, 3, 3);
  $("#fsm").val(noam.fsm.serializeFsmToString(automaton));
  $("#fsm").scrollTop(0);
  $("#fsm").focus();
  onRegexOrAutomatonChange();
}

$("#generateDFA").click(function () {
  generateAutomaton(noam.fsm.dfaType);
});

// $("#generateNFA").click(function() {
//   generateAutomaton(noam.fsm.nfaType);
// });

// $("#generateENFA").click(function() {
//   generateAutomaton(noam.fsm.enfaType);
// });

// $("#createAutomaton").click(Eingabe2Graph() );

// $("#createAutomaton").click(function () {

//   // window.location.reload();

//   // automaton = noam.fsm.parseFsmFromString($("#fsm").val());
//   automaton = noam.fsm.parseFsmFromString(array2stringM(Eingabe[gRI]));

//   // initialize();
//   drawGraph();
//   // resetAutomaton();  // damit s0 rot gefärbt wird

//   // $("#generateRandomString").attr("disabled", false);
//   // $("#generateRandomAcceptableString").attr("disabled", false);
//   // $("#generateRandomUnacceptableString").attr("disabled", false);
//   // $("#inputString").attr("disabled", false);
// });

// $("#createAutomatonM").click(function () {
//   automatonM = noam.fsm.parseFsmFromString(
//     array2stringM(
//       GraphReduzieren(
//         Automat, reduzieren(
//           ErzeugeReduzierbaresArray(
//             ErzeugeZahlenArray()
//           )
//         )
//       )
//     )
//   );
//   // initialize();
//   drawGraphM();
//   // resetAutomaton();  // damit s0 rot gefärbt wird

//   // $("#generateRandomString").attr("disabled", false);
//   // $("#generateRandomAcceptableString").attr("disabled", false);
//   // $("#generateRandomUnacceptableString").attr("disabled", false);
//   // $("#inputString").attr("disabled", false);
// });

// $("#GraphUebernehmen").click(function () {

//   var n = 0;
//   for (var i = 0; i < links.length; i++) {
//     if (links[i] instanceof StartLink) { n++; }
//   }
//   if (n == 0) {
//     alert("Startzustand fehlt");
//   }
//   if (n > 1) {
//     alert("Nur EINEN Startzustand wählen");
//   }
//   if (n == 1) {

//     Eingabe = getBackupDataNeu(); // array aus der eigenen Grafik
//     states = Eingabe[0];
//     // console.log("states: " + states);
//     // console.log(states);
//     initial = Eingabe[1];
//     // console.log(initial);
//     accept = Eingabe[2];
//     // console.log(accept);
//     alphabet = Eingabe[3];           // alert(alphabet.length);
//     // console.log(alphabet);
//     // console.log(alphabet.length);
//     trans = Eingabe[4];
//     console.log(trans);

//     var transTemp = [];
//     for (var i = 0; i < states.length; i++) {
//       transTemp.push([states[i], trans[i]]);
//     }
//     transTemp.sort((a, b) => a[0] - b[0]);
//     var trans = [];
//     for (var i = 0; i < transTemp.length; i++) {
//       trans.push(transTemp[i][1]);
//     }
//     states.sort((a, b) => a - b);

//     // console.log(trans);

//     var fehler = '';
//     var SelberRichtigGestaltet = false;
//     for (var i = 0; i < trans.length; i++) {
//       for (var j = 0; j < trans[i].length; j++) {
//         // console.log(trans[i][j]);
//         if (trans[i][j] == undefined && alphabet[j] != undefined) {
//           var aabc = 'aabcdefghijklmnopqrstuvwxyz';
//           // fehler += 'δ(' + aabc[states[i]] + ',' + alphabet[j] + ') fehlt\n';
//           fehler += 'im Zustand ' + aabc[states[i]] + ' fehlt der Übergang ' + alphabet[j] + '\n';
//           var SelberRichtigGestaltet = true;
//         }
//       }
//     }

//     if (SelberRichtigGestaltet) { alert(fehler); }
//     else {

//       document.getElementById("myModal").style.display = "none";

//       document.getElementById("Graph").innerHTML = Viz(noam.fsm.printDotFormat(noam.fsm.parseFsmFromString(array2stringM(getBackupDataNeu()))), "svg");
//       // $("#Graph").html(vizASDF);
//       $("#Graph svg").width($("#Graph").width());
//       // automatonSelber = noam.fsm.parseFsmFromString(array2stringM(getBackupDataNeu()));
//       // automaton = noam.fsm.parseFsmFromString(array2stringM(getBackupDataNeu()));
//       // document.getElementById("Graph").innerHTML = document.createElement('div').appendChild(drawGraph()).outerHTML;
//       document.getElementById("Knoepfe").innerHTML = document.createElement('div').appendChild(MakeRadioButtons()).outerHTML;
//       document.getElementById("Tabelle").innerHTML = document.createElement('div').appendChild(makeTable()).outerHTML;
//       // console.log(makeTable().toString());
//       // document.getElementById("TabelleHierSelber").innerHTML = "";
//       // document.getElementById("TabelleHierSelber").appendChild(makeTable());

//       // automaton = noam.fsm.parseFsmFromString($("#fsm").val());
//       // automatonSelber = noam.fsm.parseFsmFromString(array2stringM(JSON.stringify(getBackupDataNeu())));

//       // automatonSelber = noam.fsm.parseFsmFromString(array2stringM(getBackupDataNeu()));

//       // initialize();
//       // drawGraphSelber();
//       // resetAutomaton();  // damit s0 rot gefärbt wird


//       console.log("trans nachher");
//       console.log(trans);
//     }
//   }
// });

$("#createAutomatonMSelber").click(function () {

  automatonSelber = noam.fsm.parseFsmFromString(array2stringM(getBackupDataNeu()));


  automatonM = noam.fsm.parseFsmFromString(
    array2stringM(
      GraphReduzieren(
        Automat, reduzieren(
          ErzeugeReduzierbaresArray(
            ErzeugeZahlenArray()
          )
        )
      )
    )
  );
  // initialize();
  drawGraphM();
  // resetAutomaton();  // damit s0 rot gefärbt wird

  // $("#generateRandomString").attr("disabled", false);
  // $("#generateRandomAcceptableString").attr("disabled", false);
  // $("#generateRandomUnacceptableString").attr("disabled", false);
  // $("#inputString").attr("disabled", false);
});

$("#regex").change(onRegexOrAutomatonChange);
$("#regex").keyup(onRegexOrAutomatonChange);
$("#fsm").change(onRegexOrAutomatonChange);
$("#fsm").keyup(onRegexOrAutomatonChange);

function onRegexOrAutomatonChange() {
  $("#automatonGraph").html("");
  $("#inputString").html("<br>");

  $("#generateRandomString").attr("disabled", true);
  $("#generateRandomAcceptableString").attr("disabled", true);
  $("#generateRandomUnacceptableString").attr("disabled", true);
  $("#createAutomaton").attr("disabled", true);
  $("#startStop").attr("disabled", true);
  $("#inputFirst").attr("disabled", true);
  $("#inputNext").attr("disabled", true);
  $("#inputPrevious").attr("disabled", true);
  $("#inputLast").attr("disabled", true);
  $("#inputString").parent().html('<input id="inputString" type="text" class="input-block-level monospaceRegex" placeholder="See if this fits" disabled>');
  $("#inputString").parent().removeClass("success error");
  $("#inputString").keyup(onInputStringChange);
  $("#inputString").change(onInputStringChange);
  $("#startStop").text("Start");
  $("#inputError").hide();

  if (inputIsRegex) {
    validateRegex();
  } else {
    validateFsm();
  }
}

function validateFsm() {
  var fsm = $("#fsm").val();

  if (fsm.length === 0) {
    $("#fsm").parent().removeClass("success error");
    $("#fsmError").hide();
  } else {
    try {
      noam.fsm.parseFsmFromString(fsm);
      $("#fsm").parent().removeClass("error");
      $("#fsm").parent().addClass("success");
      $("#createAutomaton").attr("disabled", false);
      $("#fsmError").hide();
    } catch (e) {
      $("#fsm").parent().removeClass("success");
      $("#fsm").parent().addClass("error");
      $("#fsmError").text("Error: " + e.message);
      $("#fsmError").show();
    }
  }
}

function validateRegex() {
  var regex = $("#regex").val();

  if (regex.length === 0) {
    $("#regex").parent().removeClass("success error");
    $("#fsmError").hide();
  } else {
    try {
      noam.re.string.toTree(regex);
      $("#regex").parent().removeClass("error");
      $("#regex").parent().addClass("success");
      $("#createAutomaton").attr("disabled", false);
      $("#fsmError").hide();
    } catch (e) {
      $("#regex").parent().removeClass("success");
      $("#regex").parent().addClass("error");
      $("#fsmError").text("Error: " + e.message);
      $("#fsmError").show();
    }
  }
}
