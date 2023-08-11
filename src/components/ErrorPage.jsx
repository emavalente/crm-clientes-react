import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  return (
    <div className="space-y-8">
      <h1 className="mt-20 text-center text-6xl font-extrabold text-blue-900">
        CRM - Clientes
      </h1>
      <p className="text-center font-bold">Ocurrió un error inesperado...</p>
      <p>{error.statusText || error.message}</p>
    </div>
  );
};

export default ErrorPage;
