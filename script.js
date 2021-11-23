var Eingabe = [
   // 0
   // [[1], 1, [1], [0, 1], [[1, 1]]],
   // [[1, 2], 1, [1, 2], [0, 1], [[1, 2], [1, 2]]],
   [[1, 2, 3, 4, 5], 1, [1, 4], [0, 1], [[4, 3], [1, 1], [1, 1], [5, 2], [1, 1]]],
   [[1, 2, 3, 4, 5, 6, 7, 8], 1, [5], [0, 1], [[2, 4], [2, 3], [6, 6], [2, 7], [3, 5], [5, 5], [6, 8], [5, 5]]],
   // // // 1
   // // // [[0, 1, 2, 3, 4, 5], 0, [0, 1, 2, 3], [0, 1], [[2, 4], [3, 0], [1, 2], [1, 2], [5, 1], [5, 1]]],
   // [[1, 2, 3, 4, 5, 6], 1, [1, 2, 3, 4], [0, 1], [[3, 5], [4, 1], [2, 3], [2, 3], [6, 2], [6, 2]]],
   // // 2
   // [[1, 2, 3, 5], 1, [1, 2, 3], [0, 1], [[3, 5], [3, 1], [2, 3], [5, 2]]],
   // // 2
   // [[1, 2, 3, 4, 5], 1, [1, 2, 3], [0, 1], [[5, 3], [2, 1], [1, 4], [5, 3], [2, 3]]],
   // // 3
   // [[1, 2, 3, 4, 5], 1, [1, 2, 4, 5], [0, 1], [[5, 3], [2, 1], [1, 4], [5, 3], [2, 3]]],
   // Versuch mit Alphabet [0, 1, 2]
   // [[1, 2, 3, 4, 5], 1, [1, 2, 4, 5], [0, 1, 2], [[5, 3, 4], [2, 1], [1, 4], [5, 3], [2, 3]]],
   // // // 4
   // [[1, 2, 3, 4, 5, 6], 1, [2, 4], [0, 1], [[6, 4], [5, 4], [2, 3], [3, 3], [2, 5], [2, 3]]],
   // // // 5
   // // [[1, 2, 3, 4, 5, 6], 1, [1, 2, 4, 5, 6], [0, 1], [[5, 3], [4, 6], [2, 4], [1, 4], [3, 3], [3, 3]]],
   // // 6
   // [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 1, [3, 9], [0, 1], [[6, 3], [7, 4], [1, 4], [7, 2], [7, 5], [10, 2], [9, 5], [7, 7], [8, 9], [7, 7]]]
   // [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 1, [3, 9], [0, 1], [[6, 3], [7, 4], [1, 4], [7, 2], [7, 5], [10, 2], [9, 5], [7, 7], [8, 9], [7, 7]]],
   // [[3, 1, 2, 4], 1, [3], [0, 1], [[2, 2], [2, 3], [2, 1], [1, 3]]] // anschliessend bei trans[0][1] wieder auf 1 wechseln
   // [[3, 1, 2, 4], 1, [3], [0, 1, 3], [[2, 1, 1], [2, 3, 2], [, ,], [, 3, 3]]],
   // [[3, 1, 2, 4], 1, [3], [0, 1, 3], [[2, 1, 1], [2, 3, 2], [1, 2, 3], [1, 3, 3]]],
   // [[3, 1, 2, 4], 1, [3, 4], [0, 1, 3], [[null, null, 4], [2, 1, null], [2, 3, null], [null, null, null]]],
   // [[3, 1, 2, 4, 5], 1, [3, 4], [0, 1, 3, 2], [[null, null, 4, null], [2, 1, null, 5], [2, 3, null, null], [null, null, null, 5], [null, 2, 3, null]]]
];    // console.log(Eingabe[0]);

counterBsp = 0;

// Automat = Eingabe[Math.floor(Math.random() * Eingabe.length)];
Automat = Eingabe[counterBsp];
states = Automat[0];
initial = Automat[1];
accept = Automat[2];
alphabet = Automat[3];
trans = Automat[4];

EigenerGraph = false;
hilfeStates = false;
hilfeTrans = false;

