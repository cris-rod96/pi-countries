import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
ReactDOM.createRoot(document.getElementById("root")).render(
  // Envuelvo a mi App con el Provider de Redux para que todos los componentes que esten dentro de App puedan acceder al store
  <Provider store={store}>
    // Envuelvo toda la App en BrowserRouter para poder acceder a las rutas
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
