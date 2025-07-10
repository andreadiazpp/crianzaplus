// -----------------------------
// Variables globales
// -----------------------------
let hijos = [];
let notas = [];
let hijoSeleccionado = null;
let hijoSeleccionadoId = null;

// ----------------ークル-------------
// Pantalla: Bienvenida
// -----------------------------
function mostrarFormulario() {
  document.getElementById("pantalla-bienvenida").style.display = "none";
  document.getElementById("pantalla-agregar").style.display = "block";
}

// Mostrar / ocultar formulario
function mostrarFormularioHijo() {
  const formulario = document.getElementById("formulario-hijo");
  formulario.style.display = "block";
  formulario.style.opacity = "0";
  setTimeout(() => formulario.style.opacity = "1", 10);
}

function ocultarFormularioHijo() {
  const formulario = document.getElementById("formulario-hijo");
  formulario.style.opacity = "0";
  setTimeout(() => formulario.style.display = "none", 300);
}

// -----------------------------
// Guardar hijo
// -----------------------------
function guardarHijo() {
  const nombre = document.getElementById("nombreHijo").value.trim();
  const fecha = document.getElementById("fechaNacimientoHijo").value;

  if (nombre && fecha) {
    hijos.push({ nombre, fecha });

    // ✅ Seleccionar automáticamente al nuevo hijo
    window.hijoSeleccionado = nombre;
    window.hijoSeleccionadoId = nombre;

    mostrarListaHijos();
    mostrarMensaje("✅ ¡Hijo/a agregado correctamente!");
    document.getElementById("nombreHijo").value = "";
    document.getElementById("fechaNacimientoHijo").value = "";
    ocultarFormularioHijo();

    // ✅ Mostrar panel de opciones directamente
    document.getElementById("pantalla-hijos").style.display = "none";
    document.getElementById("panelHijoSeleccionado").style.display = "block";
    document.getElementById("nombreHijoSeleccionado").textContent = `${nombre}`;

  } else {
    alert("❗ Por favor completa ambos campos.");
  }
}

// -----------------------------
// Mostrar lista de hijos
// -----------------------------
function mostrarListaHijos() {
  const contenedor = document.getElementById("listaHijos");
  contenedor.innerHTML = "";

  hijos.forEach(hijo => {
    const boton = document.createElement("button");
    boton.textContent = `👶 ${hijo.nombre}`;
    boton.onclick = () => {
      window.hijoSeleccionado = hijo.nombre;
      window.hijoSeleccionadoId = hijo.nombre;

      document.getElementById("pantalla-hijos").style.display = "none";
      document.getElementById("panelHijoSeleccionado").style.display = "block";
      document.getElementById("nombreHijoSeleccionado").textContent = `${hijo.nombre}`;
    };
    contenedor.appendChild(boton);
  });
}

// -----------------------------
// Volver a lista de hijos
// -----------------------------
function volverAListaHijos() {
  document.getElementById("panelHijoSeleccionado").style.display = "none";
  document.getElementById("pantalla-hijos").style.display = "block";
}

// -----------------------------
// Mensaje de confirmación
// -----------------------------
function mostrarMensaje(texto) {
  const mensaje = document.getElementById("mensajeConfirmacion");
  mensaje.innerText = texto;
  mensaje.style.display = "block";
  setTimeout(() => {
    mensaje.style.display = "none";
    mensaje.innerText = "";
  }, 2500);
}

// -----------------------------
// Seleccionar hijo
// -----------------------------
function seleccionarHijo(index) {
  hijoSeleccionado = hijos[index];
  document.getElementById("nombreHijoSeleccionado").textContent = hijoSeleccionado.nombre;
  document.getElementById("pantalla-hijos").style.display = "none";
  document.getElementById("panelHijoSeleccionado").style.display = "block";
}

function volverAListaHijos() {
  document.getElementById("panelHijoSeleccionado").style.display = "none";
  document.getElementById("pantalla-hijos").style.display = "block";
}

// -----------------------------
// Mensaje visual
// -----------------------------
function mostrarMensaje(texto) {
  const mensaje = document.createElement("div");
  mensaje.innerText = texto;
  mensaje.style.position = "fixed";
  mensaje.style.bottom = "20px";
  mensaje.style.left = "50%";
  mensaje.style.transform = "translateX(-50%)";
  mensaje.style.backgroundColor = "#d1fae5";
  mensaje.style.color = "#065f46";
  mensaje.style.padding = "10px 20px";
  mensaje.style.borderRadius = "8px";
  mensaje.style.boxShadow = "0 2px 8px rgba(0,0,0,0.2)";
  document.body.appendChild(mensaje);
  setTimeout(() => mensaje.remove(), 2500);
}


// -----------------------------
// Mostrar opciones según la etapa del hijo
// -----------------------------
function mostrarOpcionesPorEtapa() {
  const etapa = window.etapaActual;

  const botones = [
    "botonNotas", "botonSueno", "botonAlimentacion", "botonChecklist",
    "botonContenido", "botonForo", "botonEstadisticas", "botonCitas",
    "botonEventos", "botonPrimerasVeces", "botonRecordatorios"
  ];

  botones.forEach(id => {
    const btn = document.getElementById(id);
    if (btn) btn.style.display = "none";
  });

  let visibles = [];

  if (etapa === "Bebé 👶") {
    visibles = ["botonNotas", "botonSueno", "botonAlimentacion", "botonPrimerasVeces", "botonCitas", "botonEventos"];
  } else if (etapa === "Preescolar 🎨") {
    visibles = ["botonNotas", "botonSueno", "botonAlimentacion", "botonChecklist", "botonContenido", "botonCitas", "botonEventos", "botonPrimerasVeces"];
  } else if (etapa === "Primaria 📘") {
    visibles = ["botonNotas", "botonChecklist", "botonContenido", "botonForo", "botonCitas", "botonEventos", "botonEstadisticas", "botonRecordatorios"];
  } else if (etapa === "Adolescente 💬") {
    visibles = ["botonNotas", "botonChecklist", "botonContenido", "botonForo", "botonCitas", "botonEventos", "botonRecordatorios"];
  }

  visibles.forEach(id => {
    const btn = document.getElementById(id);
    if (btn) btn.style.display = "inline-block";
  });
}
// -----------------------------
// Volver a lista de hijos
// -----------------------------
function volverAListaHijos() {
  document.getElementById("panelHijoSeleccionado").style.display = "none";
  document.getElementById("listaHijos").style.display = "block";
}
// -----------------------------
// SECCIÓN: NOTAS PERSONALIZADAS (Firebase + animación 💗)
// -----------------------------
function irANotas() {
  const nombre = window.hijoSeleccionado;
  if (!nombre) {
    alert("👶 Por favor, selecciona un hijo/a primero.");
    return;
  }
  hijoSeleccionadoId = nombre;
  document.getElementById("nombre-hijo-notas").textContent = nombre;
  document.getElementById("pantalla-agregar").style.display = "none";
  document.getElementById("notas-section").style.display = "block";
  cargarNotas(hijoSeleccionadoId);
}

function guardarNota(registroId = null) {
  const texto = document.getElementById("notaTexto").value.trim();
  if (!texto) {
    alert("❗ Escribe algo antes de guardar.");
    return;
  }

  const nuevaNota = {
    contenido: texto,
    fecha: new Date().toISOString(),
    recordatorio: "no"
  };

  const dbRef = firebase.database();
  const ruta = `notas/${window.hijoSeleccionadoId}`;
  const id = registroId || dbRef.ref().child(ruta).push().key;

  dbRef.ref(`${ruta}/${id}`).set(nuevaNota)
    .then(() => {
      document.getElementById("notaTexto").value = "";
      mostrarMensaje("✅ ¡Nota guardada!");
      mostrarCorazon("corazon-nota");
      cargarNotas(window.hijoSeleccionadoId);
    })
    .catch((error) => {
      console.error("Error al guardar nota:", error);
      alert("❌ Ocurrió un error al guardar.");
    });
}

