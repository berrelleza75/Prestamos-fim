// Lee los datos guardados desde el formulario principal
function cargarDatos() {
  const guardado = sessionStorage.getItem("datos");
  if (!guardado) return null;
  return JSON.parse(guardado);
}

// Guarda los datos actualizados
function guardarDatos(datos) {
  sessionStorage.setItem("datos", JSON.stringify(datos));
}

// Renderiza la lista de elementos con botón de eliminar
function renderizarLista(items, datos, clave) {
  const lista = document.getElementById("lista");
  lista.innerHTML = "";
  items.forEach((item, i) => {
    const li = document.createElement("li");
    li.innerHTML = "<span>" + item + "</span>";
    const btn = document.createElement("button");
    btn.className = "btn-eliminar";
    btn.textContent = "Eliminar";
    btn.onclick = () => {
      datos[clave].splice(i, 1);
      guardarDatos(datos);
      renderizarLista(datos[clave], datos, clave);
    };
    li.appendChild(btn);
    lista.appendChild(li);
  });
}

// Agrega un elemento nuevo a la lista
function agregar(datos, clave) {
  const input = document.getElementById("nuevo-item");
  const val = input.value.trim();
  if (!val) return;
  if (datos[clave].includes(val)) {
    alert("Ya existe ese elemento.");
    return;
  }
  datos[clave].push(val);
  guardarDatos(datos);
  input.value = "";
  renderizarLista(datos[clave], datos, clave);
}

// Regresa al formulario principal
function regresar() {
  window.location.href = "../index.html";
}