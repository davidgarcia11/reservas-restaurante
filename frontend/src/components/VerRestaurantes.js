import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function VerRestaurantes() {
  const [restaurantes, setRestaurantes] = useState([]);
  const [mensaje, setMensaje] = useState("");
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
      }
    };

    obtenerRestaurantes();
  }, []);

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

      <h1 className="text-2xl font-bold mb-4">Lista de Restaurantes</h1>

      {mensaje && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
          {mensaje}
        </div>
      )}

      {restaurantes.length > 0 ? (
        <ul className="space-y-4">
          {restaurantes.map((restaurante) => (
            <li key={restaurante.id} className="border p-4 rounded">
              <p><strong>Nombre:</strong> {restaurante.nombre}</p>
              <p><strong>Dirección:</strong> {restaurante.direccion}</p>
              <p><strong>Teléfono:</strong> {restaurante.telefono}</p>
              <p><strong>Email:</strong> {restaurante.email}</p>
              <p><strong>Capacidad:</strong> {restaurante.capacidad}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay restaurantes disponibles.</p>
      )}
    </div>
  );
}

export default VerRestaurantes;