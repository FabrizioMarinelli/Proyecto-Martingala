"use strict";
import { useState } from "react";
import Grafico from "./Grafico.jsx";
import Tabla from "./Tabla.jsx";
import "./Styles/Datos.css";
import Button from "@mui/material/Button";

export default function Datos() {
  const [BButton, setButton] = useState(false);

  const handleButtonClick = () => {
    setButton(!BButton);
  };

  return (
    <div className="card datos-Card">
      <div className="container-fluid">
        <div className="row justify-content-center justify-content-lg-start">
          <div className="col-auto mr-lg-2 mb-3">
            <Button
              variant="outlined"
              style={{ width: "150px", height: "3em" }}
              onClick={handleButtonClick}
            >
              {BButton ? "Tabla" : "Grafico"}
            </Button>
          </div>
        </div>
      </div>

      {BButton ? <Grafico /> : <Tabla />}
    </div>
  );
}