function cargarNotas(hijoId) {
  const lista = document.getElementById("lista-notas");
  lista.innerHTML = "⏳ Cargando notas...";

  const dbRef = firebase.database();
  const ruta = `notas/${hijoId}`;

  dbRef.ref(ruta).once("value")
    .then((snapshot) => {
      const datos = snapshot.val();
      lista.innerHTML = "";

      if (!datos) {
        lista.innerHTML = "📭 No hay notas guardadas.";
        return;
      }

      Object.entries(datos).forEach(([id, nota]) => {
        const item = document.createElement("li");
        item.innerHTML = `
          <div style="background: #fff4fc; border-radius: 10px; padding: 10px; margin-bottom: 10px;">
            📝 ${nota.contenido}<br/>
            📅 ${new Date(nota.fecha).toLocaleDateString()}<br/><br/>
            <button onclick="editarNota('${id}')">✏️ Editar</button>
            <button onclick="eliminarNota('${id}')">🗑️ Eliminar</button>
          </div>
        `;
        lista.appendChild(item);
      });
    })
    .catch((error) => {
      console.error("Error al cargar notas:", error);
      lista.innerHTML = "❌ Error al cargar notas.";
    });
}

function editarNota(registroId) {
  const dbRef = firebase.database();
  const ruta = `notas/${window.hijoSeleccionadoId}/${registroId}`;

  dbRef.ref(ruta).once("value")
    .then((snapshot) => {
      const datos = snapshot.val();
      if (datos) {
        document.getElementById("notaTexto").value = datos.contenido || "";
      } else {
        alert("⚠️ No se encontró la nota.");
      }
    });
}

function eliminarNota(registroId) {
  if (!confirm("¿Eliminar esta nota?")) return;

  const dbRef = firebase.database();
  const ruta = `notas/${window.hijoSeleccionadoId}/${registroId}`;

  dbRef.ref(ruta).remove()
    .then(() => {
      alert("🗑️ Nota eliminada.");
      cargarNotas(window.hijoSeleccionadoId);
    })
    .catch((error) => {
      console.error("Error al eliminar nota:", error);
      alert("❌ Ocurrió un error al eliminar.");
    });
}

function volverDesdeNotas() {
  document.getElementById("notas-section").style.display = "none";
  document.getElementById("pantalla-agregar").style.display = "block";
}

function mostrarCorazon(idElemento) {
  const corazon = document.getElementById(idElemento);
  if (!corazon) return;
  corazon.style.display = "block";
  setTimeout(() => {
    corazon.style.display = "none";
  }, 1200);
}

function mostrarMensaje(texto) {
  alert(texto); // O puedes reemplazar por algo más visual si lo deseas
}
// -----------------------------
// PANTALLA: SUEÑO
// -----------------------------
function irASueno() {
  const nombre = window.hijoSeleccionado;

  if (!nombre) {
    alert("👶 Por favor, selecciona un hijo/a primero.");
    return;
  }

  document.getElementById("pantalla-agregar").style.display = "none";
  document.getElementById("pantalla-sueno").style.display = "block";

  const selector = document.getElementById("selectorHijo");
  selector.innerHTML = `
    <option disabled selected>Selecciona un hijo/a</option>
    ${hijos.map(hijo => `<option value="${hijo.nombre}">${hijo.nombre}</option>`).join("")}
  `;
}

function guardarSueno() {
  const nombre = document.getElementById("selectorHijo").value;
  const horaDormir = document.getElementById("horaDormir").value;
  const horaDespertar = document.getElementById("horaDespertar").value;
  const desperto = document.getElementById("despertoNoche").value;
  const toma = document.getElementById("pidioToma").value;

  if (!nombre || !horaDormir || !horaDespertar) {
    alert("🕒 Completa todos los campos de sueño.");
    return;
  }

  const dormir = convertirAHoras(horaDormir);
  const despertar = convertirAHoras(horaDespertar);
  let total = despertar - dormir;
  if (total < 0) total += 24;

  const resultado = `
    <p>🧒 <strong>${nombre}</strong> durmió de <strong>${horaDormir}</strong> a <strong>${horaDespertar}</strong>.</p>
    <p>🌙 Se despertó en la noche: <strong>${desperto}</strong></p>
    <p>🍼 Pidió toma: <strong>${toma}</strong></p>
    <p>💤 Total de sueño: <strong>${total.toFixed(2)} horas</strong></p>
  `;

  document.getElementById("resultadoSueno").innerHTML = resultado;
  mostrarMensaje("😴 ¡Sueño registrado!");
}

function volverDesdeSueno() {
  document.getElementById("pantalla-sueno").style.display = "none";
  document.getElementById("pantalla-agregar").style.display = "block";
}

function convertirAHoras(hora) {
  const [h, m] = hora.split(":").map(Number);
  return h + m / 60;
}

// -----------------------------
// SECCIÓN: ALIMENTACIÓN (Firebase + estilo cálido + emojis)
// -----------------------------
function irAAlimentacion() {
  const nombre = window.hijoSeleccionado;
  if (!nombre) {
    alert("👶 Por favor, selecciona un hijo/a primero.");
    return;
  }

  hijoSeleccionadoId = nombre;
  document.getElementById("nombre-hijo-alimentacion").textContent = nombre;
  document.getElementById("pantalla-agregar").style.display = "none";
  document.getElementById("alimentacion-section").style.display = "block";

  cargarRegistrosAlimentacion(hijoSeleccionadoId);
}

function mostrarFormularioAlimentacion(registroExistente = null, registroId = null) {
  const contenedor = document.getElementById("formulario-alimentacion");
  contenedor.innerHTML = `
    <form id="form-alimentacion" class="formulario-suave">
      <label>🍼 Tipo de alimentación:</label>
      <select name="tipo" required>
        <option value="Lactancia">🍼 Lactancia</option>
        <option value="Fórmula">🍼 Fórmula</option>
        <option value="Papilla">🥣 Papilla</option>
        <option value="Sólidos">🍲 Sólidos</option>
      </select>

      <label>⏰ Hora:</label>
      <input type="time" name="hora" required>

      <label>📏 Cantidad:</label>
      <input type="text" name="cantidad" placeholder="Ej: 150 ml" required>

      <label>⚠️ Reacciones (si hubo):</label>
      <select name="reacciones" multiple>
        <option value="normal">😊 Normal</option>
        <option value="vomito">🤮 Vómito</option>
        <option value="gases">💨 Gases</option>
        <option value="alergia">🌡️ Alergia</option>
      </select>

      <label>📝 Observaciones:</label>
      <textarea name="observaciones" rows="3" placeholder="Opcional..."></textarea>

      <br>
      <button type="submit" class="boton-guardar">💾 ${registroExistente ? 'Actualizar' : 'Guardar'}</button>
    </form>
    <div id="corazon-animado" class="corazon" style="display: none;">💗</div>
  `;

  const form = document.getElementById("form-alimentacion");

  if (registroExistente) {
    form.tipo.value = registroExistente.tipo;
    form.hora.value = registroExistente.hora;
    form.cantidad.value = registroExistente.cantidad;
    Array.from(form.reacciones.options).forEach(opt => {
      opt.selected = registroExistente.reacciones?.includes(opt.value);
    });
    form.observaciones.value = registroExistente.observaciones || "";
  }

  form.onsubmit = (e) => {
    e.preventDefault();
    guardarRegistroAlimentacion(registroId);
  };

  contenedor.style.display = "block";
}

function guardarRegistroAlimentacion(registroId = null) {
  const form = document.getElementById("form-alimentacion");
  const tipo = form.tipo.value;
  const hora = form.hora.value;
  const cantidad = form.cantidad.value;
  const reacciones = Array.from(form.reacciones.selectedOptions).map(opt => opt.value);
  const observaciones = form.observaciones.value;
  const fecha = new Date().toISOString().split("T")[0];

  const nuevoRegistro = {
    tipo,
    hora,
    cantidad,
    reacciones,
    observaciones,
    fecha
  };

  const dbRef = firebase.database();
  const ruta = `alimentacion/${window.hijoSeleccionadoId}`;
  const id = registroId || dbRef.ref().child(ruta).push().key;

  dbRef.ref(`${ruta}/${id}`).set(nuevoRegistro)
    .then(() => {
      mostrarCorazonAnimado();
      mostrarMensaje(registroId ? "✅ Registro actualizado." : "✅ Registro guardado.");
      form.reset();
      document.getElementById("formulario-alimentacion").style.display = "none";
      cargarRegistrosAlimentacion(window.hijoSeleccionadoId);
    })
    .catch((error) => {
      console.error("Error al guardar:", error);
      alert("❌ Error al guardar en Firebase.");
    });
}

