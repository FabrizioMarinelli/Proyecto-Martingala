import { useContext } from "react";
import DineroApuestaContext from "../dineroApuestaContext";
import "./Styles/Grafico.css";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer,
} from "recharts";
("use strict");

export default function Grafico() {
  const { graphstatistic } = useContext(DineroApuestaContext);

  function CustomTooltip({ payload, label, active }) {
    if (active) {
      return (
        <div className="custom-tooltip">
          <p className="desc">
            <strong>Probabilidad de ganar: </strong>
            {payload[0].payload.probabilidadDeGanar}%
            <br />
            <strong>Cantidad de jugadores: </strong>
            {payload[0].payload.cantidadJugadores}
            <br />
            <strong>Maxima ganancia: </strong>
            {payload[0].payload.maximaGanancia[1] === 0
              ? `$${payload[0].payload.maximaGanancia[0]}~`
              : `$${payload[0].payload.maximaGanancia[0]} - $${payload[0].payload.maximaGanancia[1]}`}
            <br />
            <strong>Cantidad de dobladas: </strong>
            {payload[0].payload.cantidadDobladas[1] === 0
              ? `${payload[0].payload.cantidadDobladas[0]}~`
              : `${payload[0].payload.cantidadDobladas[0]} - ${payload[0].payload.cantidadDobladas[1]}`}
            <br />
            <strong>Cantidad de jugadas (mediana): </strong>
            {payload[0].payload.cantidadJugadasMedia[1] === 0
              ? `${payload[0].payload.cantidadJugadasMedia[0]}~`
              : `${payload[0].payload.cantidadJugadasMedia[0]} - ${payload[0].payload.cantidadJugadasMedia[1]}`}
            <br />
          </p>
        </div>
      );
    }

    return null;
  }
  if (graphstatistic) {
    return (
      <div className="mt-3">
        <ResponsiveContainer height={500}>
          <BarChart width={730} height={250} data={graphstatistic}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="-" />
            <YAxis />
            <Tooltip
              content={<CustomTooltip graphstatistic={graphstatistic} />}
            />
            <Legend />
            <Bar
              className="barra"
              dataKey="cantidadJugadores"
              name="Cantidad de jugadores"
              fill="#6591E2"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  } else {
    return (
      <div style={{ height: "50vh", display: "table", width: "100%" }}>
        <div style={{ display: "table-cell", verticalAlign: "middle" }}>
          <div>
            <p style={{ textAlign: "center" }}>Todavia no hay Estadisticas</p>
          </div>
        </div>
      </div>
    );
  }
}
