// ===============================
// Navigation
// ===============================

function showSection(sectionId) {

    let sections = document.querySelectorAll('.content-section');

    sections.forEach(section => {
        section.classList.remove('active');
    });

    document.getElementById(sectionId)
        .classList.add('active');
}



// ===============================
// MODULO RECHNER
// ===============================

function berechneModulo() {

    let a = parseInt(
        document.getElementById('zahl1').value
    );

    let n = parseInt(
        document.getElementById('zahl2').value
    );

    if (isNaN(a) || isNaN(n)) {

        document.getElementById('moduloErgebnis')
            .innerText = 'Bitte Zahlen eingeben.';

        return;
    }

    let result = a % n;

    erstelleModuloKreis();

    setTimeout(() => {

        animateModulo(0, a, n);

    }, 300);  

    document.getElementById('moduloErgebnis')
        .innerHTML = `
            ${a} mod ${n} = ${result}
            <br><br>
            ${a} = ${Math.floor(a / n)} · ${n} + ${result}
        `;
}

function erstelleModuloKreis() {

    let n = parseInt(
        document.getElementById("zahl2").value
    );

    if (isNaN(n) || n < 2) {
        return;
    }

    let container =
        document.getElementById("circleContainer");

    container.innerHTML = "";

    let radius = 150;

    let centerX = 200;
    let centerY = 200;

    for (let i = 0; i < n; i++) {

        let angle =
            (2 * Math.PI * i / n)
            - Math.PI / 2;

        let x =
            centerX + radius * Math.cos(angle);

        let y =
            centerY + radius * Math.sin(angle);

        let node =
            document.createElement("div");

        node.className = "circleNode";

        node.id = "node" + i;

        node.style.left = x + "px";
        node.style.top = y + "px";

        node.innerText = i;

        container.appendChild(node);
    }

    let marker =
        document.createElement("div");

    marker.id = "marker";

    container.appendChild(marker);

    bewegeMarker(0);
}

function bewegeMarker(position) {

    let node =
        document.getElementById(
            "node" + position
        );

    let marker =
        document.getElementById("marker");

    marker.style.left =
        (node.offsetLeft + 9) + "px";

    marker.style.top =
        (node.offsetTop + 9) + "px";
}

function animateModulo(start, steps, modulo) {

    let current = start;

    let count = 0;

    let interval = setInterval(() => {

        bewegeMarker(current);

        current =
            (current + 1) % modulo;

        count++;

        if (count > steps) {

            clearInterval(interval);
        }

    }, 500);
}

// ===============================
// PRIMZAHLTEST
// ===============================

function pruefePrimzahl() {

    let zahl = parseInt(
        document.getElementById('primzahlInput').value
    );

    if (isNaN(zahl)) {

        document.getElementById('primzahlErgebnis')
            .innerText = 'Bitte Zahl eingeben.';

        return;
    }

    if (zahl < 2) {

        document.getElementById('primzahlErgebnis')
            .innerText = `${zahl} ist keine Primzahl.`;

        return;
    }

    for (let i = 2; i < zahl; i++) {

        if (zahl % i === 0) {

            document.getElementById('primzahlErgebnis')
                .innerText = `${zahl} ist keine Primzahl.`;

            return;
        }
    }

    document.getElementById('primzahlErgebnis')
        .innerText = `${zahl} ist eine Primzahl.`;
}

function pruefeStruktur() {

    let asso =
        document.getElementById("asso").checked;

    let neutral =
        document.getElementById("neutral").checked;

    let inverse =
        document.getElementById("inverse").checked;

    let division =
        document.getElementById("division").checked;

    let result = "";

    if (
        asso &&
        neutral &&
        inverse &&
        division
    ) {

        result =
            "Das ist ein Körper.";
    }

    else if (
        asso &&
        neutral &&
        inverse
    ) {

        result =
            "Das ist eine Gruppe.";
    }

    else if (
        asso &&
        neutral
    ) {

        result =
            "Das ähnelt einem Ring.";
    }

    else {

        result =
            "Keine bekannte Struktur.";
    }

    document.getElementById(
        "strukturErgebnis"
    ).innerText = result;
}

function generateCayleyTable() {

    let p = parseInt(
        document.getElementById(
            "cayleyP"
        ).value
    );

    if (isNaN(p) || p < 2) {
        return;
    }

    let html = "<table>";

    html += "<tr><th>+</th>";

    for (let i = 0; i < p; i++) {

        html += `<th>${i}</th>`;
    }

    html += "</tr>";

    for (let i = 0; i < p; i++) {

        html += `<tr><th>${i}</th>`;

        for (let j = 0; j < p; j++) {

            html +=
                `<td>${(i + j) % p}</td>`;
        }

        html += "</tr>";
    }

    html += "</table>";

    document.getElementById(
        "cayleyOutput"
    ).innerHTML = html;
}

// ===============================
// ADDITION MODULO p
// ===============================

function addiereFp() {

    let a = parseInt(
        document.getElementById('add1').value
    );

    let b = parseInt(
        document.getElementById('add2').value
    );

    let p = parseInt(
        document.getElementById('modP').value
    );

    if (isNaN(a) || isNaN(b) || isNaN(p)) {

        document.getElementById('additionErgebnis')
            .innerText = 'Bitte Werte eingeben.';

        return;
    }

    let result = (a + b) % p;

    document.getElementById('additionErgebnis')
        .innerHTML = `
            (${a} + ${b}) mod ${p} = ${result}
        `;
}



// ===============================
// MULTIPLIKATIVES INVERSES
// ===============================

function findeInverse() {

    let a = parseInt(
        document.getElementById('inverseA').value
    );

    let p = parseInt(
        document.getElementById('inverseP').value
    );

    if (isNaN(a) || isNaN(p)) {

        document.getElementById('inverseErgebnis')
            .innerText = 'Bitte Werte eingeben.';

        return;
    }

    for (let i = 1; i < p; i++) {

        if ((a * i) % p === 1) {

            document.getElementById('inverseErgebnis')
                .innerHTML = `
                    Das Inverse von ${a} modulo ${p} ist ${i}.
                    <br><br>
                    Denn:
                    <br>
                    ${a} · ${i} mod ${p} = 1
                `;

            return;
        }
    }

    document.getElementById('inverseErgebnis')
        .innerText = 'Kein Inverses gefunden.';
}



// ===============================
// QUIZ
// ===============================

let richtigeAntwort = 0;

function neueQuizFrage() {

    let a = Math.floor(Math.random() * 50) + 1;

    let n = Math.floor(Math.random() * 9) + 2;

    richtigeAntwort = a % n;

    document.getElementById('quizFrage')
        .innerText = `Berechne: ${a} mod ${n}`;

    document.getElementById('quizErgebnis')
        .innerText = '';

    document.getElementById('quizAntwort').value = '';
}



function pruefeQuiz() {

    let antwort = parseInt(
        document.getElementById('quizAntwort').value
    );

    if (antwort === richtigeAntwort) {

        document.getElementById('quizErgebnis')
            .innerText = 'Richtig!';
    }

    else {

        document.getElementById('quizErgebnis')
            .innerText =
            `Falsch. Richtige Antwort: ${richtigeAntwort}`;
    }
}



// ===============================
// QUIZ BEIM START LADEN
// ===============================

window.onload = function () {

    neueQuizFrage();
};