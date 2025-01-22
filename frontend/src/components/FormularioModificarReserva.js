
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function FormularioModificarReserva() {
  const [reservas, setReservas] = useState([]);
  const [restauranteSeleccionado, setRestauranteSeleccionado] = useState("");
  const [reservaSeleccionada, setReservaSeleccionada] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [numPersonas, setNumPersonas] = useState(1);
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("");

  const navigate = useNavigate();

  // Obtener la lista de reservas para un restaurante específico
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

  const handleRestauranteChange = (event) => {
    setRestauranteSeleccionado(event.target.value);
    setReservas([]);
    setReservaSeleccionada("");
  };

  const handleReservaChange = (event) => {
    const reservaId = event.target.value;
    setReservaSeleccionada(reservaId);
    const reserva = reservas.find((r) => r.id.toString() === reservaId);
    if (reserva) {
      setFecha(reserva.fecha);
      setHora(reserva.hora);
      setNumPersonas(reserva.numeroPersonas);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!reservaSeleccionada || !fecha || !hora || !numPersonas) {
      setMensaje("Por favor, completa todos los campos del formulario.");
      setTipoMensaje("error");
      return;
    }

    try {
      const respuesta = await fetch(`http://localhost:3001/reservas/${reservaSeleccionada}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fecha,
          hora,
          numeroPersonas: numPersonas,
        }),
      });

      if (respuesta.ok) {
        setMensaje("¡Reserva actualizada con éxito!");
        setTipoMensaje("exito");
      } else {
        setMensaje("Error al actualizar la reserva. Inténtalo nuevamente.");
        setTipoMensaje("error");
      }
    } catch (error) {
      console.error("Error al actualizar la reserva:", error);
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
      <form onSubmit={handleSubmit} className="p-4">
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

        <div className="mb-4">
          <label htmlFor="restaurante" className="block text-gray-700 font-bold mb-2">
            Selecciona un restaurante:
          </label>
          <select
            id="restaurante"
            value={restauranteSeleccionado}
            onChange={handleRestauranteChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Selecciona un restaurante</option>
            {/* Suponiendo que tienes la lista de restaurantes cargada en otro lugar */}
            <option value="4">Restaurante 4</option>
            {/* Agrega más opciones según corresponda */}
          </select>
        </div>

        {restauranteSeleccionado && (
          <div className="mb-4">
            <label htmlFor="reserva" className="block text-gray-700 font-bold mb-2">
              Selecciona una reserva:
            </label>
            <select
              id="reserva"
              value={reservaSeleccionada}
              onChange={handleReservaChange}
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

        {reservaSeleccionada && (
          <>
            <div className="mb-4">
              <label htmlFor="fecha" className="block text-gray-700 font-bold mb-2">
                Fecha:
              </label>
              <input
                type="date"
                id="fecha"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="hora" className="block text-gray-700 font-bold mb-2">
                Hora:
              </label>
              <input
                type="time"
                id="hora"
                value={hora}
                onChange={(e) => setHora(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="numPersonas" className="block text-gray-700 font-bold mb-2">
                Número de personas:
              </label>
              <input
                type="number"
                id="numPersonas"
                value={numPersonas}
                onChange={(e) => setNumPersonas(parseInt(e.target.value, 10))}
                min="1"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Actualizar Reserva
            </button>
          </>
        )}
      </form>
    </div>
  );
}

export default FormularioModificarReserva;