function cargarRegistrosAlimentacion(hijoId) {
  const lista = document.getElementById("lista-alimentacion");
  lista.innerHTML = "⏳ Cargando...";

  const dbRef = firebase.database();
  const ruta = `alimentacion/${hijoId}`;

  dbRef.ref(ruta).once("value")
    .then((snapshot) => {
      const datos = snapshot.val();
      lista.innerHTML = "";

      if (!datos) {
        lista.innerHTML = "📭 No hay registros aún.";
        return;
      }

      Object.entries(datos).forEach(([id, reg]) => {
        const item = document.createElement("li");
        item.innerHTML = `
          <strong>🍼 ${reg.tipo}</strong><br>
          ⏰ ${reg.hora} — 📏 ${reg.cantidad}<br>
          ⚠️ ${formatearReacciones(reg.reacciones)}<br>
          📝 ${reg.observaciones || "Sin observaciones"}<br>
          📅 ${reg.fecha}<br>
          <button onclick="editarRegistroAlimentacion('${id}')">✏️ Editar</button>
          <button onclick="eliminarRegistroAlimentacion('${id}')">🗑️ Eliminar</button>
          <hr>
        `;
        lista.appendChild(item);
      });
    })
    .catch((error) => {
      console.error("Error al cargar registros:", error);
      lista.innerHTML = "❌ Error al cargar datos.";
    });
}

function editarRegistroAlimentacion(registroId) {
  const dbRef = firebase.database();
  const ruta = `alimentacion/${window.hijoSeleccionadoId}/${registroId}`;

  dbRef.ref(ruta).once("value")
    .then((snapshot) => {
      const datos = snapshot.val();
      if (datos) {
        mostrarFormularioAlimentacion(datos, registroId);
      } else {
        alert("❌ No se encontró el registro.");
      }
    });
}

function eliminarRegistroAlimentacion(registroId) {
  if (!confirm("¿Eliminar este registro?")) return;

  const dbRef = firebase.database();
  const ruta = `alimentacion/${window.hijoSeleccionadoId}/${registroId}`;

  dbRef.ref(ruta).remove()
    .then(() => {
      alert("🗑️ Registro eliminado.");
      cargarRegistrosAlimentacion(window.hijoSeleccionadoId);
    })
    .catch((error) => {
      console.error("Error al eliminar:", error);
      alert("❌ Error al eliminar.");
    });
}

function formatearReacciones(reacciones) {
  if (!reacciones || reacciones.length === 0) return "😊 Ninguna";
  return reacciones.map(r => {
    switch (r) {
      case "normal": return "😊 Normal";
      case "vomito": return "🤮 Vómito";
      case "gases": return "💨 Gases";
      case "alergia": return "🌡️ Alergia";
      default: return r;
    }
  }).join(", ");
}

function volverDesdeAlimentacion() {
  document.getElementById("alimentacion-section").style.display = "none";
  document.getElementById("pantalla-agregar").style.display = "block";
}
  // -----------------------------
  // SECCIÓN: RUTINAS (Firebase + emojis)
  // -----------------------------
  function irARutinas() {
    const nombre = window.hijoSeleccionado;
    if (!nombre) {
      alert("👶 Por favor, selecciona un hijo/a primero.");
      return;
    }

    document.getElementById("pantalla-agregar").style.display = "none";
    document.getElementById("rutinas-section").style.display = "block";
    document.getElementById("nombre-hijo-rutinas").textContent = nombre;

    window.hijoSeleccionadoId = nombre;
    cargarRegistrosRutinas(nombre);
  }

  function mostrarFormularioRutina(registroExistente = null, registroId = null) {
    const contenedor = document.getElementById("formulario-rutina");
    const hoy = new Date().toISOString().split("T")[0];

    contenedor.innerHTML = `
      <form id="form-rutina">
        <label>📅 Fecha:</label>
        <input type="date" name="fecha" value="${registroExistente?.fecha || hoy}" required />

        <label>📝 Actividad:</label>
        <input type="text" name="actividad" placeholder="Ej: Bañarse, leer cuento..." value="${registroExistente?.actividad || ''}" required />

        <label>⏰ Hora:</label>
        <input type="time" name="hora" value="${registroExistente?.hora || ''}" required />

        <label>🔁 ¿Repetir diariamente?</label>
        <select name="repetir">
          <option value="no" ${registroExistente?.repetir === "no" ? "selected" : ""}>❌ No</option>
          <option value="si" ${registroExistente?.repetir === "si" ? "selected" : ""}>✅ Sí</option>
        </select>

        <label>📝 Observaciones:</label>
        <textarea name="observaciones" rows="3" placeholder="Opcional...">${registroExistente?.observaciones || ''}</textarea>

        <br/><br/>
        <button type="submit">💾 ${registroExistente ? 'Actualizar' : 'Guardar rutina'}</button>
      </form>
    `;

    contenedor.style.display = "block";

    const form = document.getElementById("form-rutina");
    form.onsubmit = (e) => {
      e.preventDefault();
      guardarRegistroRutina(registroId);
    };
  }

  function guardarRegistroRutina(registroId = null) {
    const form = document.getElementById("form-rutina");

    const nuevaRutina = {
      fecha: form.fecha.value,
      actividad: form.actividad.value,
      hora: form.hora.value,
      repetir: form.repetir.value,
      observaciones: form.observaciones.value
    };

    if (!window.hijoSeleccionadoId) {
      alert("⚠️ No se ha seleccionado un hijo.");
      return;
    }

    const db = firebase.database();
    const ruta = `rutinas/${window.hijoSeleccionadoId}`;
    const id = registroId || db.ref().child(ruta).push().key;

    db.ref(`${ruta}/${id}`).set(nuevaRutina)
      .then(() => {
        alert(registroId ? "✅ Rutina actualizada." : "✅ Rutina guardada.");
        form.reset();
        document.getElementById("formulario-rutina").style.display = "none";
        cargarRegistrosRutinas(window.hijoSeleccionadoId);
      })
      .catch((error) => {
        console.error("Error al guardar rutina:", error);
        alert("❌ Ocurrió un error al guardar.");
      });
  }

  function cargarRegistrosRutinas(hijoId) {
    const lista = document.getElementById("lista-rutinas");
    lista.innerHTML = "⏳ Cargando rutinas...";

    const db = firebase.database();
    const ruta = `rutinas/${hijoId}`;

    db.ref(ruta).once("value")
      .then((snapshot) => {
        const datos = snapshot.val();
        lista.innerHTML = "";

        if (!datos) {
          lista.innerHTML = "📭 No hay rutinas registradas.";
          return;
        }

        Object.entries(datos).forEach(([id, rutina]) => {
          const item = document.createElement("li");
          item.innerHTML = `
            📅 ${rutina.fecha} — ⏰ ${rutina.hora}<br>
            📝 <strong>${rutina.actividad}</strong><br>
            🔁 Repetir: ${rutina.repetir === "si" ? "✅ Sí" : "❌ No"}<br>
            📝 ${rutina.observaciones || "Sin observaciones"}<br>
            <button onclick="editarRegistroRutina('${id}')">✏️ Editar</button>
            <button onclick="eliminarRegistroRutina('${id}')">🗑️ Eliminar</button>
            <hr>
          `;
          lista.appendChild(item);
        });
      })
      .catch((error) => {
        console.error("Error al cargar rutinas:", error);
        lista.innerHTML = "❌ Error al cargar rutinas.";
      });
  }

  function editarRegistroRutina(registroId) {
    const db = firebase.database();
    const ruta = `rutinas/${window.hijoSeleccionadoId}/${registroId}`;

    db.ref(ruta).once("value")
      .then((snapshot) => {
        const datos = snapshot.val();
        if (datos) {
          mostrarFormularioRutina(datos, registroId);
        } else {
          alert("⚠️ No se encontró la rutina.");
        }
      });
  }

  function eliminarRegistroRutina(registroId) {
    if (!confirm("¿Eliminar esta rutina?")) return;

    const db = firebase.database();
    const ruta = `rutinas/${window.hijoSeleccionadoId}/${registroId}`;

    db.ref(ruta).remove()
      .then(() => {
        alert("🗑️ Rutina eliminada.");
        cargarRegistrosRutinas(window.hijoSeleccionadoId);
      })
      .catch((error) => {
        console.error("Error al eliminar rutina:", error);
        alert("❌ Ocurrió un error al eliminar.");
      });
  }

  function volverDesdeRutinas() {
    document.getElementById("rutinas-section").style.display = "none";
    document.getElementById("pantalla-agregar").style.display = "block";
  }
