import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FormularioReserva from "./components/FormularioReserva";
import FormularioModificarReserva from "./components/FormularioModificarReserva";
import FormularioBorrarReserva from "./components/FormularioBorrarReserva";
import FormularioCrearRestaurante from "./components/FormularioCrearRestaurante";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormularioReserva />} />
        <Route path="/modificar-reserva" element={<FormularioModificarReserva />} />
        <Route path="/borrar-reserva" element={<FormularioBorrarReserva />} />
        <Route path="/restaurantes" element={<FormularioCrearRestaurante />} />
      </Routes>
    </Router>
  );
}

export default App;