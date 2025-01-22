import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FormularioReserva from "./components/FormularioReserva";
import FormularioModificarReserva from "./components/FormularioModificarReserva";
import FormularioBorrarReserva from "./components/FormularioBorrarReserva";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormularioReserva />} />
        <Route path="/modificar-reserva" element={<FormularioModificarReserva />} />
        <Route path="/borrar-reserva" element={<FormularioBorrarReserva />} />
      </Routes>
    </Router>
  );
}

export default App;
