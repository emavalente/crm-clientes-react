// Obtener todos los clientes para listarlos.
export async function obtenerClientes() {
  try {
    const respuesta = await fetch(import.meta.env.VITE_API_URL);
    const data = await respuesta.json();
    return data;
  } catch (error) {
    console.log(error);
    return {};
  }
}

// Obtener un cliente para editarlo.
export async function obtenerCliente(id) {
  try {
    const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`);
    const data = await respuesta.json();
    return data;
  } catch (error) {
    console.log(error);
    return {};
  }
}

// Generar un nuevo registro de cliente.
export async function agregarCliente(datos) {
  try {
    const respuesta = await fetch(import.meta.env.VITE_API_URL, {
      method: "POST",
      body: JSON.stringify(datos),
      headers: { "Content-Type": "application/json" },
    });

    await respuesta.json();
  } catch (error) {
    console.log(error);
  }
}

//Actualizar un registro existente.
export async function actualizarCliente(id, datos) {
  try {
    const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
      method: "PUT",
      body: JSON.stringify(datos),
      headers: {
        "Content-Type": "application/json",
      },
    });

    await respuesta.json();
    console.log(respuesta);
  } catch (error) {}
}

//Eliminar un registro existente.
export async function eliminarCliente(id) {
  try {
    const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
      method: "DELETE",
    });

    await respuesta.json();
    console.log(respuesta);
  } catch (error) {}
}
