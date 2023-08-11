import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import NuevoCliente, {
  action as nuevoClienteAction,
} from "./pages/NuevoCliente";
import "./index.css";
import Index, { loader as listarClientesLoader } from "./pages/Index";
import ErrorPage from "./components/ErrorPage";
import EditarCliente, {
  loader as editarClienteLoader,
  action as editarClienteAction,
} from "./pages/EditarCliente";
import { action as eliminarClienteAction } from "./components/Cliente";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true, // Indicar routing para url principal.
        element: <Index />, // Monstrar un elemento dinamicamente.
        loader: listarClientesLoader, // capturar datos externos.
        errorElement: <ErrorPage />, // Mostrar pantalla de error.
      },
      {
        path: "/clientes/nuevo", // Indicar routing para url especifica.
        element: <NuevoCliente />, // Mostrar un elemento dinamicamente.
        action: nuevoClienteAction, // Función que se ejecuta para el action del formulario.
        errorElement: <ErrorPage />,
      },
      {
        path: "/clientes/:clienteId/editar",
        element: <EditarCliente />,
        loader: editarClienteLoader,
        action: editarClienteAction,
        errorElement: <ErrorPage />,
      },
      {
        path: "/clientes/:clienteId/eliminar",
        action: eliminarClienteAction,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