// -----------------------------
// SECCIÓN: SÍNTOMAS (con Firebase, estilo cálido y corazón animado)
// -----------------------------
function irASintomas() {
  const nombre = window.hijoSeleccionado;
  if (!nombre) {
    alert("👶 Por favor, selecciona un hijo/a primero.");
    return;
  }
  hijoSeleccionadoId = nombre;
  document.getElementById("nombre-hijo-sintomas").textContent = nombre;

  document.getElementById("pantalla-agregar").style.display = "none";
  document.getElementById("sintomas-section").style.display = "block";

  cargarRegistrosSintomas(hijoSeleccionadoId);
}

function mostrarFormularioSintomas(registroExistente = null, registroId = null) {
  const contenedor = document.getElementById("formulario-sintomas");
  const hoy = new Date().toISOString().split("T")[0];

  contenedor.innerHTML = `
    <form id="form-sintomas" class="formulario-contenedor form-color-suave">
      <label>📅 Fecha:</label>
      <input type="date" name="fecha" value="${registroExistente?.fecha || hoy}" required />

      <label>🤒 Síntoma principal:</label>
      <input type="text" name="sintoma" placeholder="Ej: Fiebre, tos..." value="${registroExistente?.sintoma || ''}" required />

      <label>📊 Gravedad:</label>
      <select name="gravedad" required>
        <option value="">Selecciona</option>
        <option value="leve" ${registroExistente?.gravedad === "leve" ? "selected" : ""}>🟢 Leve</option>
        <option value="moderado" ${registroExistente?.gravedad === "moderado" ? "selected" : ""}>🟡 Moderado</option>
        <option value="grave" ${registroExistente?.gravedad === "grave" ? "selected" : ""}>🔴 Grave</option>
      </select>

      <label>📝 Observaciones:</label>
      <textarea name="observaciones" rows="3" placeholder="Ej: Dolor de cabeza, vómito...">${registroExistente?.observaciones || ''}</textarea>

      <label>🏥 ¿Tuvo cita médica?</label>
      <select name="cita" required>
        <option value="no" ${registroExistente?.cita === "no" ? "selected" : ""}>❌ No</option>
        <option value="si" ${registroExistente?.cita === "si" ? "selected" : ""}>✅ Sí</option>
      </select>

      <label>🧑‍⚕️ Diagnóstico (opcional):</label>
      <input type="text" name="diagnostico" placeholder="Ej: Infección viral" value="${registroExistente?.diagnostico || ''}" />

      <br/>
      <button type="submit" class="boton-guardar">💾 ${registroExistente ? 'Actualizar' : 'Guardar síntoma'}</button>
      <div class="corazonito" id="corazonSintoma">💗</div>
    </form>
  `;

  const form = document.getElementById("form-sintomas");
  form.onsubmit = (e) => {
    e.preventDefault();
    guardarRegistroSintomas(registroId);
  };

  contenedor.style.display = "block";
}

function guardarRegistroSintomas(registroId = null) {
  const form = document.getElementById("form-sintomas");

  const nuevoRegistro = {
    fecha: form.fecha.value,
    sintoma: form.sintoma.value.trim(),
    gravedad: form.gravedad.value,
    observaciones: form.observaciones.value.trim(),
    cita: form.cita.value,
    diagnostico: form.diagnostico.value.trim()
  };

  const dbRef = firebase.database();
  const ruta = `sintomas/${window.hijoSeleccionadoId}`;
  const id = registroId || dbRef.ref().child(ruta).push().key;

  dbRef.ref(`${ruta}/${id}`).set(nuevoRegistro)
    .then(() => {
      animarCorazon("corazonSintoma");
      mostrarMensaje(registroId ? "✅ Síntoma actualizado" : "✅ Síntoma guardado");
      form.reset();
      document.getElementById("formulario-sintomas").style.display = "none";
      cargarRegistrosSintomas(window.hijoSeleccionadoId);
    })
    .catch((error) => {
      console.error("Error al guardar síntoma:", error);
      alert("❌ Ocurrió un error al guardar.");
    });
}

function cargarRegistrosSintomas(hijoId) {
  const lista = document.getElementById("lista-sintomas");
  lista.innerHTML = "⏳ Cargando síntomas...";

  const dbRef = firebase.database();
  const ruta = `sintomas/${hijoId}`;

  dbRef.ref(ruta).once("value")
    .then((snapshot) => {
      const datos = snapshot.val();
      lista.innerHTML = "";

      if (!datos) {
        lista.innerHTML = "📭 No hay síntomas registrados.";
        return;
      }

      Object.entries(datos).forEach(([id, s]) => {
        const item = document.createElement("li");
        item.classList.add("registro-lista");
        item.innerHTML = `
          📅 ${s.fecha} — 🤒 <strong>${s.sintoma}</strong><br>
          📊 Gravedad: ${formatearGravedad(s.gravedad)}<br>
          📝 ${s.observaciones || "Sin observaciones"}<br>
          🏥 Cita médica: ${s.cita === "si" ? "✅ Sí" : "❌ No"}<br>
          🧑‍⚕️ Diagnóstico: ${s.diagnostico || "No especificado"}<br>
          <button onclick="editarRegistroSintomas('${id}')">✏️ Editar</button>
          <button onclick="eliminarRegistroSintomas('${id}')">🗑️ Eliminar</button>
          <hr>
        `;
        lista.appendChild(item);
      });
    })
    .catch((error) => {
      console.error("Error al cargar síntomas:", error);
      lista.innerHTML = "❌ Error al cargar síntomas.";
    });
}

function editarRegistroSintomas(registroId) {
  const dbRef = firebase.database();
  const ruta = `sintomas/${window.hijoSeleccionadoId}/${registroId}`;

  dbRef.ref(ruta).once("value")
    .then((snapshot) => {
      const datos = snapshot.val();
      if (datos) {
        mostrarFormularioSintomas(datos, registroId);
      } else {
        alert("⚠️ No se encontró el registro.");
      }
    });
}

function eliminarRegistroSintomas(registroId) {
  if (!confirm("¿Eliminar este síntoma?")) return;

  const dbRef = firebase.database();
  const ruta = `sintomas/${window.hijoSeleccionadoId}/${registroId}`;

  dbRef.ref(ruta).remove()
    .then(() => {
      alert("🗑️ Síntoma eliminado.");
      cargarRegistrosSintomas(window.hijoSeleccionadoId);
    })
    .catch((error) => {
      console.error("Error al eliminar síntoma:", error);
      alert("❌ Ocurrió un error al eliminar.");
    });
}

function formatearGravedad(nivel) {
  switch (nivel) {
    case "leve": return "🟢 Leve";
    case "moderado": return "🟡 Moderado";
    case "grave": return "🔴 Grave";
    default: return nivel;
  }
}

function volverDesdeSintomas() {
  document.getElementById("sintomas-section").style.display = "none";
  document.getElementById("pantalla-agregar").style.display = "block";
}

// -----------------------------
// SECCIÓN: CITAS MÉDICAS (con Firebase, emojis, estilo cálido y corazón animado)
// -----------------------------
let citasMedicas = [];

function irACitasMedicas() {
  const nombre = window.hijoSeleccionado;
  if (!nombre) {
    alert("👶 Por favor, selecciona un hijo/a primero.");
    return;
  }
  hijoSeleccionadoId = nombre;
  document.getElementById("nombre-hijo-citas").textContent = nombre;

  document.getElementById("pantalla-agregar").style.display = "none";
  document.getElementById("citas-section").style.display = "block";

  cargarRegistrosCitas(hijoSeleccionadoId);
}

