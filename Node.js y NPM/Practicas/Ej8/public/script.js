const listaUsuario = document.querySelector(".listaUsuarios");
const nuevoUsuarioBtn = document.querySelector(".nombreInput");

async function obtenerUsuarios() {
  try {
    const res = await fetch("/api/getUsers");
    if (!res.ok) {
      throw new Error("Error al contectar con el servidor");
    }
    const usuarios = await res.json();
    renderUsers(usuarios);
  } catch (e) {
    console.log(e);
  }
}

function renderUsers(usuarios) {
  listaUsuario.innerHTML = ""; // limpiar lista para evitar duplicados

  if (usuarios.length > 0) {
    usuarios.forEach((usuario) => {
      let fila = document.createElement("li");
      fila.classList.add("list-group-item");
      fila.style.display = "flex";
      fila.style.justifyContent = "space-between";
      fila.style.alignItems = "center";

      // Texto
      let texto = document.createElement("span");
      texto.textContent = `ID: ${usuario.id} - ${usuario.nombre}`;

      // Botón editar
      let editarBtn = document.createElement("button");
      editarBtn.classList.add("btn", "btn-warning", "editarBtn", "ms-2", "text-white");
      editarBtn.textContent = "Editar";

      // Botón eliminar
      let eliminarBtn = document.createElement("button");
      eliminarBtn.classList.add("btn", "btn-danger", "eliminarBtn", "ms-2");
      eliminarBtn.textContent = "Eliminar";

      let buttons = document.createElement("div");

      // Añadir elementos a la fila
      fila.appendChild(texto);
      buttons.appendChild(editarBtn);
      buttons.appendChild(eliminarBtn);
      fila.appendChild(buttons);

      // Añadir fila a la lista
      listaUsuario.appendChild(fila);

      inicializarEventos(fila, usuario);
    });
  } else {
    let fila = document.createElement("li");
    fila.classList.add("list-group-item");
    fila.textContent = "No hay usuarios creados.";
    listaUsuario.appendChild(fila);
  }
}

function inicializarEventos(fila, usuario) {
  fila
    .querySelector(".eliminarBtn")
    .addEventListener("click", () => eliminarUsuario(usuario.id));

  fila
    .querySelector(".editarBtn")
    .addEventListener("click", () => overlayEditarUsuario(usuario.id));
}

nuevoUsuarioBtn.addEventListener("click", añadirUsuario);

async function añadirUsuario() {
  try {
    const usuario = document.querySelector("input[type='text']").value;
    if (!usuario) {
      throw new Error("El campo nombre es obligatorio");
    }
    const res = await fetch(`/api/insertUser`, {
      method: "POST",
      body: JSON.stringify({ nombre: usuario }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Error al conectar con el servidor");
    }

    const data = await res.json();
    const isInserted = data ? true : false;

    if (isInserted) {
      document.querySelector("input[type='text']").value = "";
      window.location.reload();
    }
  } catch (e) {
    alert(e);
  }
}

async function eliminarUsuario(id) {
  try {
    const res = await fetch(`/api/delUser/${id}`, {
      method: "delete",
    });
    if (!res.ok) {
      throw new Error("Error al conectarse al usuario");
    }
    const data = await res.json();
    const eliminar = data.success ? true : false;

    if (eliminar) {
      window.location.reload();
    }
  } catch (e) {
    console.log(e);
  }
}

async function editarUsuario(usuario,id){
    try {
      if (!usuario) {
        throw new Error("El campo nombre es obligatorio");
      }
    const res = await fetch(`/api/updateUser`, {
      method: "PUT",
      body: JSON.stringify({ id: id, nombre: usuario }),
      headers: {
        "Content-Type": "application/json",
      },
    });

     if (!res.ok) {
      throw new Error("Error al conectar con el servidor");
    }

    const data = await res.json();
    const isUpdated = data ? true : false;

    if (isUpdated) {
      document.querySelector('.overlay').querySelector("input[type='text']").value = "";
      window.location.reload();
    }

  } catch (e) {
    console.log(e);
  }
}

function overlayEditarUsuario(id) {
  const overlay = document.querySelector('.overlay');

  overlay.classList.remove('d-none');
  overlay.classList.add('d-flex');

  // Cancelar
  overlay.querySelector(".cancelarBtn").onclick = () => {
    overlay.classList.add('d-none');
    overlay.classList.remove('d-flex');
    overlay.querySelector("input[type='text']").value = "";
  };

  // Confirmar
  overlay.querySelector('.confirmarBtn').onclick = () => {
    const usuario = overlay.querySelector("input[type='text']").value;
    editarUsuario(usuario, id);
  };
}


obtenerUsuarios();