/* class Automaten {

   constructor(states, initial, accept, alphabet, trans) {
      this.states = states;
      this.initial = initial;
      this.accept = accept;
      this.alphabet = alphabet;
      this.trans = trans;
   }

   array2string() {
      // Eingabe: (verschachteltes) Eingabearray
      // bspw. [[1, 2, 3, 5], 1, [1, 2, 3], [0, 1], [[3, 5], [3, 1], [2, 3], [5, 2]]]
      // Ausgabe: String, der von «noam.fsm.parseFsmFromString()» gelesen werden kann
      function Array2ABC(a) {
         var aabc = 'aabcdefghijklmnopqrstuvwxyz';
         var s = '';
         if (a.length > 1) {
            for (var i = 0; i < a.length; i++) {
               s += aabc[a[i]]
            }
         } else {
            s += aabc[a];
         }
         return s;
      }

      var s = '';
      s += '#states\n';
      this.states.forEach(i => s += Array2ABC(i) + '\n');
      s += '#initial\n';
      s += Array2ABC(this.initial) + '\n';
      s += '#accepting\n';
      this.accept.forEach(i => s += Array2ABC(i) + '\n');
      s += '#alphabet\n';
      this.alphabet.forEach(i => s += i + '\n');
      s += '#transitions\n';

      for (var i = 0; i < this.states.length; i++) { // iteriere über die Zustände
         for (var j = 0; j < this.alphabet.length; j++) { // iteriere über das Alphabet
            if (this.trans[i][j] != null) {
               s += Array2ABC(this.states[i]) + ':' + this.alphabet[j] + '>' + Array2ABC(this.trans[i][j]) + '\n';
            }
         }
      }
      return s;
   }  // console.log(array2string(Automat[0]));

   ordnen() {
      var transTemp = [];
      for (var i = 0; i < this.states.length; i++) {
         transTemp.push([this.states[i], this.trans[i]]);
      }
      transTemp.sort((a, b) => a[0] - b[0]);
      var tran = [];
      for (var i = 0; i < transTemp.length; i++) {
         tran.push(transTemp[i][1]);
      }
      this.trans = tran;
      this.states.sort((a, b) => a - b);
   }

}

var Autom = [
   // new Automaten([1, 2, 3, 4, 5], 1, [1, 2, 4, 5], [0, 1, 2], [[5, 3, 4], [2, 1], [1, 4], [5, 3], [2, 3]]),
   // new Automaten([1, 2, 3, 4, 5, 6], 1, [2, 4], [0, 1], [[6, 4], [5, 4], [2, 3], [3, 3], [2, 5], [2, 3]]),
   // new Automaten([3, 1, 2, 4], 1, [3], [0, 1], [[2, 2], [2, 3], [2, 1], [1, 3]]),
   // new Automaten([1, 2, 3, 4, 5, 6], 1, [2, 4], [0, 1], [[6, 4], [5, 4], [2, 3], [3, 3], [2, 5], [2, 3]]),
   new Automaten([1, 2, 3, 4, 5], 1, [1, 2, 4, 5], [0, 1, 2], [[5, 3, 4], [2, 1], [1, 4], [5, 3], [2, 3]])
];

function getRandomInt(max) { return Math.floor(Math.random() * max); }
var gRI = getRandomInt(Autom.length);   // console.log(gRI);
var Auto = Autom[gRI];

function Eingabe2Graph() {
   automaton = noam.fsm.parseFsmFromString(array2stringM(Eingabe[gRI]));
   var dotString = noam.fsm.printDotFormat(automaton);
   var gvizXml = Viz(dotString, "svg");
   $("#automatonGraph").html(gvizXml);
   reorderCirclesInAcceptingStates(automaton.acceptingStates);
   $("#automatonGraph svg").width($("#automatonGraph").width());
}

var states = Auto.states;
var initial = Auto.initial;
var accept = Auto.accept;
var alphabet = Auto.alphabet;           // alert(alphabet.length);
var trans = Auto.trans;
*/

function nextBsp() {
   counterBsp++;
   // window.location.reload();
   Automat = Eingabe[counterBsp];
   states = Automat[0];
   initial = Automat[1];
   accept = Automat[2];
   alphabet = Automat[3];
   trans = Automat[4];
   document.getElementById("Graph").innerHTML = Viz(noam.fsm.printDotFormat(noam.fsm.parseFsmFromString(array2stringM(Automat))), "svg");
   $("#Graph svg").width($("#Graph").width());
   document.getElementById("MinGraph").innerHTML = '';
   document.getElementById("MinGraphTitel").innerHTML = "";
   document.getElementById("Knoepfe").innerHTML = document.createElement('div').appendChild(MakeRadioButtons()).outerHTML;
   document.getElementById("Tabelle").innerHTML = document.createElement('div').appendChild(makeTable()).outerHTML;
   document.getElementById("NextBsp").style.visibility = "hidden";
}

var transTemp = [];
for (let i in states) {
   transTemp.push([states[i], trans[i]]);
}

transTemp.sort((a, b) => a[0] - b[0]);
var trans = [];
for (let i in transTemp) {
   trans.push(transTemp[i][1]);
}
states.sort((a, b) => a - b);

/* Eingabe: Array, bestehend aus reduzierbaren Zustandspaaren
 * bspw. [[2, 4], [2, 5], [4, 5], [8, 10]]
 * Ausgabe: Array, bestehend aus reduzierbaren Zuständen
 * bspw. [[2, 4, 5], [8, 10]]
 */
//---reduzieren0---
function reduzieren(a) {

   function Vergleich(aV, bV) {
      for (var k = 0; k < aV.length; k++) {
         if (bV.includes(aV[k])) {
            return [...new Set([...aV, ...bV])];
         }
      }
   }

   for (var k = 0; k < a.length; k++) {
      for (var i = 0; i < a.length; i++) {
         for (var j = i + 1; j < a.length; j++) {
            var vvv = Vergleich(a[i], a[j]);
            if (vvv != null) {
               a.splice(j, 1);
               a.splice(i, 1, vvv);
            }
         }
      }
   }
   return a;
} //---reduzieren1---

function erz1DLosArray() { // Erzeuge 1-dimensionales Lösungsarray
   var a = [];
   // var EZA = ZahlenArray2StringArray(ErzeugeZahlenArray());
   var eza = ErzeugeZahlenArray();
   for (i = 0; i < eza.length; i++) {
      for (j = i + 1; j < eza.length; j++) {
         a.push(eza[i][j]);
      }
   }
   return a;
}  // console.log(erz1DLosArray());

