let tareas = [
  { id: 1, descripcion: "Estudiar JavaScript", completado: false },
  { id: 2, descripcion: "Hacer ejercicios de DOM", completado: true },
  { id: 3, descripcion: "Revisar tareas anteriores", completado: false }
];

function renderTareas() {
  const lista = document.getElementById("listaTareas");
  lista.innerHTML = "";

  tareas.forEach((tarea, index) => {
    const li = document.createElement("li");
    li.className = tarea.completado ? "realizada" : "";

    const span = document.createElement("span");
    span.textContent = `#${tarea.id} - ${tarea.descripcion}`;

    const botones = document.createElement("div");
    botones.className = "botones";

    const btnCompletar = document.createElement("button");
    btnCompletar.textContent = tarea.completado ? "✅" : "✔️";
    btnCompletar.onclick = () => cambiarEstado(index);

    const btnBorrar = document.createElement("button");
    btnBorrar.textContent = "🗑️";
    btnBorrar.onclick = () => eliminarTarea(index);

    botones.appendChild(btnCompletar);
    botones.appendChild(btnBorrar);

    li.appendChild(span);
    li.appendChild(botones);
    lista.appendChild(li);
  });

  actualizarResumen();
}

function agregarTarea() {
  const input = document.getElementById("nuevaTarea");
  const descripcion = input.value.trim();
  if (descripcion === "") return;

  const nueva = {
    id: Date.now(),
    descripcion: descripcion,
    completado: false
  };

  tareas.push(nueva);
  input.value = "";
  renderTareas();
}

function eliminarTarea(index) {
  tareas.splice(index, 1);
  renderTareas();
}

function cambiarEstado(index) {
  tareas[index].completado = !tareas[index].completado;
  renderTareas();
}

function actualizarResumen() {
  document.getElementById("totalTareas").textContent = tareas.length;
  const completadas = tareas.filter(t => t.completado).length;
  document.getElementById("tareasCompletadas").textContent = completadas;
}

// Inicializar
renderTareas();