function mostrarFormularioCitas(registroExistente = null, registroId = null) {
  const contenedor = document.getElementById("formulario-citas");
  const hoy = new Date().toISOString().split("T")[0];

  contenedor.innerHTML = `
    <form id="form-citas">
      <label>📅 Fecha:</label>
      <input type="date" name="fecha" value="${registroExistente?.fecha || hoy}" required />

      <label>⏰ Hora:</label>
      <input type="time" name="hora" value="${registroExistente?.hora || ''}" required />

      <label>👩‍⚕️ Tipo de cita:</label>
      <input type="text" name="tipo" placeholder="Ej: Vacuna, revisión, dentista..." value="${registroExistente?.tipo || ''}" required />

      <label>📍 Lugar:</label>
      <input type="text" name="lugar" placeholder="Ej: Clínica ABC" value="${registroExistente?.lugar || ''}" />

      <label>📝 Observaciones:</label>
      <textarea name="observaciones" placeholder="Opcional...">${registroExistente?.observaciones || ''}</textarea>

      <label>🔔 Recordatorio:</label>
      <select name="recordatorio">
        <option value="no" ${registroExistente?.recordatorio === "no" ? "selected" : ""}>❌ No</option>
        <option value="dia-antes" ${registroExistente?.recordatorio === "dia-antes" ? "selected" : ""}>📆 1 día antes</option>
        <option value="hora-antes" ${registroExistente?.recordatorio === "hora-antes" ? "selected" : ""}>⏰ 1 hora antes</option>
      </select>

      <br/><br/>
      <button type="submit">💾 ${registroExistente ? 'Actualizar cita' : 'Guardar cita'}</button>
    </form>
  `;

  const form = document.getElementById("form-citas");
  form.onsubmit = (e) => {
    e.preventDefault();
    guardarRegistroCitas(registroId);
  };

  contenedor.style.display = "block";
}

function guardarRegistroCitas(registroId = null) {
  const form = document.getElementById("form-citas");

  const nuevaCita = {
    fecha: form.fecha.value,
    hora: form.hora.value,
    tipo: form.tipo.value,
    lugar: form.lugar.value,
    observaciones: form.observaciones.value,
    recordatorio: form.recordatorio.value || "no"
  };

  const dbRef = firebase.database();
  const ruta = `citasMedicas/${window.hijoSeleccionadoId}`;
  const id = registroId || dbRef.ref().child(ruta).push().key;

  dbRef.ref(`${ruta}/${id}`).set(nuevaCita)
    .then(() => {
      mostrarMensaje(registroId ? "✅ Cita actualizada" : "✅ Cita guardada");
      mostrarCorazonAnimado("corazonCitas");
      form.reset();
      document.getElementById("formulario-citas").style.display = "none";
      cargarRegistrosCitas(window.hijoSeleccionadoId);
    })
    .catch((error) => {
      console.error("Error al guardar cita:", error);
      alert("❌ Ocurrió un error al guardar.");
    });
}

function cargarRegistrosCitas(hijoId) {
  const lista = document.getElementById("lista-citas");
  lista.innerHTML = "⏳ Cargando citas...";

  const dbRef = firebase.database();
  const ruta = `citasMedicas/${hijoId}`;

  dbRef.ref(ruta).once("value")
    .then((snapshot) => {
      const datos = snapshot.val();
      lista.innerHTML = "";

      if (!datos) {
        lista.innerHTML = "📭 No hay citas registradas.";
        return;
      }

      Object.entries(datos).forEach(([id, cita]) => {
        const item = document.createElement("li");
        item.innerHTML = `
          <strong>📅 ${cita.fecha}</strong> ⏰ ${cita.hora}<br>
          👩‍⚕️ ${cita.tipo}<br>
          ${cita.lugar ? `📍 ${cita.lugar}<br>` : ""}
          ${cita.observaciones ? `📝 ${cita.observaciones}<br>` : ""}
          🔔 Recordatorio: ${formatearRecordatorio(cita.recordatorio)}<br>
          <button onclick="editarRegistroCitas('${id}')">✏️ Editar</button>
          <button onclick="eliminarRegistroCitas('${id}')">🗑️ Eliminar</button>
          <hr>
        `;
        lista.appendChild(item);
      });
    })
    .catch((error) => {
      console.error("Error al cargar citas:", error);
      lista.innerHTML = "❌ Error al cargar citas.";
    });
}

function editarRegistroCitas(registroId) {
  const dbRef = firebase.database();
  const ruta = `citasMedicas/${window.hijoSeleccionadoId}/${registroId}`;

  dbRef.ref(ruta).once("value")
    .then((snapshot) => {
      const datos = snapshot.val();
      if (datos) {
        mostrarFormularioCitas(datos, registroId);
      } else {
        alert("⚠️ No se encontró la cita.");
      }
    });
}

function eliminarRegistroCitas(registroId) {
  if (!confirm("¿Eliminar esta cita?")) return;

  const dbRef = firebase.database();
  const ruta = `citasMedicas/${window.hijoSeleccionadoId}/${registroId}`;

  dbRef.ref(ruta).remove()
    .then(() => {
      alert("🗑️ Cita eliminada.");
      cargarRegistrosCitas(window.hijoSeleccionadoId);
    })
    .catch((error) => {
      console.error("Error al eliminar cita:", error);
      alert("❌ Ocurrió un error al eliminar.");
    });
}

function formatearRecordatorio(valor) {
  switch (valor) {
    case "dia-antes": return "📆 1 día antes";
    case "hora-antes": return "⏰ 1 hora antes";
    default: return "❌ No";
  }
}

function volverDesdeCitas() {
  document.getElementById("citas-section").style.display = "none";
  document.getElementById("pantalla-agregar").style.display = "block";
}

// -----------------------------
// SECCIÓN: RECORDATORIOS
// -----------------------------
function cargarRecordatorios() {
  const contenedor = document.getElementById("lista-recordatorios");
  contenedor.innerHTML = "⏳ Cargando recordatorios...";

  const dbRef = firebase.database();

  // Citas con recordatorio activado
  dbRef.ref(`citasMedicas/${window.hijoSeleccionadoId}`).once("value", (snapshot) => {
    const datos = snapshot.val();
    if (datos) {
      Object.entries(datos).forEach(([id, cita]) => {
        if (cita.recordatorio !== "no") {
          const li = document.createElement("li");
          li.innerHTML = `
            🩺 <strong>${cita.tipo}</strong><br>
            📅 ${cita.fecha} ⏰ ${cita.hora}<br>
            🔔 ${formatearRecordatorio(cita.recordatorio)}
          `;
          contenedor.appendChild(li);
        }
      });
    }
  });

  // Eventos con recordatorio activado
  dbRef.ref(`eventos/${window.hijoSeleccionadoId}`).once("value", (snapshot) => {
    const datos = snapshot.val();
    if (datos) {
      Object.entries(datos).forEach(([id, evento]) => {
        if (evento.recordatorio !== "no") {
          const li = document.createElement("li");
          li.innerHTML = `
            📍 <strong>${evento.titulo}</strong><br>
            📅 ${evento.fecha}<br>
            🔔 ${formatearRecordatorio(evento.recordatorio)}
          `;
          contenedor.appendChild(li);
        }
      });
    }
  });

  // Notas con recordatorio activado
  dbRef.ref(`notas/${window.hijoSeleccionadoId}`).once("value", (snapshot) => {
    const datos = snapshot.val();
    if (datos) {
      Object.entries(datos).forEach(([id, nota]) => {
        if (nota.recordatorio !== "no") {
          const li = document.createElement("li");
          li.innerHTML = `
            📝 <strong>Nota importante</strong><br>
            "${nota.contenido}"<br>
            📅 ${new Date(nota.fecha).toLocaleDateString()}<br>
            🔔 ${formatearRecordatorio(nota.recordatorio)}
          `;
          contenedor.appendChild(li);
        }
      });
    }
  });

  ocultarTodasLasPantallas();
  document.getElementById("recordatorios-section").style.display = "block";
}

// -----------------------------
// Helper function to hide all screens
// -----------------------------
function ocultarTodasLasPantallas() {
  const pantallas = [
    "pantalla-bienvenida", "pantalla-agregar", "pantalla-sueno", 
    "notas-section", "alimentacion-section", "sintomas-section",
    "primeras-veces-section", "citas-section", "eventos-section",
    "rutinas-section", "checklist-section", "contenido-section",
    "foro-section", "estadisticas-section", "recordatorios-section"
  ];

  pantallas.forEach(id => {
    const elemento = document.getElementById(id);
    if (elemento) elemento.style.display = "none";
  });
}

// -----------------------------
// SECCIÓN: EVENTOS IMPORTANTES (Firebase + emojis + recordatorios)
// -----------------------------
let eventosImportantes = [];

