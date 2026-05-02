// esta tabla estática es un ejemplo
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

// función para calcular el tamaño en bytes de un string usanddo
function tamanio(str) {
    return new TextEncoder().encode(str).length; 
}

// función para mostrar solo los primeros 10 elementos 
function renderTablaEstatica() {
    let lista = expandida ? tablaEstatica : tablaEstatica.slice(0, 10);

    document.getElementById("tablaEstatica").innerHTML = lista.map((h,i) => `${i} → ${h}`).join("<br>"); // muestra el índice y el header
}

// función para alternar
function toggleTabla() {
    expandida = !expandida;
    renderTablaEstatica();
}

// esta funcion es la que procesa cada header y actualiza el resultado
function comprimir() {

    let input = document.getElementById("input").value.split("\n");

    let resultadoHTML = "";
    let procesoHTML = "";

    let originalSize = 0;
    let compressedSize = 0;
    let hopsHTML = "";
    
    input.forEach(header => { // se procesa cada header

        // se ignoran líneas vacías
        if (!header.trim()) return;

        originalSize += tamanio(header);

        procesoHTML += `<b>${header}</b><br>`;
        hopsHTML += `Cliente envia: ${header}<br>`;

        let indexStatic = tablaEstatica.indexOf(header); //busca el header en la tabla estática 
        if (indexStatic !== -1) {
            resultadoHTML += `<div class="index">index estático → ${indexStatic}</div>`;
            procesoHTML += ` Encontrado en tabla estática (índice ${indexStatic})<br><br>`;
            compressedSize += 2;// se asume que el índice se codifica en 2 bytes
            hopsHTML += ` Red<br> Servidor recibe (index estático ${indexStatic})<br><br>`;
            return;
        }

        let indexDynamic = tablaDinamica.indexOf(header); //busca el header en la tabla dinámica

        if (indexDynamic !== -1) {
            resultadoHTML += `<div class="index">index dinámico → ${indexDynamic}</div>`;
            procesoHTML += ` Encontrado en tabla dinámica (índice ${indexDynamic})<br><br>`;
            compressedSize += 2;
            hopsHTML += ` Red<br> Servidor recibe (index dinámico ${indexDynamic})<br><br>`;
            return;
        }

        tablaDinamica.push(header); // se guarda si no se encuentra en ninguna tabla

        resultadoHTML += `<div class="literal">literal → ${header}</div>`;
        procesoHTML += ` No encontrado → se guarda en tabla dinámica<br><br>`;
        compressedSize += tamanio(header); // sin compresión es el tamaño del header en bytes
        hopsHTML += ` Red<br> Servidor recibe (literal)<br><br>`;
    });

    document.getElementById("resultado").innerHTML = resultadoHTML; // se muestra el resultado de cada header indice o literal

    document.getElementById("tablaDinamica").innerHTML =
        tablaDinamica.map((h,i) => `${i} → ${h}`).join("<br>"); // lo que hace es mostrar la tabla dinámica con el índice y el header

    document.getElementById("stats").innerHTML =
        `Original: ${originalSize} bytes<br>
         Comprimido: ${compressedSize} bytes<br>
         Ahorro: ${originalSize - compressedSize} bytes`; // muestra estadísticas de tamaño original, comprimido y ahorro

    document.getElementById("proceso").innerHTML = procesoHTML; // muestra el proceso detallado de cada header
    document.getElementById("hops").innerHTML = hopsHTML;

    renderTablaEstatica(); 
}

// función para resetear todo a su estado inicial
function reset() {
    tablaDinamica = [];
    document.getElementById("resultado").innerHTML = "";
    document.getElementById("tablaDinamica").innerHTML = "";
    document.getElementById("stats").innerHTML = "";
    document.getElementById("proceso").innerHTML = "";
    document.getElementById("hops").innerHTML = "";
}

renderTablaEstatica();