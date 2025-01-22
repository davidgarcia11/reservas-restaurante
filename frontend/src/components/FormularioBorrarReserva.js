import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function FormularioBorrarReserva() {
  const [reservas, setReservas] = useState([]);
  const [restauranteSeleccionado, setRestauranteSeleccionado] = useState("");
  const [reservaSeleccionada, setReservaSeleccionada] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (!restauranteSeleccionado) return;

    const obtenerReservas = async () => {
      try {
        const respuesta = await fetch(`http://localhost:3001/restaurantes/${restauranteSeleccionado}/reservas`);
        if (!respuesta.ok) {
          throw new Error("Error al obtener las reservas");
        }
        const datos = await respuesta.json();
        setReservas(datos);
      } catch (error) {
        console.error("Error al obtener las reservas:", error);
        setMensaje("Error al cargar las reservas. Inténtalo más tarde.");
        setTipoMensaje("error");
      }
    };

    obtenerReservas();
  }, [restauranteSeleccionado]);

  const handleBorrarReserva = async () => {
    if (!reservaSeleccionada) {
      setMensaje("Por favor, selecciona una reserva para borrar.");
      setTipoMensaje("error");
      return;
    }

    try {
      const respuesta = await fetch(`http://localhost:3001/reservas/${reservaSeleccionada}`, {
        method: "DELETE",
      });

      if (respuesta.ok) {
        setReservas((prev) => prev.filter((reserva) => reserva.id !== reservaSeleccionada));
        setMensaje("¡Reserva eliminada con éxito!");
        setTipoMensaje("exito");
        setReservaSeleccionada("");
      } else {
        setMensaje("Error al eliminar la reserva. Inténtalo nuevamente.");
        setTipoMensaje("error");
      }
    } catch (error) {
      console.error("Error al eliminar la reserva:", error);
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

      <h1 className="text-2xl font-bold mb-4">Borrar Reserva</h1>

      <div className="mb-4">
        <label htmlFor="restaurante" className="block text-gray-700 font-bold mb-2">
          Selecciona un restaurante:
        </label>
        <select
          id="restaurante"
          value={restauranteSeleccionado}
          onChange={(e) => setRestauranteSeleccionado(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">Selecciona un restaurante</option>
          {/* Añade aquí la lista de restaurantes disponibles */}
          <option value="4">Restaurante 4</option>
        </select>
      </div>

      {restauranteSeleccionado && (
        <div className="mb-4">
          <label htmlFor="reserva" className="block text-gray-700 font-bold mb-2">
            Selecciona una reserva para borrar:
          </label>
          <select
            id="reserva"
            value={reservaSeleccionada}
            onChange={(e) => setReservaSeleccionada(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Selecciona una reserva</option>
            {reservas.map((reserva) => (
              <option key={reserva.id} value={reserva.id.toString()}>
                {`Reserva para ${reserva.numeroPersonas} personas el ${reserva.fecha} a las ${reserva.hora}`}
              </option>
            ))}
          </select>
        </div>
      )}

      <button
        onClick={handleBorrarReserva}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Borrar Reserva
      </button>
    </div>
  );
}

export default FormularioBorrarReserva;