import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function FormularioCrearRestaurante() {
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [capacidad, setCapacidad] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!nombre || !direccion || !telefono || !email || !capacidad) {
      setMensaje("Por favor, completa todos los campos del formulario.");
      setTipoMensaje("error");
      return;
    }

    try {
      const respuesta = await fetch("http://localhost:3001/restaurantes", {
        method: "POST",
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
        setMensaje("¡Restaurante creado con éxito!");
        setTipoMensaje("exito");
        setNombre("");
        setDireccion("");
        setTelefono("");
        setEmail("");
        setCapacidad("");
      } else {
        setMensaje("Error al crear el restaurante. Inténtalo nuevamente.");
        setTipoMensaje("error");
      }
    } catch (error) {
      console.error("Error al crear el restaurante:", error);
      setMensaje("Hubo un problema con el servidor. Inténtalo más tarde.");
      setTipoMensaje("error");
    }
  };

  return (
    <div>
      <div className="mb-4">
        <button
          onClick={() => navigate("/")}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Volver a Reservas
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

      <h1 className="text-2xl font-bold mb-4">Crear Restaurante</h1>

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
          Crear Restaurante
        </button>
      </form>
      <button
        onClick={() => navigate("/modificar-restaurante")}
        className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Modificar Restaurante
      </button>
      <button
          onClick={() => navigate("/borrar-restaurante")}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Borrar Restaurante
        </button>
        <button
          onClick={() => navigate("/ver-restaurantes")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Ver Restaurantes
        </button>
    </div>
  );
}

export default FormularioCrearRestaurante;