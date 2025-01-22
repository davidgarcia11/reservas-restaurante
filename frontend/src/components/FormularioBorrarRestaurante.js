import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function FormularioBorrarRestaurante() {
  const [restaurantes, setRestaurantes] = useState([]);
  const [restauranteSeleccionado, setRestauranteSeleccionado] = useState("");
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

  const handleBorrarRestaurante = async () => {
    if (!restauranteSeleccionado) {
      setMensaje("Por favor, selecciona un restaurante para borrar.");
      setTipoMensaje("error");
      return;
    }

    try {
      const respuesta = await fetch(`http://localhost:3001/restaurantes/${restauranteSeleccionado}`, {
        method: "DELETE",
      });

      if (respuesta.ok) {
        setRestaurantes((prev) => prev.filter((r) => r.id.toString() !== restauranteSeleccionado));
        setMensaje("¡Restaurante eliminado con éxito!");
        setTipoMensaje("exito");
        setRestauranteSeleccionado("");
      } else {
        setMensaje("Error al eliminar el restaurante. Inténtalo nuevamente.");
        setTipoMensaje("error");
      }
    } catch (error) {
      console.error("Error al eliminar el restaurante:", error);
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

      <h1 className="text-2xl font-bold mb-4">Borrar Restaurante</h1>

      <div className="mb-4">
        <label htmlFor="restaurante" className="block text-gray-700 font-bold mb-2">
          Selecciona un restaurante para borrar:
        </label>
        <select
          id="restaurante"
          value={restauranteSeleccionado}
          onChange={(e) => setRestauranteSeleccionado(e.target.value)}
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

      <button
        onClick={handleBorrarRestaurante}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Borrar Restaurante
      </button>
    </div>
  );
}

export default FormularioBorrarRestaurante;