/* Ausgabe: Zahlenmatrix, bestehend aus -9, -4, -3, 0, 1, ... */
//---ErzeugeZahlenArray0---
function ErzeugeZahlenArray() {
   if (EigenerGraph) { trans = transS; }

   var arr = Array(states.length).fill(null).map(() => Array(states.length));
   // -9 = leer und -4 = Diagonale werden gesetzt
   for (var i = 0; i < states.length; i++) {
      for (var j = 0; j < states.length; j++) {
         arr[i][j] = -9;
      }
      arr[i][i] = -4;
   }

   function myXOR(a, b) { return (a || b) && !(a && b); }

   // -3 = ε werden gesetzt
   for (var i = 0; i < states.length; i++) {
      for (var j = i + 1; j < states.length; j++) {
         if (myXOR(accept.includes(i + 1), accept.includes(j + 1))) {
            arr[i][j] = -3; arr[j][i] = -3;
         }
      }
   }

   function arrT(a, b, c) {
      return arr[states.indexOf(trans[a][c])][states.indexOf(trans[b][c])];
   }

   do {
      var counter = false;
      // 0, 1, 2, ... werden gesetzt
      for (var i = 0; i < states.length; i++) {
         for (var j = i + 1; j < states.length; j++) {
            if (arr[i][j] == -9) {
               if (arrT(i, j, 0) >= -3) {
                  arr[i][j] = 0; arr[j][i] = 0;
                  counter = true;
               }
               if (arrT(i, j, 1) >= -3) {
                  arr[i][j] = 1; arr[j][i] = 1;
                  counter = true;
               }
            }
         }
      }
   } while (counter);      // console.log('\nArray 4');    console.log(arr);
   return arr;
}  //---ErzeugeZahlenArray1---     console.log(ErzeugeZahlenArray());

function ZahlenArray2StringArray(a) {
   // Eingabe: ZahlenArray a, bestehend aus -9, -4, -3, 0, 1, ...
   // Ausgabe: StringArray, bestehend aus ∅, ε, 0, 1, abc ...
   var abcd = 'abcdefghijklmnopqrstuvwxyz';
   for (var i = 0; i < a.length; i++) {
      a[i][i] = abcd[i];
      for (var j = 0; j < i; j++) {
         a[i][j] = ' ';
      }
      for (var j = i + 1; j < a.length; j++) {
         if (a[i][j] == -3) { a[i][j] = 'ε'; }
         if (a[i][j] >= 0) { a[i][j] = a[i][j].toString(); }
         // if (a[i][j] ==  0) { a[i][j] = '0'; }
         // if (a[i][j] ==  1) { a[i][j] = '1'; }
         if (a[i][j] == -9) { a[i][j] = '∅'; }
      }
   }
   return a;
}  // console.log(ZahlenArray2StringArray(ErzeugeZahlenArray()));

function ErzeugeReduzierbaresArray(a) {
   // Eingabe: ZahlenArray a
   // Ausgabe: Array, bestehend aus reduzierbaren Zustandspaaren
   var reduzi = [];// Array(0);
   for (var i = 0; i < a.length; i++) {
      for (var j = i + 1; j < a.length; j++) {
         if (a[i][j] == -9) {
            reduzi.push([i + 1, j + 1]);
         }
      }
   }
   return reduzi;
}

function array2stringM(a) {
   // Eingabe: (verschachteltes) Eingabearray
   // bspw. [[1, 2, 3, 5], 1, [1, 2, 3], [0, 1], [[3, 5], [3, 1], [2, 3], [5, 2]]]
   // Ausgabe: String, der von «noam.fsm.parseFsmFromString()» gelesen werden kann
   function Array2ABC(a) {
      var aabc = 'aabcdefghijklmnopqrstuvwxyz';
      var s = '';
      if (a.length > 1) {
         for (var i = 0; i < a.length; i++) {
            s += aabc[a[i]]
         }
      } else {
         s += aabc[a];
      }
      return s;
   }

   var s = '';
   s += '#states\n';
   a[0].forEach(i => s += Array2ABC(i) + '\n');
   s += '#initial\n';
   s += Array2ABC(a[1]) + '\n';
   s += '#accepting\n';
   a[2].forEach(i => s += Array2ABC(i) + '\n');
   s += '#alphabet\n';
   a[3].forEach(i => s += i + '\n');
   s += '#transitions\n';
   for (var i = 0; i < a[0].length; i++) { // iteriere über die Zustände
      for (var j = 0; j < a[3].length; j++) { // iteriere über das Alphabet
         if (a[4][i][j] != null) {
            s += Array2ABC(a[0][i]) + ':' + a[3][j] + '>' + Array2ABC(a[4][i][j]) + '\n';
         }
      }
   }
   return s;
}  // console.log(array2stringM(Eingabe[gRI]));

function makeTableHTML(a) {
   // Eingabe: String-Matrix, bestehend aus den Lösungen
   // Ausgabe: HTML-lesbare Tabelle der Lösungstabelle
   // function makeTableHTML(ar) {
   //    // Eingabe: Stringmatrix
   //    // Ausgabe: Tabelle für html
   //    return `<table align="center">${ar.reduce((c, o) => c += `<tr>${o.reduce((c, d) => (c += `<td align="center">${d}</td>`), '')}</tr>`, '')}</table>`
   // }
   var result = "<table align='center'>";
   for (var i = 0; i < a.length; i++) {
      result += "<tr>";
      for (var j = 0; j < i; j++) {
         result += "<td class='TabUntenLinks'>" + a[i][j] + "</td>";
      }
      if (accept.includes(states[i])) {
         result += "<td class='TabDiagonaleAccept'>" + a[i][i] + "</td>";
      } else {
         result += "<td class='TabDiagonale'>" + a[i][i] + "</td>";
      }
      for (var j = i + 1; j < a[i].length; j++) {
         result += "<td>" + a[i][j] + "</td>";
      }
      result += "</tr>";
   }
   result += "</table>";
   return result;
}  // console.log(makeTableHTML(ZahlenArray2StringArray(ErzeugeZahlenArray())));

