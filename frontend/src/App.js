import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FormularioReserva from "./components/FormularioReserva";
import FormularioModificarReserva from "./components/FormularioModificarReserva";
import FormularioBorrarReserva from "./components/FormularioBorrarReserva";
import FormularioCrearRestaurante from "./components/FormularioCrearRestaurante";
import FormularioModificarRestaurante from "./components/FormularioModificarRestaurante";
import FormularioBorrarRestaurante from "./components/FormularioBorrarRestaurante";
import VerRestaurantes from "./components/VerRestaurantes";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormularioReserva />} />
        <Route path="/modificar-reserva" element={<FormularioModificarReserva />} />
        <Route path="/borrar-reserva" element={<FormularioBorrarReserva />} />
        <Route path="/restaurantes" element={<FormularioCrearRestaurante />} />
        <Route path="/modificar-restaurante" element={<FormularioModificarRestaurante />} />
        <Route path="/borrar-restaurante" element={<FormularioBorrarRestaurante />} />
        <Route path="/ver-restaurantes" element={<VerRestaurantes />} />
      </Routes>
    </Router>
  );
}

export default App;