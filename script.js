var Eingabe = [
   // 0
   // [[1], 1, [1], [0, 1], [[1, 1]]],
   // [[1, 2], 1, [1, 2], [0, 1], [[1, 2], [1, 2]]],
   // [[1, 2], 1, [1, 2], [0, 1], [[1, 2], [1, 2]]],
   // [[1, 2], 1, [1, 2], [0, 1], [[1, 2], [1, 2]]],
   [[1, 2, 3, 4, 5], 1, [1, 4], [0, 1], [[4, 3], [1, 1], [1, 1], [5, 2], [1, 1]]],
   [[1, 2, 3, 4, 5], 1, [1, 2, 3], [0, 1], [[5, 3], [2, 1], [1, 4], [5, 3], [2, 3]]],
   [[1, 2, 3, 4, 5], 1, [1, 2, 4, 5], [0, 1], [[5, 3], [2, 1], [1, 4], [5, 3], [2, 3]]],
   [[1, 2, 3, 4, 5, 6], 1, [2, 4], [0, 1], [[6, 4], [5, 4], [2, 3], [3, 3], [2, 5], [2, 3]]],
   [[1, 2, 3, 4, 5, 6], 1, [1, 2, 3, 4], [0, 1], [[3, 5], [4, 1], [2, 3], [2, 3], [6, 2], [6, 2]]],
   [[1, 2, 3, 4, 5, 6], 1, [1, 2, 4, 5, 6], [0, 1], [[5, 3], [4, 6], [2, 4], [1, 4], [3, 3], [3, 3]]],
   [[1, 2, 3, 4, 5, 6, 7], 1, [3, 4, 6, 7], [0, 1], [[2, 6], [5, 1], [4, 3], [3, 3], [3, 3], [7, 1], [7, 1]]],
   [[1, 2, 3, 4, 5, 6, 7, 8], 1, [5], [0, 1], [[2, 4], [2, 3], [6, 6], [2, 7], [3, 5], [5, 5], [6, 8], [5, 5]]],
   [[1, 2, 3, 4, 5, 6, 7, 8], 1, [3, 4, 6, 7, 8], [0, 1], [[2, 6], [5, 1], [4, 3], [3, 3], [7, 3], [8, 1], [4, 7], [8, 1]]],
   [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 1, [3, 9], [0, 1], [[6, 3], [7, 4], [1, 4], [7, 2], [7, 5], [10, 2], [9, 5], [7, 7], [8, 9], [7, 7]]],
   // [[1, 2, 3, 5], 1, [1, 2, 3], [0, 1], [[3, 5], [3, 1], [2, 3], [5, 2]]],
   // [[1, 2, 3, 4, 5], 1, [1, 2, 4, 5], [0, 1, 2], [[5, 3, 4], [2, 1], [1, 4], [5, 3], [2, 3]]],
   // Versuch mit Alphabet [0, 1, 2]
   // [[0, 1, 2, 3, 4, 5], 0, [0, 1, 2, 3], [0, 1], [[2, 4], [3, 0], [1, 2], [1, 2], [5, 1], [5, 1]]],
   // [[3, 1, 2, 4], 1, [3], [0, 1], [[2, 2], [2, 3], [2, 1], [1, 3]]] // anschliessend bei trans[0][1] wieder auf 1 wechseln
   // [[3, 1, 2, 4], 1, [3], [0, 1, 3], [[2, 1, 1], [2, 3, 2], [, ,], [, 3, 3]]],
   // [[3, 1, 2, 4], 1, [3], [0, 1, 3], [[2, 1, 1], [2, 3, 2], [1, 2, 3], [1, 3, 3]]],
   // [[3, 1, 2, 4], 1, [3, 4], [0, 1, 3], [[null, null, 4], [2, 1, null], [2, 3, null], [null, null, null]]],
   // [[3, 1, 2, 4, 5], 1, [3, 4], [0, 1, 3, 2], [[null, null, 4, null], [2, 1, null, 5], [2, 3, null, null], [null, null, null, 5], [null, 2, 3, null]]]
];    // console.log(Eingabe[0]);