function irAEventosImportantes() {
  const nombre = window.hijoSeleccionado;
  if (!nombre) {
    alert("👶 Por favor, selecciona un hijo/a primero.");
    return;
  }
  hijoSeleccionadoId = nombre;
  document.getElementById("nombre-hijo-eventos").textContent = nombre;

  document.getElementById("pantalla-agregar").style.display = "none";
  document.getElementById("eventos-section").style.display = "block";

  cargarRegistrosEventos(hijoSeleccionadoId);
}

function mostrarFormularioEventos(registroExistente = null, registroId = null) {
  const contenedor = document.getElementById("formulario-eventos");
  const hoy = new Date().toISOString().split("T")[0];

  contenedor.innerHTML = `
    <form id="form-eventos">
      <label>📅 Fecha del evento:</label>
      <input type="date" name="fecha" value="${registroExistente?.fecha || hoy}" required />

      <label>🎉 Nombre del evento:</label>
      <input type="text" name="titulo" placeholder="Ej: Cumpleaños, fiesta, show escolar..." value="${registroExistente?.titulo || ''}" required />

      <label>📍 Lugar:</label>
      <input type="text" name="lugar" placeholder="Ej: Salón infantil, escuela..." value="${registroExistente?.lugar || ''}" />

      <label>🔔 Recordatorio:</label>
      <select name="recordatorio">
        <option value="no" ${registroExistente?.recordatorio === "no" ? "selected" : ""}>❌ No</option>
        <option value="dia-antes" ${registroExistente?.recordatorio === "dia-antes" ? "selected" : ""}>📆 1 día antes</option>
        <option value="hora-antes" ${registroExistente?.recordatorio === "hora-antes" ? "selected" : ""}>⏰ 1 hora antes</option>
      </select>

      <label>📝 Descripción:</label>
      <textarea name="descripcion" placeholder="Opcional...">${registroExistente?.descripcion || ''}</textarea>

      <br/>
      <button type="submit">💾 ${registroExistente ? 'Actualizar' : 'Guardar evento'}</button>
    </form>
  `;

  const form = document.getElementById("form-eventos");
  form.onsubmit = (e) => {
    e.preventDefault();
    guardarRegistroEventos(registroId);
  };

  contenedor.style.display = "block";
}

function guardarRegistroEventos(registroId = null) {
  const form = document.getElementById("form-eventos");

  const nuevoEvento = {
    fecha: form.fecha.value,
    titulo: form.titulo.value,
    lugar: form.lugar.value,
    descripcion: form.descripcion.value,
    recordatorio: form.recordatorio.value || "no"
  };

  const dbRef = firebase.database();
  const ruta = `eventos/${window.hijoSeleccionadoId}`;
  const id = registroId || dbRef.ref().child(ruta).push().key;

  dbRef.ref(`${ruta}/${id}`).set(nuevoEvento)
    .then(() => {
      mostrarMensaje(registroId ? "✅ Evento actualizado" : "✅ Evento guardado");
      form.reset();
      document.getElementById("formulario-eventos").style.display = "none";
      cargarRegistrosEventos(window.hijoSeleccionadoId);
    })
    .catch((error) => {
      console.error("Error al guardar evento:", error);
      alert("❌ Ocurrió un error al guardar.");
    });
}

function cargarRegistrosEventos(hijoId) {
  const lista = document.getElementById("lista-eventos");
  lista.innerHTML = "⏳ Cargando eventos...";

  const dbRef = firebase.database();
  const ruta = `eventos/${hijoId}`;

  dbRef.ref(ruta).once("value")
    .then((snapshot) => {
      const datos = snapshot.val();
      lista.innerHTML = "";

      if (!datos) {
        lista.innerHTML = "📭 No hay eventos registrados.";
        return;
      }

      Object.entries(datos).forEach(([id, evento]) => {
        const item = document.createElement("li");
        item.innerHTML = `
          📅 ${evento.fecha} — 🎈 <strong>${evento.titulo}</strong><br>
          ${evento.lugar ? `📍 ${evento.lugar}<br>` : ""}
          ${evento.descripcion ? `📝 ${evento.descripcion}<br>` : ""}
          🔔 Recordatorio: ${formatearRecordatorio(evento.recordatorio)}<br>
          <button onclick="editarRegistroEventos('${id}')">✏️ Editar</button>
          <button onclick="eliminarRegistroEventos('${id}')">🗑️ Eliminar</button>
          <hr>
        `;
        lista.appendChild(item);
      });
    })
    .catch((error) => {
      console.error("Error al cargar eventos:", error);
      lista.innerHTML = "❌ Error al cargar eventos.";
    });
}

function editarRegistroEventos(registroId) {
  const dbRef = firebase.database();
  const ruta = `eventos/${window.hijoSeleccionadoId}/${registroId}`;

  dbRef.ref(ruta).once("value")
    .then((snapshot) => {
      const datos = snapshot.val();
      if (datos) {
        mostrarFormularioEventos(datos, registroId);
      } else {
        alert("⚠️ No se encontró el evento.");
      }
    });
}

function eliminarRegistroEventos(registroId) {
  if (!confirm("¿Eliminar este evento?")) return;

  const dbRef = firebase.database();
  const ruta = `eventos/${window.hijoSeleccionadoId}/${registroId}`;

  dbRef.ref(ruta).remove()
    .then(() => {
      alert("🗑️ Evento eliminado.");
      cargarRegistrosEventos(window.hijoSeleccionadoId);
    })
    .catch((error) => {
      console.error("Error al eliminar evento:", error);
      alert("❌ Ocurrió un error al eliminar.");
    });
}

function volverDesdeEventos() {
  document.getElementById("eventos-section").style.display = "none";
  document.getElementById("pantalla-agregar").style.display = "block";
}

// -----------------------------
// SECCIÓN: CHECKLIST (Firebase + emojis)
// -----------------------------
// Fix the existing irAChecklist function to use proper function definition
function irAChecklist() {
  const nombre = window.hijoSeleccionado;
  if (!nombre) {
    alert("👶 Por favor, selecciona un hijo/a primero.");
    return;
  }

  document.getElementById("pantalla-agregar").style.display = "none";
  document.getElementById("checklist-section").style.display = "block";
  document.getElementById("nombre-hijo-checklist").textContent = nombre;

  window.hijoSeleccionadoId = nombre;
  cargarChecklist(nombre);
}

function mostrarFormularioTarea(tareaExistente = null, tareaId = null) {
  const contenedor = document.getElementById("formulario-tarea");
  contenedor.innerHTML = `
    <form id="form-tarea">
      <label>📝 Tarea:</label>
      <input type="text" name="texto" placeholder="Ej: Revisar mochila, dar vitaminas..." value="${tareaExistente?.texto || ''}" required />
      <br/>
      <button type="submit">💾 ${tareaExistente ? 'Actualizar' : 'Guardar tarea'}</button>
    </form>
  `;
  contenedor.style.display = "block";

  document.getElementById("form-tarea").onsubmit = (e) => {
    e.preventDefault();
    guardarTareaChecklist(tareaId);
  };
}

function guardarTareaChecklist(tareaId = null) {
  const texto = document.getElementById("form-tarea").texto.value;

  const tarea = {
    texto,
    completada: false
  };

  const db = firebase.database();
  const ruta = `checklist/${window.hijoSeleccionadoId}`;
  const id = tareaId || db.ref().child(ruta).push().key;

  db.ref(`${ruta}/${id}`).set(tarea)
    .then(() => {
      alert(tareaId ? "✅ Tarea actualizada" : "✅ Tarea guardada");
      document.getElementById("formulario-tarea").style.display = "none";
      cargarChecklist(window.hijoSeleccionadoId);
    })
    .catch((error) => {
      console.error("Error al guardar tarea:", error);
      alert("❌ Ocurrió un error al guardar.");
    });
}

