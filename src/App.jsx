import "./App.css";
import { DineroApuestaProvider } from "./Components/dineroApuestaContext.jsx";
import { useState } from "react";
import Form from "./Components/Form.jsx";
import Introduccion from "./Components/Introduccion";
import Datos from "./Components/DataParticular/Datos.jsx";

("use strict");
function App() {
  const [statistic, SetStatistic] = useState(null);
  const [graphstatistic, SetGraphStatistic] = useState(null);
  return (
    <DineroApuestaProvider
      value={{ statistic, SetStatistic, graphstatistic, SetGraphStatistic }}
    >
      <div>
        <div className="mt-4">
          <Introduccion />
        </div>
        <div className="mt-4">
          <Form />
        </div>
        <div className="mt-4">
          <Datos />
        </div>
      </div>
    </DineroApuestaProvider>
  );
}

export default App;