function array2html() {
   document.getElementById("Losungstabelle").innerHTML = makeTableHTML(ZahlenArray2StringArray(ErzeugeZahlenArray()));
}

function GraphReduzieren(ess, r) {
   // Eingabe: nicht-minimierte «Eingabe», Array – bestehend aus reduzierbaren Zustandspaaren
   // Ausgabe: Reduzierbares Array – erzeugt durch «ErzeugeReduzierbaresArray()»
   var es = JSON.parse(JSON.stringify(ess));
   for (var i = 0; i < r.length; i++) {
      if (es[0].indexOf(r[i][0]) != -1) {
         es[0].splice(es[0].indexOf(r[i][0]), 1, r[i]);
      }
      if (es[2].indexOf(r[i][0]) != -1) {
         es[2].splice(es[2].indexOf(r[i][0]), 1, r[i]);
      }

      for (var j = 1; j < r[i].length; j++) {
         var t = es[0].indexOf(r[i][j]);
         if (t != -1) {
            es[0].splice(t, 1);
            es[4].splice(t, 1);
         }
         if (es[2].indexOf(r[i][j]) != -1) {
            es[2].splice(es[2].indexOf(r[i][j]), 1);
         }
      }

      for (var j = 0; j < r[i].length; j++) {
         for (var k = 0; k < es[4].length; k++) {
            if (r[i][j] == es[1]) {
               es[1] = r[i];
            }
            for (var l = 0; l < es[4][k].length; l++) {
               if (r[i][j] == es[4][k][l]) {
                  es[4][k][l] = r[i];
               }
            }
         }
      }
   }
   return es;
}

function Zahl2Matrix(n) {
   // Eingabe: n = Anzahl Zustände (Für a, b, c, d gilt: n = 4)
   // Ausgabe: Stringarray der Kombinationen: (Bsp. [ab, ac, ad, bc, bd, cd])
   s = [];
   var abc = 'abcdefghijklmnopqrstuvwxyz';
   for (var i = 0; i < n; i++) {
      for (var j = i + 1; j < n; j++) {
         s.push(abc[states[i] - 1] + abc[states[j] - 1]);
      }
   }
   return s;
}

function Number2TwoLetters(n) {
   // Eingabe: n = Zahl (1, 2, 3, ...)
   // Ausgabe: Eine Kombination (ab, ac oder bc) als String
   return Zahl2Matrix(states.length)[n];
}  // console.log(Number2TwoLetters(0));

function schreibe01ε(n, IdRadioButton) {
   // Eingabe: n = Zahl für «Number2TwoLetters»
   // Ausgabe: 
   IdZelle = Number2TwoLetters(n) + "Zelle";
   // Infobox anzeigen
   // info.style.display = "";
   for (x = 0; x <= alphabet.length + 1; x++) {
      if (x < alphabet.length) { y = '' + alphabet[x]; }
      if (x == alphabet.length) { y = 'ε'; }
      if (x == alphabet.length + 1) { y = '∅'; }
      if (document.getElementById(IdRadioButton + x).checked) {
         document.getElementById(IdZelle).innerHTML = y;
         document.getElementById(IdZelle).style.background = "lightskyblue";
         return y
      }
   }
}

function zustand(a, bool) {
   // Kreise (Diagonalelemente) in der Tabelle
   t = '<svg height="45" width="45">';
   if (bool) {
      t += '<circle cx="22.5" cy="22.5" r="22" fill="none", stroke="black"/>';
   }
   t += '<circle cx="22.5" cy="22.5" r="18" fill="none", stroke="black"/>';
   t += '<text x="22" y="22" style="font-size: 18px" text-anchor="middle" alignment-baseline="central">';
   t += a + '</text></svg>';
   // document.getElementById("testasdf").innerHTML = 25;
   // document.getElementById("testasdf").innerHTML = '<svg height="45" width="45"><circle cx="22.5" cy="22.5" r="22" fill="none", stroke="black"/><circle cx="22.5" cy="22.5" r="18" fill="none", stroke="black"/><text x="22" y="22" style="font-size: 18px" text-anchor="middle" alignment-baseline="central">' + 'a' + '</text></svg>';
   // document.getElementById("testasdf").innerHTML = t;
   return t;
   // document.getElementById("testasdf").innerHTML = '<svg height="45" width="45"><circle cx="22.5" cy="22.5" r="22" fill="none", stroke="black"/><circle cx="22.5" cy="22.5" r="18" fill="none", stroke="black"/><text x="22" y="22" style="font-size: 18px" text-anchor="middle" alignment-baseline="central">' + a + '</text></svg>';
   // document.getElementById("testasdf").innerHTML = 25;
}

