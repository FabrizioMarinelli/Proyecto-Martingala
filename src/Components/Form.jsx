"use strict";

import Calcular from "./Statisticss.jsx";
import { useContext } from "react";
import DineroApuestaContext from "./dineroApuestaContext";
import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Form() {
  const { SetStatistic, SetGraphStatistic } = useContext(DineroApuestaContext);

  const llamarCalcular = function () {
    const dinero = document.querySelector("#dinero").value;
    const apuesta = document.querySelector("#apuesta").value;
    if (dinero > apuesta && dinero <= 10000 && dinero > 0 && apuesta > 0) {
      const arrayEstadisticas = Calcular(
        document.querySelector("#dinero").value,
        document.querySelector("#apuesta").value
      );

      SetStatistic(arrayEstadisticas[0]);
      SetGraphStatistic(arrayEstadisticas[1]);
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops... algo salio mal",
        html:
          '<p style = "text-align: left !important; margin-left: 10%;"  ><b>Recuerda que: </b></p>' +
          '<ul class="list-group list-group-flush">' +
          '<li class="list-group-item">Tanto la apuesta como el dinero total tienen que ser mayor a $0</li>' +
          '<li class="list-group-item">La apuesta tiene que ser menor al dinero total</li>' +
          '<li class="list-group-item">El dinero total no puede ser mayor a $10000</li>' +
          "</ul>",
      });
    }
  };
  return (
    <div className="card">
      <div class="row">
        <div class="col-md-6 col-sm-12 mb-4">
          <div class="input-group">
            <TextField
              fullWidth
              type="number"
              label="Dinero total"
              variant="standard"
              id="dinero"
              name="dinero"
              InputProps={{
                inputProps: {
                  type: "text",
                },
              }}
            />
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6 col-sm-12 mb-4 ">
          <div class="input-group mx-auto">
            <TextField
              fullWidth
              type="number"
              label="Apuesta por ronda"
              variant="standard"
              id="apuesta"
              name="apuesta"
              InputProps={{
                inputProps: {
                  type: "text",
                },
              }}
            />
          </div>
        </div>
      </div>
      <div className="col-auto mr-lg-2 mt-3">
        <Button
          variant="outlined"
          style={{ width: "150px", height: "3em" }}
          onClick={() => llamarCalcular()}
        >
          Calcular
        </Button>
      </div>
    </div>
  );
}
