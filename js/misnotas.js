document.addEventListener("DOMContentLoaded", cargarNotas);


function obtenerNotas() {
  return JSON.parse(localStorage.getItem("notas")) || [];
}

function cargarNotas() {
  //Obtiene lista de notas del almacenamiento local.
  const listaNotas = obtenerNotas();
  const listaNotasElemento = document.getElementById("lista-notas");
  listaNotasElemento.innerHTML = "";
  listaNotas.forEach((text,index) => {
    const li = crearElementoNota(text,index);
    listaNotasElemento.appendChild(li);
  });
}

function agregarNota() {
  const noteInput = document.getElementById("note-input");
  const notaText = noteInput.value;
  if (notaText.trim() === "") { 
  return alert("Esta nota esta vacia");
  }
  

  //Actualizar el local Storage
  const listaNotas = obtenerNotas();
  listaNotas.push(notaText);
  localStorage.setItem("notas", JSON.stringify(listaNotas));

  //Actualizar el DOM
  const listaNotasElemento = document.getElementById("lista-notas");
  const li = crearElementoNota(notaText, listaNotas.length - 1);
  listaNotasElemento.appendChild(li);

  noteInput.value = "";
  ajustarAlturaTextArea(noteInput);
}

function eliminarNota(elemento) {
  const listaNotasElemento = document.getElementById("lista-notas");
  const children = listaNotasElemento.children;

  //Actualizar el local Storage
  const listaNotas = obtenerNotas();
  listaNotas.splice([...children].indexOf(elemento), 1);
  localStorage.setItem("notas", JSON.stringify(listaNotas));
  //Actualizar el DOM
  listaNotasElemento.removeChild(elemento);
}

function ajustarAlturaTextArea(textarea) {
  textarea.style.height = "auto";
  textarea.style.height = `${textarea.scrollHeight}px`;
}

function crearElementoNota(texto,index) {
  const nuevaNota = document.createElement("li");
  const contentEl = document.createElement("pre");
 
  nuevaNota.className = "note"
  contentEl.className = "note-content";
  contentEl.innerHTML = texto;

  const botonBorrar = document.createElement("button");
  botonBorrar.className = "boton-borrar";
  botonBorrar.textContent = "Borrar";
  botonBorrar.addEventListener("click", () => eliminarNota(nuevaNota));

  const botonEditar = document.createElement("button");
  botonEditar.className = "boton-borrar";
  botonEditar.textContent = "Editar";
  botonEditar.addEventListener("click", () => editaElemento(index));


  nuevaNota.appendChild(contentEl);
  nuevaNota.appendChild(botonBorrar);
  nuevaNota.appendChild(botonEditar);

  return nuevaNota;
}

function editaElemento(index){
  const listanueva = obtenerNotas();
  listanueva[index] = prompt("Edita tu nota aqui");
  localStorage.setItem("notas", JSON.stringify(listanueva));
  cargarNotas();

}
