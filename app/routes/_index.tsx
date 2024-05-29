import { isRouteErrorResponse, useRouteError } from "@remix-run/react";
import { redirect } from "@remix-run/node";
import { Form, Outlet, useLoaderData, useActionData } from "@remix-run/react";

export const meta = () => {
  return [
    { title: "Remix-Vite-Test" },
    { name: "description", content: "Welcome to the test remix" },
  ];
};

export const loader = async () => {
  return { message: "Hello from Remix-Vite-Test" };
};

export const action = async ({ request }) => {

  const formData = await request.formData();
  console.log("formData", formData.get("action"));

  const action = formData.get("action");
  return action;
};

export default function Index() {
  const data = useLoaderData();
  const actionData = useActionData();

  return (
    <div className="bg-white lg:py-12 ">
      <div className="mx-auto max-w-screen-2xl">
        <h2 className="mb-4 text-center text-2xl text-gray-800 p-6 font-thin md:font-extrabold">
          INDEX ROUTE
        </h2>
      </div>
      <Form method="post">
        <input name="action" defaultValue="go go power rangers" hidden/>
        <button type="submit">Go action</button>
      </Form>
      {data.message && <p className="font-extrabold">{data.message}</p>}
      {actionData && <p className="font-thin italic">{actionData}</p>}
    </div>
  );
}


export function ErrorBoundary(){
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return <div/>
  }
  return <div/>
}
