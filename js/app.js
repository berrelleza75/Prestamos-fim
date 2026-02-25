// Datos compartidos entre el formulario y las vistas
const datos = {
  carreras: ["Ingeniería en Procesos", "Geodesia", "Ingeniería en Nanotecnología", "Software"],
  tiposSolicitante: ["Alumno", "Profesor", "Personal administrativo"],
  areas: ["Biblioteca", "Laboratorio de Cómputo", "Laboratorio de Física", "Laboratorio de Química", "Laboratorio de Suelos"],
  articulos: ["Proyector"]
};

// Guarda los datos en sessionStorage para que las vistas los lean
function guardarDatos() {
  sessionStorage.setItem("datos", JSON.stringify(datos));
}

// Carga los datos desde sessionStorage si existen
function cargarDatos() {
  const guardado = sessionStorage.getItem("datos");
  if (guardado) {
    const parsed = JSON.parse(guardado);
    datos.carreras = parsed.carreras;
    datos.tiposSolicitante = parsed.tiposSolicitante;
    datos.areas = parsed.areas;
    datos.articulos = parsed.articulos;
  }
}

// Construye los checkboxes de carrera
function construirCarreras() {
  const contenedor = document.getElementById("carreras-container");
  if (!contenedor) return;
  contenedor.innerHTML = "";
  datos.carreras.forEach(c => {
    const label = document.createElement("label");
    label.style.marginRight = "12px";
    label.innerHTML = "<input type='checkbox'> " + c;
    contenedor.appendChild(label);
  });
}

// Construye los radios de tipo de solicitante
function construirTipos() {
  const contenedor = document.getElementById("tipos-container");
  if (!contenedor) return;
  contenedor.innerHTML = "";
  datos.tiposSolicitante.forEach(t => {
    const label = document.createElement("label");
    label.style.marginRight = "12px";
    label.innerHTML = "<input type='radio' name='tipo'> " + t;
    contenedor.appendChild(label);
  });
}

// Llena un select con los items dados
function llenarSelect(selectId, items) {
  const sel = document.getElementById(selectId);
  if (!sel) return;
  const valorActual = sel.value;
  sel.innerHTML = "<option value=''>-- Seleccionar --</option>";
  items.forEach(item => {
    const opt = document.createElement("option");
    opt.value = item;
    opt.textContent = item;
    sel.appendChild(opt);
  });
  sel.value = valorActual;
}

// Abre una vista en la misma ventana
function abrirVista(url) {
  guardarDatos();
  window.location.href = url;
}

// Inicialización del formulario principal
window.onload = () => {
  cargarDatos();
  construirCarreras();
  construirTipos();
  llenarSelect("sel-area", datos.areas);
  llenarSelect("sel-articulo", datos.articulos);

  document.getElementById("nav-carreras").onclick = () => abrirVista("views/carreras.html");
  document.getElementById("nav-tipos").onclick = () => abrirVista("views/tipo-solicitante.html");
  document.getElementById("nav-areas").onclick = () => abrirVista("views/areas.html");
  document.getElementById("nav-articulos").onclick = () => abrirVista("views/articulos.html");
};