var EingabeL = [
   // [[1, 2], 1, [1, 2], [0, 1], [[1, 2], [1, 2]]],
   // [[1, 2], 1, [1, 2], [0, 1], [[1, 2], [1, 2]]],
   [[1, 2, 3, 4, 5, 6, 7, 8], 1, [2, 3, 7], [0, 1], [[5, 2], [3, 7], [1, 3], [6, 3], [6, 3], [4, 8], [3, 7], [6, 3]]],
   [[1, 2, 3, 4, 5, 6, 7], 1, [2, 3, 4, 7], [0, 1], [[5, 6], [4, 4], [7, 3], [4, 2], [3, 4], [7, 5], [4, 7]]],
   // [[1, 2, 3, 4, 5, 6, 7, 8], 1, [3, 4, 6, 7, 8], [0, 1], [[2, 6], [5, 1], [4, 3], [3, 3], [7, 3], [8, 1], [4, 7], [8, 1]]],
   // [[1, 2, 3, 4, 5, 6], 1, [2, 3, 6], [0, 1], [[4, 5], [3, 3], [3, 2], [2, 3], [6, 4], [3, 6]]],
   // [[1, 2, 3, 4, 5], 1, [2, 3], [0, 1], [[4, 5], [3, 2], [3, 2], [2, 3], [3, 4]]],
   // [[1, 2, 3, 4], 1, [2], [0, 1], [[3, 4], [2, 2], [2, 2], [2, 3]]],
];

var EingabeR = [
   // [[1, 2], 1, [1, 2], [0, 1], [[1, 2], [1, 2]]],
   // [[1, 2], 1, [1, 2], [0, 1], [[1, 2], [1, 2]]],
   [[1, 2, 3, 4, 5, 6], 1, [2, 3], [0, 1], [[5, 2], [3, 2], [1, 3], [6, 3], [6, 3], [4, 5]]],
   // [[1, 2, 3, 4, 5, 6, 7], 1, [2, 3, 4, 7], [0, 1], [[5, 6], [4, 4], [7, 3], [4, 2], [3, 4], [7, 5], [4, 7]]],
   // [[1, 2, 3, 4, 5, 6], 1, [2, 3, 6], [0, 1], [[4, 5], [3, 3], [3, 2], [2, 3], [6, 4], [3, 6]]],
   [[1, 2, 3, 4, 5], 1, [2, 3], [0, 1], [[4, 5], [3, 2], [3, 2], [2, 3], [3, 4]]],
   // [[1, 2, 3, 4, 5, 6, 7], 1, [3, 4, 6, 7], [0, 1], [[2, 6], [5, 1], [4, 3], [3, 3], [7, 3], [7, 1], [7, 1]]],
   // [[1, 2, 3, 4], 1, [2], [0, 1], [[3, 4], [2, 2], [2, 2], [2, 3]]],
];

counterBspO = 0;
counterBspLR = 0;

AutomatO = ordnen(Eingabe[counterBspO]);     // Automat = Eingabe[Math.floor(Math.random() * Eingabe.length)];
AutomatL = EingabeL[0];
AutomatR = EingabeR[0];

EigenerGraph = false;
hilfeStates = false;
hilfeTrans = false;

function ordnen(a) {
   var transTemp = [];
   for (let i in a[0]) { transTemp.push([a[0][i], a[4][i]]); }
   transTemp.sort((a, b) => a[0] - b[0]);
   var trans = [];
   for (let i in transTemp) { trans.push(transTemp[i][1]); }
   a[0].sort((a, b) => a - b);
   a[4] = trans;

   // console.log(a[3]);

   for (var i = 0; i < a[3].length - 1; i++) {
      for (var j = i + 1; j < a[3].length; j++) {
         // console.log(a[3][i]);
         // console.log(a[3][j]);
         if (a[3][i] > a[3][j]) {
            a3Temp = a[3][i];
            a[3][i] = a[3][j];
            a[3][j] = a3Temp;
            for (let k in a[4]) {
               a4Temp = a[4][k][i];
               a[4][k][i] = a[4][k][j];
               a[4][k][j] = a4Temp;
            }
         }
      }
   }
   // console.log("nach Schleife");
   // console.log(a[3]);
   return a;
}

