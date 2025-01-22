import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


function FormularioReserva() {
  const [restaurantes, setRestaurantes] = useState([]);
  const [restauranteSeleccionado, setRestauranteSeleccionado] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [servicio, setServicio] = useState("");
  const [numPersonas, setNumPersonas] = useState(1);
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState(""); // 'exito' o 'error'

  // Obtener la lista de restaurantes al cargar el componente
  useEffect(() => {
    const obtenerRestaurantes = async () => {
      try {
        const respuesta = await fetch("http://localhost:3001/restaurantes");
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!restauranteSeleccionado || !fecha || !hora || !servicio || !numPersonas) {
      setMensaje("Por favor, completa todos los campos del formulario.");
      setTipoMensaje("error");
      return;
    }

    try {
      const respuesta = await fetch("http://localhost:3001/reservas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fecha,
          hora,
          numeroPersonas: numPersonas,
          restauranteId: restauranteSeleccionado,
        }),
      });

      if (respuesta.ok) {
        setMensaje("¡Reserva realizada con éxito!");
        setTipoMensaje("exito");
        // Reiniciar el formulario
        setRestauranteSeleccionado("");
        setFecha("");
        setHora("");
        setServicio("");
        setNumPersonas(1);
      } else {
        setMensaje("Error al realizar la reserva. Inténtalo nuevamente.");
        setTipoMensaje("error");
      }
    } catch (error) {
      console.error("Error al crear la reserva:", error);
      setMensaje("Hubo un problema con el servidor. Inténtalo más tarde.");
      setTipoMensaje("error");
    }
  };

  const handleRestauranteChange = (event) => {
    setRestauranteSeleccionado(event.target.value);
  };

  const handleFechaChange = (event) => {
    setFecha(event.target.value);
  };

  const handleServicioChange = (event) => {
    setServicio(event.target.value);
    setHora("");
  };

  const handleHoraChange = (event) => {
    setHora(event.target.value);
  };

  const handleNumPersonasChange = (event) => {
    setNumPersonas(parseInt(event.target.value, 10));
  };

  const handleModificarReserva = () => {
    setMensaje("Funcionalidad para modificar reservas próximamente.");
    setTipoMensaje("info");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      {mensaje && (
        <div
          className={`mb-4 p-4 rounded ${tipoMensaje === "exito"
            ? "bg-green-100 text-green-700"
            : tipoMensaje === "error"
              ? "bg-red-100 text-red-700"
              : "bg-blue-100 text-blue-700"
            }`}
        >
          {mensaje}
        </div>
      )}

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

      <div className="mb-4">
        <label htmlFor="fecha" className="block text-gray-700 font-bold mb-2">
          Fecha:
        </label>
        <input
          type="date"
          id="fecha"
          value={fecha}
          onChange={handleFechaChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="servicio" className="block text-gray-700 font-bold mb-2">
          Servicio:
        </label>
        <select
          id="servicio"
          value={servicio}
          onChange={handleServicioChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">Selecciona un servicio</option>
          <option value="comida">Comida</option>
          <option value="cena">Cena</option>
        </select>
      </div>

      {servicio && (
        <div className="mb-4">
          <label htmlFor="hora" className="block text-gray-700 font-bold mb-2">
            Hora:
          </label>
          <select
            id="hora"
            value={hora}
            onChange={handleHoraChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Selecciona una hora</option>
            {servicio === "comida" ? (
              <>
                <option value="13:00">13:00</option>
                <option value="13:30">13:30</option>
                <option value="14:00">14:00</option>
                <option value="14:30">14:30</option>
                <option value="15:00">15:00</option>
                <option value="15:30">15:30</option>
              </>
            ) : (
              <>
                <option value="20:30">20:30</option>
                <option value="21:00">21:00</option>
                <option value="21:30">21:30</option>
                <option value="22:00">22:00</option>
                <option value="22:30">22:30</option>
              </>
            )}
          </select>
        </div>
      )}

      <div className="mb-4">
        <label htmlFor="numPersonas" className="block text-gray-700 font-bold mb-2">
          Número de personas:
        </label>
        <input
          type="number"
          id="numPersonas"
          value={numPersonas}
          onChange={handleNumPersonasChange}
          min="1"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Reservar
        </button>
        <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          <a href="/modificar-reserva" className="text-white">
            Modificar Reserva
          </a>
        </button>
        <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          <a href="/borrar-reserva" className="text-white">
            Borrar Reserva
          </a>
        </button>
        <button
          
          className="ml-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          <a href="/restaurantes" className="text-white">
            Acceder Restaurantes
          </a>
        </button>
      </div>

    </form>
  );
}

export default FormularioReserva;
