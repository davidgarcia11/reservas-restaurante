import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function FormularioModificarRestaurante() {
  const [restaurantes, setRestaurantes] = useState([]);
  const [restauranteSeleccionado, setRestauranteSeleccionado] = useState("");
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [capacidad, setCapacidad] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const obtenerRestaurantes = async () => {
      try {
        const respuesta = await fetch("http://localhost:3001/restaurantes");
        if (!respuesta.ok) {
          throw new Error("Error al obtener los restaurantes");
        }
        const datos = await respuesta.json();
        setRestaurantes(datos);
      } catch (error) {
        console.error("Error al obtener los restaurantes:", error);
        setMensaje("Error al cargar los restaurantes. Inténtalo más tarde.");
        setTipoMensaje("error");
      }
    };

    obtenerRestaurantes();
  }, []);

  const handleRestauranteChange = (event) => {
    const id = event.target.value;
    setRestauranteSeleccionado(id);
    const restaurante = restaurantes.find((r) => r.id.toString() === id);
    if (restaurante) {
      setNombre(restaurante.nombre);
      setDireccion(restaurante.direccion);
      setTelefono(restaurante.telefono);
      setEmail(restaurante.email);
      setCapacidad(restaurante.capacidad);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!restauranteSeleccionado || !nombre || !direccion || !telefono || !email || !capacidad) {
      setMensaje("Por favor, completa todos los campos del formulario.");
      setTipoMensaje("error");
      return;
    }

    try {
      const respuesta = await fetch(`http://localhost:3001/restaurantes/${restauranteSeleccionado}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre,
          direccion,
          telefono,
          email,
          capacidad: parseInt(capacidad, 10),
        }),
      });

      if (respuesta.ok) {
        setMensaje("¡Restaurante modificado con éxito!");
        setTipoMensaje("exito");
      } else {
        setMensaje("Error al modificar el restaurante. Inténtalo nuevamente.");
        setTipoMensaje("error");
      }
    } catch (error) {
      console.error("Error al modificar el restaurante:", error);
      setMensaje("Hubo un problema con el servidor. Inténtalo más tarde.");
      setTipoMensaje("error");
    }
  };

  return (
    <div>
      <div className="mb-4">
        <button
          onClick={() => navigate("/restaurantes")}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Volver a Crear Restaurante
        </button>
      </div>

      {mensaje && (
        <div
          className={`mb-4 p-4 rounded ${
            tipoMensaje === "exito"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {mensaje}
        </div>
      )}

      <h1 className="text-2xl font-bold mb-4">Modificar Restaurante</h1>

      <div className="mb-4">
        <label htmlFor="restaurante" className="block text-gray-700 font-bold mb-2">
          Selecciona un restaurante para modificar:
        </label>
        <select
          id="restaurante"
          value={restauranteSeleccionado}
          onChange={handleRestauranteChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">Selecciona un restaurante</option>
          {restaurantes.map((restaurante) => (
            <option key={restaurante.id} value={restaurante.id.toString()}>
              {restaurante.nombre}
            </option>
          ))}
        </select>
      </div>

      {restauranteSeleccionado && (
        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-4">
            <label htmlFor="nombre" className="block text-gray-700 font-bold mb-2">
              Nombre del Restaurante:
            </label>
            <input
              type="text"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="direccion" className="block text-gray-700 font-bold mb-2">
              Dirección del Restaurante:
            </label>
            <input
              type="text"
              id="direccion"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="telefono" className="block text-gray-700 font-bold mb-2">
              Teléfono del Restaurante:
            </label>
            <input
              type="text"
              id="telefono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Email del Restaurante:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="capacidad" className="block text-gray-700 font-bold mb-2">
              Capacidad del Restaurante:
            </label>
            <input
              type="number"
              id="capacidad"
              value={capacidad}
              onChange={(e) => setCapacidad(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Modificar Restaurante
          </button>
        </form>
      )}
    </div>
  );
}

export default FormularioModificarRestaurante;
