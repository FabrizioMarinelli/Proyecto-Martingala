import { useContext } from "react";
import DineroApuestaContext from "../dineroApuestaContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Styles/Tabla.css";
import * as React from "react";
("use strict");
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableVirtuoso } from "react-virtuoso";

export default function Tabla() {
  const { statistic } = useContext(DineroApuestaContext);

  if (statistic) {
    const columns = [
      {
        label: "Maxima ganancia",
        dataKey: "maximaGanancia",
      },
      {
        label: "Probabilidad de Ganar",
        dataKey: "probabilidadDeGanar",
      },
      {
        label: "Cantidad de jugadores",
        dataKey: "cantidadJugadores",
      },
      {
        label: "Cantidad de jugadas (mediana)",
        dataKey: "cantidadJugadasMedia",
      },
      {
        label: "Cantidad de dobladas",
        dataKey: "cantidadDobladas",
      },
    ];

    const VirtuosoTableComponents = {
      Scroller: React.forwardRef((props, ref) => (
        <TableContainer component={Paper} {...props} ref={ref} />
      )),
      Table: (props) => (
        <Table
          {...props}
          sx={{ borderCollapse: "separate", tableLayout: "fixed" }}
        />
      ),
      TableHead,
      TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
      TableBody: React.forwardRef((props, ref) => (
        <TableBody {...props} ref={ref} />
      )),
    };

    function rowContent(_index, row) {
      return (
        <React.Fragment>
          {columns.map((column) => (
            <TableCell key={column.dataKey} align="left">
              {row[column.dataKey]}
            </TableCell>
          ))}
        </React.Fragment>
      );
    }

    function fixedHeaderContent() {
      return (
        <TableRow>
          {columns.map((column) => (
            <TableCell
              key={column.dataKey}
              variant="head"
              align="left"
              style={{ width: 120, verticalAlign: "top" }}
              sx={{
                backgroundColor: "background.paper",
              }}
            >
              {column.label}
            </TableCell>
          ))}
        </TableRow>
      );
    }
    return (
      <Paper style={{ height: 516, width: "100%", boxShadow: "none" }}>
        <TableVirtuoso
          data={statistic}
          components={VirtuosoTableComponents}
          fixedHeaderContent={fixedHeaderContent}
          itemContent={rowContent}
        />
      </Paper>
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
