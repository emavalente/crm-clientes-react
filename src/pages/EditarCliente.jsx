import {
  Form,
  redirect,
  useNavigate,
  useLoaderData,
  useActionData,
} from "react-router-dom";
import { obtenerCliente, actualizarCliente } from "../data/clientes";
import Formulario from "../components/Formulario";
import Error from "../components/Error";

export async function loader({ params }) {
  const { clienteId } = params;

  const cliente = await obtenerCliente(clienteId);

  if (Object.values(cliente).length === 0) {
    throw new Response("", {
      status: 404,
      statusText: "El Cliente no contiene resultados",
    });
  }
  return cliente;
}

export async function action({ request, params }) {
  console.log(request, params);

  const formData = await request.formData();
  const datos = Object.fromEntries(formData);
  const email = formData.get("email");

  // Validación de formulario.
  const errores = [];

  if (Object.values(datos).includes("")) {
    errores.push("Todos los campos son obligatorios");
  }

  //Validar Email.
  let regex = new RegExp(
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
  );
  //regex.test() evalua si se cumple la validación con la expresion regular. Retorna true o false.
  if (!regex.test(email)) {
    errores.push("El Email ingresado no es válido");
  }
  // Retornar datos o errores
  // aplicar Object.keys a un array retorna un array de los indices de este.
  if (Object.keys(errores).length) {
    return errores;
  }

  // Actualizar el cliente.
  await actualizarCliente(params.clienteId, datos);

  return redirect("/");
}

const EditarCliente = () => {
  const navigate = useNavigate();
  const cliente = useLoaderData();
  const errores = useActionData();

  return (
    <>
      <h1 className="text-4xl font-black text-blue-900">Editar Cliente</h1>
      <p className="mt-3">
        A continuación podrás modificar los datos de un Cliente
      </p>

      <div className="flex justify-end">
        <button
          className="bg-blue-800 text-white px-3 p-1 font-bold uppercase"
          onClick={() => navigate(-1)}
        >
          Volver
        </button>
      </div>

      <div className="bg-white shadow rounded-md md:w-3/4 mt-10 mx-auto px-5 py-10">
        {errores?.length &&
          errores.map((error, i) => <Error key={i}>{error}</Error>)}

        <Form method="post" noValidate>
          <Formulario cliente={cliente} />
          <input
            className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg "
            type="submit"
            value="Editar Cliente"
          />
        </Form>
      </div>
    </>
  );
};

export default EditarCliente;
