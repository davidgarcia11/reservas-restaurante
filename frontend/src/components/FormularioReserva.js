import React, { useState, useEffect } from "react";

function FormularioReserva() {
  const [restaurantes, setRestaurantes] = useState([]);
  const [restauranteSeleccionado, setRestauranteSeleccionado] = useState(""); // Inicializamos como una cadena vacía
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [servicio, setServicio] = useState(""); // 'comida' o 'cena'
  const [numPersonas, setNumPersonas] = useState(1);

  // Obtener la lista de restaurantes al cargar el componente
  useEffect(() => {
    const obtenerRestaurantes = async () => {
      const respuesta = await fetch("http://localhost:3001/restaurantes");
      const datos = await respuesta.json();
      setRestaurantes(datos);
    };

    obtenerRestaurantes();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Evita que la página se recargue al enviar el formulario

    // Validar los datos del formulario (puedes añadir más validaciones aquí)
    if (
      !restauranteSeleccionado ||
      !fecha ||
      !hora ||
      !servicio ||
      !numPersonas
    ) {
      alert("Por favor, completa todos los campos del formulario.");
      return;
    }

    try {
      // Envía una petición POST a la API para crear la reserva
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
        // La reserva se creó correctamente
        console.log("Reserva creada");
        // Aquí puedes redirigir al usuario a una página de confirmación o mostrar un mensaje de éxito
      } else {
        console.error("Error al crear la reserva");
        // Aquí puedes mostrar un mensaje de error al usuario
      }
    } catch (error) {
      console.error("Error al crear la reserva:", error);
      // Aquí puedes mostrar un mensaje de error al usuario
    }
  };

  // Funciones para actualizar el estado del formulario cuando cambian los valores de los campos
  const handleRestauranteChange = (event) => {
    setRestauranteSeleccionado(event.target.value);
  };

  const handleFechaChange = (event) => {
    setFecha(event.target.value);
  };

  const handleServicioChange = (event) => {
    setServicio(event.target.value);
    setHora(""); // Reinicia la hora cuando se cambia el servicio
  };

  const handleHoraChange = (event) => {
    setHora(event.target.value);
  };

  const handleNumPersonasChange = (event) => {
    setNumPersonas(parseInt(event.target.value, 10));
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
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

      {/* Campo para seleccionar la fecha */}
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

      {/* Campo para seleccionar el servicio (comida o cena) */}
      <div className="mb-4">
        <label
          htmlFor="servicio"
          className="block text-gray-700 font-bold mb-2"
        >
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

      {/* Campo para seleccionar la hora (se muestra solo si se ha seleccionado un servicio) */}
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

      {/* Campo para indicar el número de personas */}
      <div className="mb-4">
        <label
          htmlFor="numPersonas"
          className="block text-gray-700 font-bold mb-2"
        >
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

      {/* Botón para enviar el formulario */}
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Reservar
      </button>
    </form>
  );
}

export default FormularioReserva;