function nextBspO() {
   // window.location.reload();
   AutomatO = Eingabe[counterBspO];
   document.getElementById("Graph").innerHTML = Viz(noam.fsm.printDotFormat(noam.fsm.parseFsmFromString(array2stringM(AutomatO))), "svg");
   $("#Graph svg").width($("#Graph").width());
   document.getElementById("MinGraphO").innerHTML = '';
   document.getElementById("MinGraphTitelO").innerHTML = "";
   document.getElementById("KnoepfeO").innerHTML = document.createElement('div').appendChild(MakeRadioButtons("O")).outerHTML;
   document.getElementById("TabelleO").innerHTML = document.createElement('div').appendChild(makeTable("O")).outerHTML;
   document.getElementById("NextBspO").style.visibility = "hidden";
   document.getElementById("checkO").style.display = "inline";
   document.getElementById("checkS").style.display = "none";
}

function nextBspLR() {
   linksRichtig = false; rechtsRichtig = false;
   korrekt1L = true; korrekt2L = false;
   korrekt1R = true; korrekt2R = false;
   AutomatL = EingabeL[counterBspLR];
   document.getElementById("MinGraphTitelL").innerHTML = '';
   document.getElementById("MinGraphL").innerHTML = '';
   document.getElementById("checkL").style.visibility = "visible";
   document.getElementById("GraphL").innerHTML = Viz(noam.fsm.printDotFormat(noam.fsm.parseFsmFromString(array2stringM(AutomatL))), "svg");
   $("#GraphL svg").width($("#GraphL").width());
   document.getElementById("KnoepfeL").innerHTML = document.createElement('div').appendChild(MakeRadioButtons("L")).outerHTML;
   document.getElementById("TabelleL").innerHTML = document.createElement('div').appendChild(makeTable("L")).outerHTML;

   AutomatR = EingabeR[counterBspLR];
   document.getElementById("MinGraphTitelR").innerHTML = '';
   document.getElementById("MinGraphR").innerHTML = '';
   document.getElementById("checkR").style.visibility = "visible";
   document.getElementById("GraphR").innerHTML = Viz(noam.fsm.printDotFormat(noam.fsm.parseFsmFromString(array2stringM(AutomatR))), "svg");
   $("#GraphR svg").width($("#GraphR").width());
   document.getElementById("KnoepfeR").innerHTML = document.createElement('div').appendChild(MakeRadioButtons("R")).outerHTML;
   document.getElementById("TabelleR").innerHTML = document.createElement('div').appendChild(makeTable("R")).outerHTML;
   document.getElementById("NextBspLR").style.visibility = "hidden";
}

/* Eingabe: Array, bestehend aus reduzierbaren Zustandspaaren
 * bspw. [[2, 4], [2, 5], [4, 5], [8, 10]]
 * Ausgabe: Array, bestehend aus reduzierbaren Zuständen
 * bspw. [[2, 4, 5], [8, 10]] */
//---reduzieren0---
function reduzieren(a) {

   function Vergleich(aV, bV) {
      for (let k of aV) { // for (var k = 0; k < aV.length; k++) {
         if (bV.includes(k)) {
            return [...new Set([...aV, ...bV])];
         }
      }
   }

   for (let k in a) { // for (var k = 0; k < a.length; k++) {
      for (var i = 0; i < a.length; i++) {
         for (var j = i + 1; j < a.length; j++) {
            var v = Vergleich(a[i], a[j]);
            if (v != null) {
               a.splice(j, 1);
               a.splice(i, 1, v);
            }
         }
      }
   }
   return a;
} //---reduzieren1---

/* Eingabe:     ess:  nicht-minimierte «Eingabe»
 *                r:  Array, bestehend aus reduzierbaren Zustandspaaren
 * Ausgabe: Reduzierbares Array, erzeugt durch «ErzeugeReduzierbaresArray(p)» */
//---GraphReduz0---
function GraphReduzieren(ess, r) {
   var es = JSON.parse(JSON.stringify(ess));
   for (let i of r) {   // for (var i = 0; i < r.length; i++) {
      if (es[0].indexOf(i[0]) != -1) {
         es[0].splice(es[0].indexOf(i[0]), 1, i);
      }
      if (es[2].indexOf(i[0]) != -1) {
         es[2].splice(es[2].indexOf(i[0]), 1, i);
      }

      for (let j of i) {   // for (var j = 1; j < i.length; j++) {
         var t = es[0].indexOf(j);
         if (t != -1) {
            es[0].splice(t, 1);
            es[4].splice(t, 1);
         }
         if (es[2].indexOf(j) != -1) {
            es[2].splice(es[2].indexOf(j), 1);
         }
      }

      for (let j of i) {   // for (var j = 0; j < i.length; j++) {
         for (var k = 0; k < es[4].length; k++) {
            if (j == es[1]) {
               es[1] = i;
            }
            for (var l = 0; l < es[4][k].length; l++) {
               if (j == es[4][k][l]) {
                  es[4][k][l] = i;
               }
            }
         }
      }
   }
   return es;
} //---GraphReduz1---