function makeTable() {
   // Ausgabe: html-lesbare Tabelle für Übergänge  
   var abc = 'abcdefghijklmnopqrstuvwxyz';
   var n = 0;
   var table = document.createElement('table');
   table.setAttribute("id", "Tabelle");
   table.setAttribute("align", "center");
   for (var i = 0; i < states.length; i++) {
      var row = document.createElement('tr');
      for (var j = 0; j < i; j++) {
         var cell1 = document.createElement('td');
         row.appendChild(cell1);
         cell1.className = "TabUntenLinks";
      }

      var cellDiag = document.createElement('td');
      // cellDiag.innerHTML = abc[states[i] - 1];
      cellDiag.className = "TabUntenLinks";
      cellDiag.innerHTML = zustand(abc[states[i] - 1], accept.includes(states[i]));
      cellDiag.setAttribute("id", abc[states[i] - 1] + abc[states[i] - 1] + "Zelle");
      // if (accept.includes(states[i])) {
      //    // cellDiag.className = "TabDiagonaleAccept";
      //    // cellDiag.setAttribute("border", "thick double");
      // } else {
      //    // cellDiag.className = "TabDiagonale";
      // }
      row.appendChild(cellDiag);

      makeGrafikZustandIdUndEdgeId();
      for (var j = i + 1; j < states.length; j++) {
         var cell = document.createElement('td');
         cell.setAttribute("id", Number2TwoLetters(n) + "Zelle");
         cell.setAttribute("onclick", "schreibe01ε(" + n + ",'Knopf')");
         cell.setAttribute("onmouseover", "GrafikFarbe(" + n + ",1), GrafikPfeile(" + n + ",1), TabelleFarbe(" + n + ",1)");
         cell.setAttribute("onmouseout", "GrafikFarbe(" + n + ",0), GrafikPfeile(" + n + ",0), TabelleFarbe(" + n + ",0)");
         row.appendChild(cell);
         n++;
      }
      table.appendChild(row);
   }
   return table;
}  // alert(makeTable());

function GrafikFarbe(n, OI) {
   if (hilfeStates) {
      var farbe = "none";
      if (OI == 1) { farbe = "lightskyblue"; }
      for (var k = 0; k < GrafikZustandUndID.length; k++) {
         for (var l = 0; l < 2; l++) {
            if (GrafikZustandUndID[k][1][0].includes('n') && GrafikZustandUndID[k][0] == Number2TwoLetters(n)[l]) {
               document.getElementById(GrafikZustandUndID[k][1]).children[1].style.fill = farbe;
            }
         }
      }
   }
}

function GrafikPfeile(n, OI) {
   if (hilfeTrans) {
      var farbe = "black";
      if (OI == 1) { farbe = "red"; }
      for (x = 0; x < alphabet.length; x++) {
         if (document.getElementById("Knopf" + x).checked) {
            for (var k = 0; k < GrafikEdgeUndID.length; k++) {
               for (var l = 0; l < 2; l++) {
                  if (GrafikEdgeUndID[k][0] == Number2TwoLetters(n)[l] + idZelleT(Number2TwoLetters(n), x, false)[l]) {
                     ed = document.getElementById(GrafikEdgeUndID[k][1]).children;
                     for (var i = 1; i < 3; i++) {
                        ed[i].style.color = farbe;
                        ed[i].style.stroke = farbe;
                     }
                     ed[3].style.fill = farbe;
                     ed[2].style.fill = farbe;
                  }
               }
            }
         }
      }
   }
}

function idZelleT(Zelle, x, derGroesseNachOrdnen) {
   // Eingabe: Zelle = String der ZellenID für mouseover      x = Alphabet
   // Ausgabe: String der ZellenID nach Berechnungsschritt von x
   var abc = 'abcdefghijklmnopqrstuvwxyz';
   var lettersStates = '';
   for (let i of states) {          // for (var i = 0; i < states.length; i++) {
      lettersStates += abc[i - 1];  // lettersStates += abc[states[i] - 1];
   }
   z1T = trans[lettersStates.indexOf(Zelle[0])][x] - 1;
   z2T = trans[lettersStates.indexOf(Zelle[1])][x] - 1;
   if (derGroesseNachOrdnen) {
      if (z1T > z2T) { zTemp = z1T; z1T = z2T; z2T = zTemp; } // Damit z2T die grössere Zahl ist
   }
   return abc[z1T] + abc[z2T] + "Zelle";
}

function TabelleFarbe(n, OI) {
   if (hilfeTrans) {
      var farbe = "none";
      if (OI == 1) { farbe = "inset 3pt 3pt red,inset -3pt 3pt red, inset 3pt -3pt red, inset -3pt -3pt red"; }
      for (x = 0; x < alphabet.length; x++) {
         if (document.getElementById("Knopf" + x).checked) {
            document.getElementById(idZelleT(Number2TwoLetters(n), x, true)).style.boxShadow = farbe;
         }
      }
   }
}

function MakeRadioButtons() {
   // Ausgabe: html-lesbare Radio-Buttons für Übergänge
   var form = document.createElement('div');
   form.setAttribute("class", "center-align");
   for (var i = 0; i < alphabet.length + 2; i++) {
      var input = document.createElement('input');
      input.setAttribute("type", "radio");
      input.setAttribute("name", "RadioGroupName");
      input.setAttribute("id", "Knopf" + i);
      input.setAttribute("value", "small");
      var label = document.createElement('label');
      label.setAttribute("for", "Knopf" + i);
      label.setAttribute("class", "RadioGroupClass");
      if (i < alphabet.length) { y = '' + alphabet[i]; }
      if (i == alphabet.length) { y = 'ε'; }
      if (i == alphabet.length + 1) { y = '∅'; }
      label.innerHTML = "&nbsp" + y + "&nbsp";
      form.appendChild(input);
      form.appendChild(label);
   }
   return form;
}

function ErzLosArr() { // Erzeuge Lösungs-Tabelle
   var tableObj = document.getElementById("Tabelle");
   var arr = [];
   var allTRs = tableObj.getElementsByTagName("tr");
   for (var trCounter = 0; trCounter < allTRs.length; trCounter++) {
      var tmpArr = [];
      var allTDsInTR = allTRs[trCounter].getElementsByTagName("td");
      for (var tdCounter = 0; tdCounter < allTDsInTR.length; tdCounter++) {
         tmpArr.push(allTDsInTR[tdCounter].innerHTML);
      }
      arr.push(tmpArr);
   }
   return arr;
}

