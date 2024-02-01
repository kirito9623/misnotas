document.addEventListener("DOMContentLoaded", cargarNotas);

function cargarNotas() {
    //Obtiene lista de notas del almacenamiento local.
    const listaNotas = obtenerNotas();
    const listaNotasElemento = document.getElementById("listaNotas");
    listaNotasElemento.innerHTML = "";
    listaNotas.forEach((nota, index) => {
        const li = document.createElement("li");
        const textarea = document.createElement("textarea");
        textarea.setAttribute("readonly", "true");
        textarea.id = `notaTexto`;
        textarea.value = nota;
        textarea.addEventListener("input", () => ajustarAlturaTextArea(textarea));

        const botonBorrar = document.createElement("button");
        botonBorrar.id = "botonborrar";
        botonBorrar.textContent = "Borrar";
        botonBorrar.addEventListener("click", () => eliminarNota(index));

        li.appendChild(textarea);
        li.appendChild(botonBorrar);
        listaNotasElemento.appendChild(li);

        ajustarAlturaTextArea(textarea); // Ajustar altura al cargar las notas
    });
}
function obtenerNotas() {
    return JSON.parse(localStorage.getItem("notas")) || [];
}

function agregarNota() {
    const notaText = document.getElementById("notaText").value;
    if (notaText.trim() !== "") {
        const listaNotas = obtenerNotas();
        listaNotas.push(notaText);
        localStorage.setItem("notas", JSON.stringify(listaNotas));
        cargarNotas();
        document.getElementById("notaText").value = "";
    }
}

function eliminarNota(index) {
    const listaNotas = obtenerNotas();
    listaNotas.splice(index, 1);
    localStorage.setItem("notas", JSON.stringify(listaNotas));
    cargarNotas();
}

function ajustarAlturaTextArea(textarea) {
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
}