/* Ausgabe: Zahlenmatrix, bestehend aus -9, -4, -3, 0, 1, ... */
//---ErzeugeZahlenArray0---
function ErzeugeZahlenArray(p) {
   var DEA = window["Automat" + p];
   var arr = Array(DEA[0].length).fill(null).map(() => Array(DEA[0].length));
   function myXOR(a, b) { return (a || b) && !(a && b); }
   function arrT(a, b, c) {
      return arr[DEA[0].indexOf(DEA[4][a][c])][DEA[0].indexOf(DEA[4][b][c])];
   }
   // -9 = leer werden gesetzt
   for (let i in DEA[0]) {
      for (let j in DEA[0]) {
         arr[i][j] = -9;
      }
   }
   // -3 = ε werden gesetzt
   for (var i = 0; i < DEA[0].length; i++) {
      for (var j = i + 1; j < DEA[0].length; j++) {
         if (myXOR(DEA[2].includes(i + 1), DEA[2].includes(j + 1))) {
            arr[i][j] = -3; arr[j][i] = -3;
         }
      }
   }
   do {
      var counter = false;
      // 0, 1, 2, ... werden gesetzt
      for (var i = 0; i < DEA[0].length; i++) { // iteriere über die Zustände
         for (var j = i + 1; j < DEA[0].length; j++) {
            if (arr[i][j] == -9) {
               for (let k in DEA[3]) { // iteriere über das Alphabet
                  if (arrT(i, j, k) >= -3) {
                     arr[i][j] = 0; arr[j][i] = 0;
                     counter = true;
                  }
               }
            }
         }
      }
   } while (counter);
   return arr;
}  //---ErzeugeZahlenArray1---     console.log(ErzeugeZahlenArray('O'));

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
   var r = [];// Array(0);
   for (var i = 0; i < a.length; i++) {
      for (var j = i + 1; j < a.length; j++) {
         if (a[i][j] == -9) {
            r.push([i + 1, j + 1]);
         }
      }
   }
   return r;
}

