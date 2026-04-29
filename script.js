let tablaEstatica = [
":authority",
":path: /",
":method: GET",
":method: POST",
":scheme: https",
":status: 200",
":status: 204",
":status: 206",
":status: 304",
":status: 400",
":status: 404",
":status: 500",
"accept: */*",
"accept-encoding: gzip, deflate, br",
"accept-language: es-ES",
"cache-control: no-cache",
"content-type: text/html",
"content-type: application/json",
"user-agent",
"host",
"cookie",
"set-cookie"
];

let tablaDinamica = [];
let expandida = false;

function tamaño(str) {
    return new TextEncoder().encode(str).length;
}

function renderTablaEstatica() {
    let lista = expandida ? tablaEstatica : tablaEstatica.slice(0, 10);

    document.getElementById("tablaEstatica").innerHTML =
        lista.map((h,i) => `${i} → ${h}`).join("<br>");
}

function toggleTabla() {
    expandida = !expandida;
    renderTablaEstatica();
}

function comprimir() {

    let input = document.getElementById("input").value.split("\n");

    let resultadoHTML = "";
    let procesoHTML = "";

    let originalSize = 0;
    let compressedSize = 0;

    input.forEach(header => {

        if (!header.trim()) return;

        originalSize += tamaño(header);

        procesoHTML += `<b>${header}</b><br>`;

        let indexStatic = tablaEstatica.indexOf(header);

        if (indexStatic !== -1) {
            resultadoHTML += `<div class="index">index estático → ${indexStatic}</div>`;
            procesoHTML += `✔ Encontrado en tabla estática (índice ${indexStatic})<br><br>`;
            compressedSize += 2;
            return;
        }

        let indexDynamic = tablaDinamica.indexOf(header);

        if (indexDynamic !== -1) {
            resultadoHTML += `<div class="index">index dinámico → ${indexDynamic}</div>`;
            procesoHTML += `✔ Encontrado en tabla dinámica (índice ${indexDynamic})<br><br>`;
            compressedSize += 2;
            return;
        }

        tablaDinamica.push(header);

        resultadoHTML += `<div class="literal">literal → ${header}</div>`;
        procesoHTML += `➕ No encontrado → se guarda en tabla dinámica<br><br>`;

        compressedSize += tamaño(header);
    });

    document.getElementById("resultado").innerHTML = resultadoHTML;

    document.getElementById("tablaDinamica").innerHTML =
        tablaDinamica.map((h,i) => `${i} → ${h}`).join("<br>");

    document.getElementById("stats").innerHTML =
        `Original: ${originalSize} bytes<br>
         Comprimido: ${compressedSize} bytes<br>
         Ahorro: ${originalSize - compressedSize} bytes`;

    document.getElementById("proceso").innerHTML = procesoHTML;

    renderTablaEstatica();
}

function reset() {
    tablaDinamica = [];
    document.getElementById("resultado").innerHTML = "";
    document.getElementById("tablaDinamica").innerHTML = "";
    document.getElementById("stats").innerHTML = "";
    document.getElementById("proceso").innerHTML = "";
}

renderTablaEstatica();