function cargarChecklist(hijoId) {
  const lista = document.getElementById("lista-tareas");
  lista.innerHTML = "⏳ Cargando tareas...";

  const db = firebase.database();
  const ruta = `checklist/${hijoId}`;

  db.ref(ruta).once("value")
    .then((snapshot) => {
      const datos = snapshot.val();
      lista.innerHTML = "";

      if (!datos) {
        lista.innerHTML = "📭 No hay tareas registradas.";
        return;
      }

      Object.entries(datos).forEach(([id, tarea]) => {
        const item = document.createElement("li");
        item.innerHTML = `
          <input type="checkbox" ${tarea.completada ? 'checked' : ''} onchange="toggleTareaCompletada('${id}', this.checked)" />
          <span style="${tarea.completada ? 'text-decoration: line-through;' : ''}">${tarea.texto}</span><br>
          <button onclick="editarTareaChecklist('${id}')">✏️ Editar</button>
          <button onclick="eliminarTareaChecklist('${id}')">🗑️ Eliminar</button>
          <hr>
        `;
        lista.appendChild(item);
      });
    })
    .catch((error) => {
      console.error("Error al cargar checklist:", error);
      lista.innerHTML = "❌ Error al cargar tareas.";
    });
}

function toggleTareaCompletada(id, estado) {
  const db = firebase.database();
  const ruta = `checklist/${window.hijoSeleccionadoId}/${id}`;

  db.ref(ruta).update({ completada: estado });
}

function editarTareaChecklist(tareaId) {
  const db = firebase.database();
  const ruta = `checklist/${window.hijoSeleccionadoId}/${tareaId}`;

  db.ref(ruta).once("value")
    .then((snapshot) => {
      const datos = snapshot.val();
      if (datos) {
        mostrarFormularioTarea(datos, tareaId);
      } else {
        alert("⚠️ No se encontró la tarea.");
      }
    });
}

function eliminarTareaChecklist(tareaId) {
  if (!confirm("¿Eliminar esta tarea?")) return;

  const db = firebase.database();
  const ruta = `checklist/${window.hijoSeleccionadoId}/${tareaId}`;

  db.ref(ruta).remove()
    .then(() => {
      alert("🗑️ Tarea eliminada.");
      cargarChecklist(window.hijoSeleccionadoId);
    })
    .catch((error) => {
      console.error("Error al eliminar tarea:", error);
      alert("❌ Ocurrió un error al eliminar.");
    });
}

function volverDesdeChecklist() {
  document.getElementById("checklist-section").style.display = "none";
  document.getElementById("pantalla-agregar").style.display = "block";
}
// -----------------------------
// SECCIÓN: CONTENIDO EDUCATIVO (por edad)
// -----------------------------

// Mostrar sección de contenido educativo según la edad
function irAContenidoEducativo() {
  const nombre = window.hijoSeleccionado;
  if (!nombre) {
    alert("👶 Por favor, selecciona un hijo/a primero.");
    return;
  }

  document.getElementById("pantalla-agregar").style.display = "none";
  document.getElementById("contenido-section").style.display = "block";
  document.getElementById("nombre-hijo-contenido").textContent = nombre;

  const hijos = JSON.parse(localStorage.getItem("hijos")) || [];
  const hijo = hijos.find(h => h.nombre === nombre);

  if (!hijo) return;

  const edadMeses = calcularEdadEnMeses(hijo.fechaNacimiento);
  mostrarContenidoEducativo(edadMeses);
}

// Calcular edad en meses a partir de fecha de nacimiento
function calcularEdadEnMeses(fechaNacimiento) {
  const hoy = new Date();
  const nacimiento = new Date(fechaNacimiento);
  const diffAnios = hoy.getFullYear() - nacimiento.getFullYear();
  const diffMeses = hoy.getMonth() - nacimiento.getMonth();
  const totalMeses = diffAnios * 12 + diffMeses;
  return totalMeses;
}

// Mostrar consejos por etapa de desarrollo
function mostrarContenidoEducativo(edadMeses) {
  const contenedor = document.getElementById("contenedor-educativo");
  contenedor.innerHTML = "";

  let etapa = "";
  let consejos = [];

  if (edadMeses <= 24) {
    etapa = "👶 Bebé (0 a 2 años)";
    consejos = [
      "🍼 Asegura una buena rutina de alimentación y sueño.",
      "👀 Estimula con juguetes simples y contacto visual.",
      "👐 Cántale, háblale y responde a sus gestos y sonidos."
    ];
  } else if (edadMeses <= 72) {
    etapa = "🎨 Preescolar (3 a 6 años)";
    consejos = [
      "🎭 Fomenta el juego simbólico y la creatividad.",
      "🗣️ Habla mucho con tu hijo y escucha activamente.",
      "🧼 Enseña rutinas básicas: lavarse manos, guardar juguetes."
    ];
  } else if (edadMeses <= 144) {
    etapa = "📖 Primaria (7 a 12 años)";
    consejos = [
      "📚 Apoya su autonomía con pequeñas responsabilidades.",
      "💬 Hablen sobre emociones y cómo manejarlas.",
      "⏳ Establece tiempos para tareas, juego y descanso."
    ];
  } else {
    etapa = "💬 Adolescente (13+ años)";
    consejos = [
      "🧠 Escúchalo sin juzgar y valida sus emociones.",
      "🔐 Fomenta confianza y límites claros.",
      "📱 Conversen sobre el uso saludable de redes sociales."
    ];
  }

  const bloque = `
    <h3>${etapa}</h3>
    <ul>
      ${consejos.map(c => `<li>${c}</li>`).join("")}
    </ul>
  `;

  contenedor.innerHTML = bloque;
}

// Volver desde contenido educativo
function volverDesdeContenido() {
  document.getElementById("contenido-section").style.display = "none";
  document.getElementById("pantalla-agregar").style.display = "block";
}
// -----------------------------
// SECCIÓN: FORO
// -----------------------------
function irAForo() {
  document.getElementById("pantalla-agregar").style.display = "none";
  document.getElementById("foro-section").style.display = "block";
  cargarMensajesForo();
}

function volverDesdeForo() {
  document.getElementById("foro-section").style.display = "none";
  document.getElementById("pantalla-agregar").style.display = "block";
}

document.getElementById("formulario-foro").addEventListener("submit", function (e) {
  e.preventDefault();
  const nombre = document.getElementById("nombreUsuarioForo").value.trim() || "👤 Anónimo";
  const mensaje = document.getElementById("mensajeForo").value.trim();

  if (mensaje === "") {
    alert("Por favor escribe un mensaje 💬");
    return;
  }

  const db = firebase.database();
  const nuevoMensajeRef = db.ref("foro").push();
  nuevoMensajeRef.set({
    nombre,
    mensaje,
    fecha: new Date().toISOString()
  });

  document.getElementById("mensajeForo").value = "";
});

function cargarMensajesForo() {
  const lista = document.getElementById("lista-foro");
  lista.innerHTML = "⏳ Cargando mensajes...";

  const db = firebase.database();
  db.ref("foro").on("value", function (snapshot) {
    lista.innerHTML = "";
    const mensajes = snapshot.val();

    if (!mensajes) {
      lista.innerHTML = "📭 No hay mensajes aún.";
      return;
    }

    const ordenados = Object.entries(mensajes).sort((a, b) => new Date(a[1].fecha) - new Date(b[1].fecha));

    ordenados.forEach(([id, data]) => {
      const item = document.createElement("li");
      item.innerHTML = `
        <strong>${data.nombre}</strong><br>
        <span>${data.mensaje}</span>
        <hr>
      `;
      lista.appendChild(item);
    });
  });
}
// -----------------------------
// SECCIÓN: PRIMERAS VECES (con Firebase y emojis)
// -----------------------------
let primerasVeces = [];

function irAPrimerasVeces() {
  const nombre = window.hijoSeleccionado;
  if (!nombre) {
    alert("👶 Por favor, selecciona un hijo/a primero.");
    return;
  }
  hijoSeleccionadoId = nombre;
  document.getElementById("nombre-hijo-primeras-veces").textContent = nombre;

  document.getElementById("pantalla-agregar").style.display = "none";
  document.getElementById("primeras-veces-section").style.display = "block";

  cargarRegistrosPrimerasVeces(hijoSeleccionadoId);
}

