"use strict";
import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import "bootstrap/dist/css/bootstrap.min.css";
export default function LabTabs() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="App" value="1" />
            <Tab label="Martingala" value="2" />
            <Tab label="Info" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <div
            className="card"
            style={{ textAlign: "left", border: "none", maxWidth: 700 }}
          >
            <p>
              ¿Vas a jugar colores en la ruleta? Usa esta calculadora para
              predecir tu probabilidad de ganancia maxima. A partir de las
              variables ingresadas, esta calculadora produce simulaciones de
              apuestas que utilizan la estrategia de la martingala y reune
              estadisticas para analizar los posibles desenlaces en nuestro
              juego{" "}
            </p>
          </div>
        </TabPanel>
        <TabPanel value="2">
          <div
            className="card"
            style={{ textAlign: "left", border: "none", maxWidth: 700 }}
          >
            <p>
              La martingala es un sistema de apuestas utilizado en la ruleta que
              se basa en duplicar la apuesta despues de cada perdida con el
              objetivo de recuperar el dinero perdido y obtener ganancias. Segun
              este sistema, si se apuesta a un color y se pierde, se debe
              duplicar la apuesta en el mismo color en la siguiente ronda, y así
              sucesivamente hasta que se gane. Una vez ganada la apuesta, se
              vuelve a empezar con el monto inicial{" "}
            </p>
          </div>
        </TabPanel>
        <TabPanel value="3">
          <div
            className="card"
            style={{ textAlign: "left", border: "none", maxWidth: 700 }}
          >
            <p>
              <b>Maxima ganancia: </b>
              {" El monto maximo que ha ganado ese grupo de jugadores"}
            </p>
            <hr style={{ borderTop: "1px solid grey" }} />
            <p>
              <b>Probabilidad de ganar:</b>
              {" La probabilidad de que un jugador gane ese monto de dinero"}
            </p>
            <hr style={{ borderTop: "1px solid grey" }} />
            <p>
              <b>Cantidad de jugadores: </b>
              {
                " La cantidad de jugadores que ha ganado esa exacta cantidad de dinero "
              }
            </p>
            <hr style={{ borderTop: "1px solid grey" }} />
            <p>
              <b>Cantidad de jugadas (mediana): </b>
              {
                " La mediana de jugadas que se requiere para llegar a ese monto de dinero "
              }
            </p>
            <hr style={{ borderTop: "1px solid grey" }} />
            <p>
              <b>Cantidad de dobladas: </b>
              {
                " La cantidad de veces seguidas que un jugador puede doblar la apuesta antes de entrar en perdida con ese monto de dinero"
              }
            </p>
            <hr style={{ borderTop: "1px solid grey" }} />
          </div>
        </TabPanel>
      </TabContext>
    </Box>
  );
}