function array2stringM(a) {
   // Eingabe: (verschachteltes) Eingabearray
   // bspw. [[1, 2, 3, 5], 1, [1, 2, 3], [0, 1], [[3, 5], [3, 1], [2, 3], [5, 2]]]
   // Ausgabe: String, der von «noam.fsm.parseFsmFromString()» gelesen werden kann
   function Array2ABC(a) {
      var aabc = 'aabcdefghijklmnopqrstuvwxyz';
      var s = '';
      if (a.length > 1) {
         for (let i of a) { s += aabc[i] }
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
   for (let i in a[0]) { // iteriere über die Zustände
      for (let j in a[3]) { // iteriere über das Alphabet
         if (a[4][i][j] != null) {
            s += Array2ABC(a[0][i]) + ':' + a[3][j] + '>' + Array2ABC(a[4][i][j]) + '\n';
         }
      }
   }
   return s;
}

function Zahl2Matrix(state, n) {
   // Eingabe: n = Anzahl Zustände (Für a, b, c, d gilt: n = 4)
   // Ausgabe: Stringarray der Kombinationen: (Bsp. [ab, ac, ad, bc, bd, cd])
   s = [];
   var abc = 'abcdefghijklmnopqrstuvwxyz';
   for (var i = 0; i < n; i++) {
      for (var j = i + 1; j < n; j++) {
         s.push(abc[state[i] - 1] + abc[state[j] - 1]);
      }
   }
   return s;
}

function Number2TwoLetters(n, p) {
   // Eingabe: n = Zahl (1, 2, 3, ...)
   // Ausgabe: Eine Kombination (ab, ac oder bc) als String
   return Zahl2Matrix(window["Automat" + p][0], window["Automat" + p][0].length)[n];
}

function schreibe01ε(n, IdRadioButton, p) {
   // Eingabe: n = Zahl für «Number2TwoLetters»
   var DEA = window["Automat" + p];
   var IdZelle = Number2TwoLetters(n, p) + "Zelle" + p;
   for (x = 0; x <= DEA[3].length + 1; x++) {
      if (x < DEA[3].length) { y = '' + DEA[3][x]; }
      if (x == DEA[3].length) { y = 'ε'; }
      if (x == DEA[3].length + 1) { y = '∅'; }
      if (document.getElementById(IdRadioButton + x).checked) {
         document.getElementById(IdZelle).innerHTML = y;
         document.getElementById(IdZelle).style.background = "lightskyblue";
         // return y
      }
   }
}

function makeTable(p) {
   // Ausgabe: html-lesbare Tabelle für Übergänge
   // console.log("p in makeTable: " + p);
   function zustand(a, bool) {
      // Kreise (Diagonalelemente) in der Tabelle
      t = '<svg height="45" width="45">';
      if (bool) {
         t += '<circle cx="22.5" cy="22.5" r="22" fill="none", stroke="black"/>';
      }
      t += '<circle cx="22.5" cy="22.5" r="18" fill="none", stroke="black"/>';
      t += '<text x="22" y="22" style="font-size: 18px" text-anchor="middle" alignment-baseline="central">';
      t += a + '</text></svg>';
      return t;
   }
   var DEA = window["Automat" + p];
   var abc = 'abcdefghijklmnopqrstuvwxyz';
   var n = 0;
   var table = document.createElement('table');
   table.setAttribute("align", "center");
   for (var i = 0; i < DEA[0].length; i++) {
      var row = document.createElement('tr');
      for (var j = 0; j < i; j++) {
         var cell1 = document.createElement('td');
         row.appendChild(cell1);
         cell1.className = "TabUntenLinks";
      }

      var cellDiag = document.createElement('td');
      cellDiag.className = "TabUntenLinks";
      cellDiag.innerHTML = zustand(abc[DEA[0][i] - 1], DEA[2].includes(DEA[0][i]));
      cellDiag.setAttribute("id", abc[DEA[0][i] - 1] + abc[DEA[0][i] - 1] + "Zelle" + p);
      row.appendChild(cellDiag);

      if (p == 'O') { makeGrafikZustandIdUndEdgeId('O'); }
      for (var j = i + 1; j < DEA[0].length; j++) {
         var cell = document.createElement('td');
         cell.setAttribute("id", Number2TwoLetters(n, p) + "Zelle" + p);
         cell.setAttribute("onclick", "schreibe01ε(" + n + ",'" + "Knopf" + p + "','" + p + "')");
         if (p == 'O' || p == 'S') {
            cell.setAttribute("onmouseover", "GrafikFarbe(" + n + ",'" + p + "',1), GrafikPfeile(" + n + ",'" + p + "',1), TabelleFarbe(" + n + ",'" + p + "',1)");
            cell.setAttribute("onmouseout", "GrafikFarbe(" + n + ",'" + p + "',0), GrafikPfeile(" + n + ",'" + p + "',0), TabelleFarbe(" + n + ",'" + p + "',0)");
         }
         row.appendChild(cell);
         n++;

      }
      table.appendChild(row);
   }
   return table;
}

function GrafikFarbe(n, p, OI) {
   if (hilfeStates) {
      var farbe = "none";
      if (OI == 1) { farbe = "lightskyblue"; }
      for (var k = 0; k < GrafikZustandUndID.length; k++) {
         for (var l = 0; l < 2; l++) {
            if (GrafikZustandUndID[k][1][0].includes('n') && GrafikZustandUndID[k][0] == Number2TwoLetters(n, p)[l]) {
               document.getElementById(GrafikZustandUndID[k][1]).children[1].style.fill = farbe;
            }
         }
      }
   }
}

function GrafikPfeile(n, p, OI) {
   var DEA = window["Automat" + p];
   if (hilfeTrans) {
      var farbe = "black";
      if (OI == 1) { farbe = "red"; }
      for (x = 0; x < DEA[3].length; x++) {
         if (document.getElementById("Knopf" + p + x).checked) {
            for (var k = 0; k < GrafikEdgeUndID.length; k++) {
               for (var l = 0; l < 2; l++) {
                  if (GrafikEdgeUndID[k][0] == Number2TwoLetters(n, p)[l] + idZelleT(Number2TwoLetters(n, p), x, false, p)[l]) {
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

function idZelleT(Zelle, x, derGroesseNachOrdnen, p) {
   // Eingabe: Zelle = String der ZellenID für mouseover      x = Alphabet
   // Ausgabe: String der ZellenID nach Berechnungsschritt von x
   var DEA = window["Automat" + p];
   var abc = 'abcdefghijklmnopqrstuvwxyz';
   var lettersStates = '';
   for (let i of DEA[0]) {          // for (var i = 0; i < states.length; i++) {
      lettersStates += abc[i - 1];  // lettersStates += abc[states[i] - 1];
   }
   z1T = DEA[4][lettersStates.indexOf(Zelle[0])][x] - 1;
   z2T = DEA[4][lettersStates.indexOf(Zelle[1])][x] - 1;
   if (derGroesseNachOrdnen) {
      if (z1T > z2T) { zTemp = z1T; z1T = z2T; z2T = zTemp; } // Damit z2T die grössere Zahl ist
   }
   return abc[z1T] + abc[z2T] + "Zelle" + p;
}

function TabelleFarbe(n, p, OI) {
   var DEA = window["Automat" + p];
   if (hilfeTrans) {
      var farbe = "none";
      if (OI == 1) { farbe = "inset 3pt 3pt red, inset -3pt 3pt red, inset 3pt -3pt red, inset -3pt -3pt red"; }
      for (x = 0; x < DEA[3].length; x++) {
         if (document.getElementById("Knopf" + p + x).checked) {
            document.getElementById(idZelleT(Number2TwoLetters(n, p), x, true, p)).style.boxShadow = farbe;
         }
      }
   }
}

function MakeRadioButtons(p) {
   var DEA = window["Automat" + p];
   // Ausgabe: html-lesbare Radio-Buttons für Übergänge
   var form = document.createElement('div');
   form.setAttribute("class", "center-align");
   for (var i = 0; i < DEA[3].length + 2; i++) {
      var input = document.createElement('input');
      input.setAttribute("type", "radio");
      input.setAttribute("name", "RadioGroupName" + p);
      input.setAttribute("id", "Knopf" + p + i);
      input.setAttribute("value", "small");
      var label = document.createElement('label');
      label.setAttribute("for", "Knopf" + p + i);
      label.setAttribute("class", "RadioGroupClass");
      if (i < DEA[3].length) { y = '' + DEA[3][i]; }
      if (i == DEA[3].length) { y = 'ε'; }
      if (i == DEA[3].length + 1) { y = '∅'; }
      label.innerHTML = "&nbsp" + y + "&nbsp";
      form.appendChild(input);
      form.appendChild(label);
   }
   return form;
}

linksRichtig = false;
rechtsRichtig = false;

function uberprufen(p) {
   function erz1DLosArray(p) { // Erzeuge 1-dimensionales Lösungsarray
      var a = [];
      // var EZA = ZahlenArray2StringArray(ErzeugeZahlenArray(p));
      var eza = ErzeugeZahlenArray(p);
      for (i = 0; i < eza.length; i++) {
         for (j = i + 1; j < eza.length; j++) {
            a.push(eza[i][j]);
         }
      }
      return a;
   } // console.log("inside uberprufen: p = " + p);
   var DEA = window["Automat" + p];
   // document.getElementById("NextBspO").innerHTML = '<button class="btn" style="background-color:brown;" onClick="window.location.reload()">Nächstes Beispiel</button>';
   var korrektO = true;
   var korrektS = true;
   korrekt1L = true; korrekt2L = false;
   korrekt1R = true; korrekt2R = false;
   var LosArr = erz1DLosArray(p);
   for (var i = 0; i < Zahl2Matrix(DEA[0], DEA[0].length).length; i++) {
      var cell = document.getElementById(Number2TwoLetters(i, p) + "Zelle" + p);
      if ((parseInt(cell.innerHTML) == LosArr[i]) ||
         (cell.innerHTML == 'ε' && LosArr[i] == -3) ||
         (cell.innerHTML == '∅' && LosArr[i] == -9) ||
         // (parseInt(cell.innerHTML) == 0 && LosArr[i] == 1) ||
         (parseInt(cell.innerHTML) >= 0 && LosArr[i] >= 0)) {
         cell.style.background = "lawngreen"; "lime";  // cell.setAttribute("bgcolor", "lime");
         // if (p == 'O') { korrektO = true; }
         // if (p == 'S') { korrektS = true; }
         if (p == 'L') { korrekt2L = true; }
         if (p == 'R') { korrekt2R = true; }
         // korrekt2R = true;
      } else {
         cell.style.background = "lightcoral";  // cell.setAttribute("bgcolor", "red");
         if (p == 'O') { korrektO = false; }
         if (p == 'S') { korrektS = false; }
         if (p == 'L') { korrekt1L = false; }
         if (p == 'R') { korrekt1R = false; }
         // korrekt1L = false; korrekt1R = false;
      }
   }
   if (korrektS && p == 'S') {
      document.getElementById("checkS").style.display = "none";
      document.getElementById("MinGraphTitelO").innerHTML = "Minimierter Automat";
      GraphMinim(p);
      document.getElementById("NextBspO").style.visibility = "visible";
   }
   if (korrektO && p == 'O') {// && (p == 'O' || p == 'S')
      document.getElementById("checkO").style.display = "none";
      document.getElementById("MinGraphTitelO").innerHTML = "Minimierter Automat";
      GraphMinim(p);
      counterBspO++
      if (counterBspO < Eingabe.length) {
         // alert("erste if-Schleife: "+counterBspO);
         // document.getElementById("NextBspO").style.background = "yellow";
         document.getElementById("NextBspO").style.visibility = "visible";
      }
      if (counterBspO == Eingabe.length && p == 'O') {
         alert(" 👏👏👏👏👏👏👏👏👏👏👏\t👏\n 👏\t\t\t\t\t\t\t\t👏\n 👏\t  Alle Aufgaben richtig gelöst!\t👏\n 👏\t\t\t\t\t\t\t\t👏\n 👏👏👏👏👏👏👏👏👏👏👏\t👏");
      }
   }
   // console.log(korrekt1L);
   // console.log(korrekt2L);
   if (korrekt1L && korrekt2L && p == 'L') {
      console.log("geht hinein");
      document.getElementById("MinGraphTitelL").innerHTML = "Minimierter Automat";
      document.getElementById("checkL").style.visibility = "hidden";
      GraphMinim(p);
      linksRichtig = true;
   }
   if (korrekt1R && korrekt2R && p == 'R') {
      document.getElementById("MinGraphTitelR").innerHTML = "Minimierter Automat";
      document.getElementById("checkR").style.visibility = "hidden";
      GraphMinim(p);
      rechtsRichtig = true;
   }
   if (linksRichtig && rechtsRichtig) {
      document.getElementById("NextBspLR").style.visibility = "visible";
      counterBspLR++;
   }
}

function DEAS2Array() {
   // Ausgabe: Eingabearray – bestehend aus dem selber gestalteten DEA
   var e = [];
   var statesTemp = [];
   for (let n of nodes) {
      // for (var i = 0; i < nodes.length; i++) {
      statesTemp.push(parseInt(n.text, 36) - 9);
   }
   e.push(statesTemp);
   var alphabetTemp = [];  // Vorbereitung für unten
   for (let l of links) {
      // for (var i = 0; i < links.length; i++) {
      if (l.text != ' ') {
         alphabetTemp.push(l.text);
      }
      if (l instanceof StartLink) {
         e.push(parseInt(nodes[nodes.indexOf(l.node)].text, 36) - 9);
      }
   }
   var acceptTemp = [];
   for (let n of nodes) {
      // for (var i = 0; i < nodes.length; i++) {
      if (n.isAcceptState) {
         acceptTemp.push(parseInt(n.text, 36) - 9);
      }
   }
   e.push(acceptTemp);
   var alphaTemp = [];
   aT = alphabetTemp.filter(function (item, pos) {
      return alphabetTemp.indexOf(item) == pos;
   })
   for (let a of aT) {
      // for (var i = 0; i < aT.length; i++) {
      if (a != '') {
         alphaTemp.push(parseInt(a));
      }
   }
   e.push(alphaTemp);
   var transTemp = Array(nodes.length).fill(null).map(() => Array(aT.length));
   for (let l of links) {
      // for (var i = 0; i < links.length; i++) {
      if (l instanceof Link) {
         var t1 = nodes.indexOf(l.nodeA);
         var t2 = alphaTemp.indexOf(parseInt(l.text));
         var t3 = parseInt(nodes[nodes.indexOf(l.nodeB)].text, 36) - 9;
      } else if (l instanceof SelfLink) {
         var t1 = nodes.indexOf(l.node);
         var t2 = alphaTemp.indexOf(parseInt(l.text));
         var t3 = parseInt(nodes[nodes.indexOf(l.node)].text, 36) - 9;
      }
      if (t1 != undefined && t2 != undefined && t3 != undefined) {
         transTemp[t1][t2] = t3;
      }
   }
   e.push(transTemp);
   return ordnen(e);
}

function GraphUebernehmen() {
   var n = 0;
   for (let i of links) {
      if (i instanceof StartLink) { n++; }
   }
   if (n == 0) { alert("Startzustand fehlt"); }
   if (n > 1) { alert("Nur EINEN Startzustand wählen"); }
   if (n == 1) {

      AutomatS = DEAS2Array(); // array aus der eigenen Grafik
      EigenerGraph = true;

      var fehler = '';
      var SelberFalschGestaltet = false;
      for (var i = 0; i < AutomatS[4].length; i++) {
         for (var j = 0; j < AutomatS[4][i].length; j++) {
            if (AutomatS[4][i][j] == undefined && AutomatS[3][j] != undefined) {
               var aabc = 'aabcdefghijklmnopqrstuvwxyz';
               // fehler += 'δ(' + aabc[states[i]] + ',' + alphabet[j] + ') fehlt\n';
               fehler += 'Im Zustand «' + aabc[AutomatS[0][i]] + '» fehlt der Übergang «' + AutomatS[3][j] + '».\n';
               var SelberFalschGestaltet = true;
            }
         }
      }

      if (SelberFalschGestaltet) { alert(fehler); }
      else {
         document.getElementById("myModal").style.display = "none";
         document.getElementById("MinGraphO").innerHTML = '';
         document.getElementById("Losungstabelle").innerHTML = '';
         document.getElementById("Graph").innerHTML = Viz(noam.fsm.printDotFormat(noam.fsm.parseFsmFromString(array2stringM(AutomatS))), "svg");
         $("#Graph svg").width($("#Graph").width());

         makeGrafikZustandIdUndEdgeId('S');

         // document.getElementById("Graph").innerHTML = document.createElement('div').appendChild(drawGraph()).outerHTML;
         document.getElementById("KnoepfeO").innerHTML = document.createElement('div').appendChild(MakeRadioButtons("S")).outerHTML;
         document.getElementById("TabelleO").innerHTML = document.createElement('div').appendChild(makeTable("S")).outerHTML;
         document.getElementById("checkO").style.display = "none";
         document.getElementById("checkS").style.display = "inline";
         document.getElementById("MinGraphTitelO").innerHTML = "";
         // document.getElementById("TabelleHierSelber").appendChild(makeTable());
         // automaton = noam.fsm.parseFsmFromString($("#fsm").val());
         // automatonSelber = noam.fsm.parseFsmFromString(array2stringM(JSON.stringify(DEAS2Array())));
         // initialize();
         // drawGraphSelber();
         // resetAutomaton();  // damit s0 rot gefärbt wird
      }
   }
}

function GraphMinim(p) {
   if (p == 'O' || p == 'S') { var pp = 'O'; }
   if (p == 'L') { var pp = 'L'; }
   if (p == 'R') { var pp = 'R'; }
   document.getElementById("MinGraph" + pp).innerHTML = Viz(
      noam.fsm.printDotFormat(
         noam.fsm.parseFsmFromString(
            array2stringM(
               GraphReduzieren(
                  window["Automat" + p], reduzieren(
                     ErzeugeReduzierbaresArray(
                        ErzeugeZahlenArray(p)
                     )
                  )
               )
            )
         )
      ), "svg");
   $("#MinGraph" + p + " svg").width($("#MinGraph" + p).width());
   EigenerGraph = false;
}

function makeGrafikZustandIdUndEdgeId(p) {
   var DEA = window["Automat" + p];
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

   var aabc = 'aabcdefghijklmnopqrstuvwxyz';
   var ubergange = [];
   for (var i = 0; i < DEA[0].length; i++) {   // iteriere über die Zustände
      for (var j = 0; j < DEA[3].length; j++) { // iteriere über das Alphabet
         if (DEA[4][i][j] != null) {
            ubergange.push(aabc[DEA[0][i]] + aabc[DEA[0][i][j]]);
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