function mostrarFormularioPrimerasVeces(registroExistente = null, registroId = null) {
  const contenedor = document.getElementById("formulario-primeras-veces");
  const hoy = new Date().toISOString().split("T")[0];

  contenedor.innerHTML = `
    <form id="form-primeras-veces">
      <label>📅 Fecha:</label>
      <input type="date" name="fecha" value="${registroExistente?.fecha || hoy}" required />

      <label>✨ Momento especial:</label>
      <input type="text" name="titulo" placeholder="Ej: Primer diente, primer paso..." value="${registroExistente?.titulo || ''}" required />

      <label>⚖️ Peso (opcional):</label>
      <input type="text" name="peso" placeholder="Ej: 3.5 kg / 7 lbs" value="${registroExistente?.peso || ''}" />

      <label>📏 Talla (opcional):</label>
      <input type="text" name="talla" placeholder="Ej: 50 cm / 20 in" value="${registroExistente?.talla || ''}" />

      <label>📝 Descripción u observaciones:</label>
      <textarea name="descripcion" rows="3" placeholder="Opcional...">${registroExistente?.descripcion || ''}</textarea>

      <br/>
      <button type="submit">💾 ${registroExistente ? 'Actualizar' : 'Guardar momento'}</button>
    </form>
  `;

  const form = document.getElementById("form-primeras-veces");
  form.onsubmit = (e) => {
    e.preventDefault();
    guardarRegistroPrimerasVeces(registroId);
  };

  contenedor.style.display = "block";
}

function guardarRegistroPrimerasVeces(registroId = null) {
  const form = document.getElementById("form-primeras-veces");

  const nuevoRegistro = {
    fecha: form.fecha.value,
    titulo: form.titulo.value,
    peso: form.peso.value,
    talla: form.talla.value,
    descripcion: form.descripcion.value
  };

  const dbRef = firebase.database();
  const ruta = `primerasVeces/${window.hijoSeleccionadoId}`;
  const id = registroId || dbRef.ref().child(ruta).push().key;

  dbRef.ref(`${ruta}/${id}`).set(nuevoRegistro)
    .then(() => {
      mostrarMensaje(registroId ? "✅ Momento actualizado" : "✅ Momento guardado");
      form.reset();
      document.getElementById("formulario-primeras-veces").style.display = "none";
      cargarRegistrosPrimerasVeces(window.hijoSeleccionadoId);
    })
    .catch((error) => {
      console.error("Error al guardar momento:", error);
      alert("❌ Ocurrió un error al guardar.");
    });
}

function cargarRegistrosPrimerasVeces(hijoId) {
  const lista = document.getElementById("lista-primeras-veces");
  lista.innerHTML = "⏳ Cargando momentos...";

  const dbRef = firebase.database();
  const ruta = `primerasVeces/${hijoId}`;

  dbRef.ref(ruta).once("value")
    .then((snapshot) => {
      const datos = snapshot.val();
      lista.innerHTML = "";

      if (!datos) {
        lista.innerHTML = "📭 No hay momentos registrados.";
        return;
      }

      Object.entries(datos).forEach(([id, momento]) => {
        const item = document.createElement("li");
        item.innerHTML = `
          📅 ${momento.fecha} — ✨ <strong>${momento.titulo}</strong><br>
          ${momento.peso ? `⚖️ Peso: ${momento.peso}<br>` : ""}
          ${momento.talla ? `📏 Talla: ${momento.talla}<br>` : ""}
          📝 ${momento.descripcion || "Sin descripción"}<br>
          <button onclick="editarRegistroPrimerasVeces('${id}')">✏️ Editar</button>
          <button onclick="eliminarRegistroPrimerasVeces('${id}')">🗑️ Eliminar</button>
          <hr>
        `;
        lista.appendChild(item);
      });
    })
    .catch((error) => {
      console.error("Error al cargar momentos:", error);
      lista.innerHTML = "❌ Error al cargar.";
    });
}

function editarRegistroPrimerasVeces(registroId) {
  const dbRef = firebase.database();
  const ruta = `primerasVeces/${window.hijoSeleccionadoId}/${registroId}`;

  dbRef.ref(ruta).once("value")
    .then((snapshot) => {
      const datos = snapshot.val();
      if (datos) {
        mostrarFormularioPrimerasVeces(datos, registroId);
      } else {
        alert("⚠️ No se encontró el registro.");
      }
    });
}

function eliminarRegistroPrimerasVeces(registroId) {
  if (!confirm("¿Eliminar este momento?")) return;

  const dbRef = firebase.database();
  const ruta = `primerasVeces/${window.hijoSeleccionadoId}/${registroId}`;

  dbRef.ref(ruta).remove()
    .then(() => {
      alert("🗑️ Momento eliminado.");
      cargarRegistrosPrimerasVeces(window.hijoSeleccionadoId);
    })
    .catch((error) => {
      console.error("Error al eliminar momento:", error);
      alert("❌ Ocurrió un error al eliminar.");
    });
}

function volverDesdePrimerasVeces() {
  document.getElementById("primeras-veces-section").style.display = "none";
  document.getElementById("pantalla-agregar").style.display = "block";
}



// -----------------------------
// SECCIÓN: ESTADÍSTICAS
// -----------------------------
function irAEstadisticas() {
  const nombre = window.hijoSeleccionado;
  if (!nombre) {
    alert("👶 Por favor, selecciona un hijo/a primero.");
    return;
  }

  document.getElementById("pantalla-agregar").style.display = "none";
  document.getElementById("estadisticas-section").style.display = "block";
  document.getElementById("nombre-hijo-estadisticas").textContent = nombre;

  calcularEstadisticas(nombre);
}

function calcularEstadisticas(nombreHijo) {
  const db = firebase.database();
  const bloque = document.getElementById("bloque-estadisticas");
  bloque.innerHTML = "⏳ Calculando...";

  Promise.all([
    db.ref(`sueno/${nombreHijo}`).once("value"),
    db.ref(`alimentacion/${nombreHijo}`).once("value"),
    db.ref(`checklist/${nombreHijo}`).once("value")
  ]).then(([suenoSnap, alimSnap, checkSnap]) => {
    // Sueño
    const suenos = suenoSnap.val();
    let totalHoras = 0, cantidadNoches = 0;
    if (suenos) {
      Object.values(suenos).forEach(s => {
        if (s.totalHoras) {
          totalHoras += parseFloat(s.totalHoras);
          cantidadNoches++;
        }
      });
    }
    const promedioSueno = cantidadNoches > 0 ? (totalHoras / cantidadNoches).toFixed(1) : "–";

    // Alimentación
    const alimentos = alimSnap.val();
    const totalAlimentacion = alimentos ? Object.keys(alimentos).length : 0;

    // Checklist
    const tareas = checkSnap.val();
    let completadas = 0, totalTareas = 0;
    if (tareas) {
      Object.values(tareas).forEach(t => {
        if (t.completada) completadas++;
        totalTareas++;
      });
    }
    const porcentajeChecklist = totalTareas > 0 ? Math.round((completadas / totalTareas) * 100) + "%" : "–";

    // Mostrar
    bloque.innerHTML = `
      <div class="tarjeta-estadistica">💤 <strong>Promedio de sueño:</strong> ${promedioSueno} hrs/noche</div>
      <div class="tarjeta-estadistica">🍽️ <strong>Registros de alimentación:</strong> ${totalAlimentacion}</div>
      <div class="tarjeta-estadistica">✅ <strong>Tareas completadas:</strong> ${porcentajeChecklist}</div>
    `;
  });
}
function mostrarCorazon(idElemento = "corazonGeneral") {
  const corazon = document.getElementById(idElemento);
  if (!corazon) return;

  corazon.style.display = "block";
  corazon.classList.add("latido");

  setTimeout(() => {
    corazon.style.display = "none";
    corazon.classList.remove("latido");
  }, 1500);
}
function volverDesdeEstadisticas() {
  document.getElementById("estadisticas-section").style.display = "none";
  document.getElementById("pantalla-agregar").style.display = "block";
}

// Helper functions for animations and UI
function mostrarCorazonAnimado(elementId = "corazon-animado") {
  // Crear corazón animado global si no existe
  let corazon = document.getElementById("corazon-animado");
  if (!corazon) {
    corazon = document.createElement("div");
    corazon.id = "corazon-animado";
    corazon.innerHTML = "💗";
    document.body.appendChild(corazon);
  }
  
  corazon.classList.add("mostrar");
  setTimeout(() => {
    corazon.classList.remove("mostrar");
  }, 2000);
}

function animarCorazon(elementId) {
  const elemento = document.getElementById(elementId);
  if (elemento) {
    elemento.classList.add("animado");
    elemento.style.display = "block";
    setTimeout(() => {
      elemento.classList.remove("animado");
      elemento.style.display = "none";
    }, 1000);
  }
}