function uberprufen() {
   // document.getElementById("NextBsp").innerHTML = '<button class="btn" style="background-color:brown;" onClick="window.location.reload()">Nächstes Beispiel</button>';
   var korrekt = true;
   var LosArr = erz1DLosArray();
   // console.log(LosArr);
   for (var i = 0; i < Zahl2Matrix(states.length).length; i++) {
      var cell = document.getElementById(Number2TwoLetters(i) + "Zelle");
      if ((parseInt(cell.innerHTML) == LosArr[i]) ||
         (cell.innerHTML == 'ε' && LosArr[i] == -3) ||
         (cell.innerHTML == '∅' && LosArr[i] == -9) ||
         // (parseInt(cell.innerHTML) == 0 && LosArr[i] == 1) ||
         (parseInt(cell.innerHTML) >= 0 && LosArr[i] >= 0)) {
         cell.style.background = "lawngreen"; "lime";  // cell.setAttribute("bgcolor", "lime");
      } else {
         cell.style.background = "lightcoral";  // cell.setAttribute("bgcolor", "red");
         korrekt = false;
      }
   }
   if (korrekt) {
      document.getElementById("NextBsp").style.visibility = "visible";
      document.getElementById("MinGraphTitel").innerHTML = "Minimierter Automat";
      GraphMinim();
      // alert("alles richtig");
      // const alertHTML = '<div class="alert">ALERT!!!</div>';
      // document.body.insertAdjacentHTML('beforeend', alertHTML);
      // setTimeout(() => document.querySelector('.alert').classList.add('hide'), 1000);
      // alertHTML = '';
   }
}  // console.log(FarbTab());

function getBackupDataNeu() {
   // Ausgabe: 
   var s = '';
   var e = [];
   s += '#states\n';
   var statesTemp = [];
   for (var i = 0; i < nodes.length; i++) {
      s += nodes[i].text + '\n';
      // statesTemp += parseInt(nodes[i].text, 36) - 9 + ' f';
      statesTemp.push(parseInt(nodes[i].text, 36) - 9);
   }
   // console.log("statesTemp:" + statesTemp);
   e.push(statesTemp);
   // console.log(statesTemp);//Eingab.push()
   // alert(parseInt('a', 36) - 9);
   // alert(parseInt('z', 36) - 9);
   s += '#initial\n';
   var alphabetTemp = [];  // Vorbereitung für unten
   for (var i = 0; i < links.length; i++) {
      if (links[i].text != ' ') {
         alphabetTemp.push(links[i].text);
      }
      if (links[i] instanceof StartLink) {
         s += nodes[nodes.indexOf(links[i].node)].text + '\n';
         e.push(parseInt(nodes[nodes.indexOf(links[i].node)].text, 36) - 9);
      }
   }
   s += '#accepting\n';
   var acceptTemp = [];
   for (var i = 0; i < nodes.length; i++) {
      if (nodes[i].isAcceptState) {
         s += nodes[i].text + '\n';
         acceptTemp.push(parseInt(nodes[i].text, 36) - 9);
      }
   }
   e.push(acceptTemp);
   s += '#alphabet\n';
   // console.log("alphabetTemp: " + alphabetTemp);
   var alphaTemp = [];
   aT = alphabetTemp.filter(function (item, pos) {
      return alphabetTemp.indexOf(item) == pos;
   })
   // aT.pop();
   // console.log("aT: " + aT);
   // uniq = [...new Set(alphabetTemp)];
   for (var i = 0; i < aT.length; i++) {
      if (aT[i] != '') {
         s += aT[i] + '\n';
         alphaTemp.push(parseInt(aT[i]));
      }
   }
   // console.log("alphaTemp: " + alphaTemp);
   e.push(alphaTemp);
   s += '#transitions\n';
   // var asdf = [''];
   var transTemp = Array(nodes.length).fill(null).map(() => Array(aT.length));
   for (var i = 0; i < links.length; i++) {
      // console.log("Länge der links: " + links.length);
      if (links[i] instanceof Link) {
         // if (nodes.indexOf(links[i].nodeA) != -1) {
         s += nodes[nodes.indexOf(links[i].nodeA)].text + ':' + links[i].text + '>' + nodes[nodes.indexOf(links[i].nodeB)].text + '\n';
         // console.log('aktuell:' + nodes.indexOf(links[i].nodeA));
         // var t1 = parseInt(nodes[nodes.indexOf(links[i].nodeA)].text, 36) - 9 - 1;
         // var t1 = statesTemp[i];
         var t1 = nodes.indexOf(links[i].nodeA);
         // console.log("t1 (Link): " + t1);
         // var t2 = parseInt(links[i].text);
         // var t2 = alphaTemp.indexOf(parseInt(links[i].text));
         // console.log(parseInt(links[i].text));
         var t2 = alphaTemp.indexOf(parseInt(links[i].text));
         var t3 = parseInt(nodes[nodes.indexOf(links[i].nodeB)].text, 36) - 9;
         // transTemp[t1][t2] = t3;
      } else if (links[i] instanceof SelfLink) {
         s += nodes[nodes.indexOf(links[i].node)].text + ':' + links[i].text + '>' + nodes[nodes.indexOf(links[i].node)].text + '\n';
         // var t1 = parseInt(nodes[nodes.indexOf(links[i].node)].text, 36) - 9 - 1;  // parseInt(nodes[i].text, 36) - 9 - 1;//   
         var t1 = nodes.indexOf(links[i].node);
         // console.log("t1 (SelfLink): " + t1);
         // var t1 = statesTemp[i];
         // var t2 = parseInt(links[i].text);
         // var t2 = parseInt(alphaTemp[i]);
         var t2 = alphaTemp.indexOf(parseInt(links[i].text));
         // console.log("t2 (SelfLink): " + t2);
         var t3 = parseInt(nodes[nodes.indexOf(links[i].node)].text, 36) - 9;
         // console.log(t1 + ':' + t2 + '>' + t3);
         // console.log(t1 + ' ' + t2 + ' ' + t3);
         // transTemp[t1][t2] = t3;
      }
      // console.log(t1 + ':' + t2 + '>' + t3);
      if (t1 != undefined && t2 != undefined && t3 != undefined) {
         transTemp[t1][t2] = t3;
      }
   }
   e.push(transTemp);

   // alert(s);
   // console.log(getBackupDataNeu());
   // console.log(saveAsJSON());

   // var backup = {
   //    'nodes': [],
   //    'links': [],
   // };
   // for (var i = 0; i < nodes.length; i++) {
   //    var node = nodes[i];
   //    var backupNode = {
   //       'text': node.text,
   //       'isAcceptState': node.isAcceptState,
   //    };
   //    backup.nodes.push(backupNode);
   // }
   // for (var i = 0; i < links.length; i++) {
   //    var link = links[i];
   //    var backupLink = null;
   //    if (link instanceof SelfLink) {
   //       backupLink = {
   //          'type': 'SelfLink',
   //          'node': nodes.indexOf(link.node),
   //          'text': link.text,
   //       };
   //    } else if (link instanceof StartLink) {
   //       backupLink = {
   //          'type': 'StartLink',
   //          'node': nodes.indexOf(link.node),
   //          'text': link.text,
   //       };
   //    } else if (link instanceof Link) {
   //       backupLink = {
   //          'type': 'Link',
   //          'nodeA': nodes.indexOf(link.nodeA),
   //          'nodeB': nodes.indexOf(link.nodeB),
   //          'text': link.text,
   //       };
   //    }
   //    if (backupLink != null) {
   //       backup.links.push(backupLink);
   //    }
   // }

   // return s;  // a:0>b   b:1>c    b:0>b    a:1>a    d:3>c     a:0>b\nb:0>b\na:1>a\nc:3>d\nb:1>c
   // return array2stringM(e);
   return e;
   // return backup;
}

