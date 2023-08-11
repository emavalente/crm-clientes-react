import { Form, useNavigate, redirect } from "react-router-dom";
import { eliminarCliente } from "../data/clientes";

export function action({ params }) {
  eliminarCliente(params.clienteId);
  return redirect("/");
}

const Cliente = ({ cliente }) => {
  const navigate = useNavigate();

  const { nombre, empresa, email, telefono, id } = cliente;

  return (
    <tr className="border-b">
      <td className="p-6 space-y-2">
        <p className="text-2xl text-gray-800">{nombre}</p>
        <p>{empresa}</p>
      </td>
      <td className="p-6">
        <p className="text-gray-600">
          Email:{" "}
          <span className="text-gray-800 uppercase front-bold">{email}</span>
        </p>
        <p className="text-gray-600">
          Telefono:{" "}
          <span className="text-gray-800 uppercase front-bold">{telefono}</span>
        </p>
      </td>
      <td className="p-6 flex gap-3 items-center">
        <button
          type="button"
          className="text-xs text-blue-600 hover:text-blue-700 uppercase font-bold"
          onClick={() => navigate(`/clientes/${id}/editar`)}
        >
          Editar
        </button>
        <Form
          method="post"
          action={`/clientes/${id}/eliminar`}
          onSubmit={(e) => {
            if (!confirm("Deseas eliminar este registro?")) {
              // Si el usuario cancela no se ejecuta el submit.
              e.preventDefault();
            }
          }}
        >
          <button
            type="submit"
            className="text-xs text-red-600 hover:text-red-700 uppercase font-bold"
          >
            Eliminar
          </button>
        </Form>
      </td>
    </tr>
  );
};

export default Cliente;