function GraphUebernehmen() {
   var n = 0;
   for (var i = 0; i < links.length; i++) {
      if (links[i] instanceof StartLink) { n++; }
   }
   if (n == 0) { alert("Startzustand fehlt"); }
   if (n > 1) { alert("Nur EINEN Startzustand wählen"); }
   if (n == 1) {

      Automat = getBackupDataNeu(); // array aus der eigenen Grafik
      // console.log("inside GraphUebernehmen");
      // console.log(Automat);
      states = Automat[0];
      initial = Automat[1];
      accept = Automat[2];
      alphabet = Automat[3];
      trans = Automat[4];
      transS = Automat[4];
      EigenerGraph = true;

      var transTemp = [];
      for (var i = 0; i < states.length; i++) {
         transTemp.push([states[i], trans[i]]);
      }
      transTemp.sort((a, b) => a[0] - b[0]);
      var trans = [];
      for (var i = 0; i < transTemp.length; i++) {
         trans.push(transTemp[i][1]);
      }
      states.sort((a, b) => a - b);
      transS = trans;

      var fehler = '';
      var SelberFalschGestaltet = false;
      for (var i = 0; i < trans.length; i++) {
         for (var j = 0; j < trans[i].length; j++) {
            if (trans[i][j] == undefined && alphabet[j] != undefined) {
               var aabc = 'aabcdefghijklmnopqrstuvwxyz';
               // fehler += 'δ(' + aabc[states[i]] + ',' + alphabet[j] + ') fehlt\n';
               fehler += 'Im Zustand «' + aabc[states[i]] + '» fehlt der Übergang «' + alphabet[j] + '».\n';
               var SelberFalschGestaltet = true;
            }
         }
      }

      if (SelberFalschGestaltet) { alert(fehler); }
      else {
         document.getElementById("myModal").style.display = "none";
         document.getElementById("MinGraph").innerHTML = '';
         document.getElementById("Losungstabelle").innerHTML = '';
         document.getElementById("Graph").innerHTML = Viz(noam.fsm.printDotFormat(noam.fsm.parseFsmFromString(array2stringM(getBackupDataNeu()))), "svg");
         $("#Graph svg").width($("#Graph").width());

         makeGrafikZustandIdUndEdgeId();

         // automatonSelber = noam.fsm.parseFsmFromString(array2stringM(getBackupDataNeu()));
         // automaton = noam.fsm.parseFsmFromString(array2stringM(getBackupDataNeu()));
         // document.getElementById("Graph").innerHTML = document.createElement('div').appendChild(drawGraph()).outerHTML;
         document.getElementById("Knoepfe").innerHTML = document.createElement('div').appendChild(MakeRadioButtons()).outerHTML;
         document.getElementById("Tabelle").innerHTML = document.createElement('div').appendChild(makeTable()).outerHTML;
         document.getElementById("MinGraphTitel").innerHTML = "";
         // console.log(makeTable().toString());
         // document.getElementById("TabelleHierSelber").innerHTML = "";
         // document.getElementById("TabelleHierSelber").appendChild(makeTable());
         // automaton = noam.fsm.parseFsmFromString($("#fsm").val());
         // automatonSelber = noam.fsm.parseFsmFromString(array2stringM(JSON.stringify(getBackupDataNeu())));
         // automatonSelber = noam.fsm.parseFsmFromString(array2stringM(getBackupDataNeu()));
         // initialize();
         // drawGraphSelber();
         // resetAutomaton();  // damit s0 rot gefärbt wird
      }
   }
}

function GraphMinim() {
   if (EigenerGraph) { Automat[4] = transS; }
   document.getElementById("MinGraph").innerHTML = Viz(
      noam.fsm.printDotFormat(
         noam.fsm.parseFsmFromString(
            array2stringM(
               GraphReduzieren(
                  Automat, reduzieren(
                     ErzeugeReduzierbaresArray(
                        ErzeugeZahlenArray()
                     )
                  )
               )
            )
         )
      ), "svg");
   $("#MinGraph svg").width($("#MinGraph").width());
}

function makeGrafikZustandIdUndEdgeId() {
   var listKinder = document.getElementById("graph0").children;
   // console.log("Länge listKinder: " + listKinder.length);
   GrafikZustandUndID = [];  // Array(listKinder.length-2).fill(null).map(() => Array(2));
   GrafikEdgeUndID = [];
   for (var i = 2; i < listKinder.length; i++) {
      var temp = listKinder[i].firstElementChild.innerHTML;
      if (temp.length > 1 && temp.length < 9) {
         var temp1 = temp.substr(0, 1);
         var temp2 = temp.substr(6, 6);
         temp = temp1 + temp2;
         GrafikEdgeUndID.push([temp, listKinder[i].id]);
      }
      if (temp.length == 1) {
         GrafikZustandUndID.push([temp, listKinder[i].id]);
      }
   }

   // console.log(GrafikZustandUndID);
   // console.log(GrafikEdgeUndID);
   // console.log(trans);

   if (EigenerGraph) { trans = transS; }
   // console.log("nach if (EigenerGraph) { trans = transS; }");
   //    console.log(trans);
   var aabc = 'aabcdefghijklmnopqrstuvwxyz';
   var ubergange = [];
   for (var i = 0; i < states.length; i++) {   // iteriere über die Zustände
      for (var j = 0; j < alphabet.length; j++) { // iteriere über das Alphabet
         if (trans[i][j] != null) {
            ubergange.push(aabc[states[i]] + aabc[trans[i][j]]);
         }
      }
   }

   // Versuch, den Fehler der Pfeilrichtung beim selber gestalteten Graphen zu korrigieren
   // for (var i = 0; i < GrafikEdgeUndID.length; i++) {
   //    if (!ubergange.includes(GrafikEdgeUndID[i][0])) {
   //       GrafikEdgeUndID[i][0] = GrafikEdgeUndID[i][0][1] + GrafikEdgeUndID[i][0][0];
   //    }
   // }
}

/*
function array2string(a) {
// Eingabe: EingabeString
// Ausgabe: String, der von «noam.fsm.parseFsmFromString()» gelesen werden kann
   var aabc = 'aabcdefghijklmnopqrstuvwxyz';
   var s = '';
   s += '#states\n';
   a[0].forEach(i => s += aabc[i] + '\n');
   s += '#initial\n';
   s += aabc[a[1]] + '\n';
   s += '#accepting\n';
   a[2].forEach(i => s += aabc[i] + '\n');
   s += '#alphabet\n';
   a[3].forEach(i => s += i + '\n');
   s += '#transitions\n';
   a[4].forEach(([x, y], i) => s += aabc[a[0][i]] + ':' + a[3][0] + '>' + aabc[x] + '\n' + aabc[a[0][i]] + ':' + a[3][1] + '>' + aabc[y] + '\n');
   return s;
}
*/

/*
 * base64.js - Base64 encoding and decoding functions
 *
 * See: http://developer.mozilla.org/en/docs/DOM:window.btoa
 *      http://developer.mozilla.org/en/docs/DOM:window.atob
 *
 * Copyright (c) 2007, David Lindquist <david.lindquist@gmail.com>
 * Released under the MIT license
 */
if (typeof btoa == 'undefined') {
   function btoa(str) {
      var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
      var encoded = [];
      var c = 0;
      while (c < str.length) {
         var b0 = str.charCodeAt(c++);
         var b1 = str.charCodeAt(c++);
         var b2 = str.charCodeAt(c++);
         var buf = (b0 << 16) + ((b1 || 0) << 8) + (b2 || 0);
         var i0 = (buf & (63 << 18)) >> 18;
         var i1 = (buf & (63 << 12)) >> 12;
         var i2 = isNaN(b1) ? 64 : (buf & (63 << 6)) >> 6;
         var i3 = isNaN(b2) ? 64 : (buf & 63);
         encoded[encoded.length] = chars.charAt(i0);
         encoded[encoded.length] = chars.charAt(i1);
         encoded[encoded.length] = chars.charAt(i2);
         encoded[encoded.length] = chars.charAt(i3);
      }
      return encoded.join('');
   }
}


// var AlleGrafikElemente = document.getElementById("graph0").children;
// alert(AlleGrafikElemente[1]); //.innerHTML
// console.log(AlleGrafikElemente[1].innerHTML);
// for (i = 0; i < AlleGrafikElemente.length; i++) { //
//    AlleGrafikElemente[i]
//    // console.log(AlleGrafikElemente[i].firstChild);
//    console.log(AlleGrafikElemente[i]);
// }