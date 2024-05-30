import {
  isRouteErrorResponse,
  useRouteError,
  Form,
  useLoaderData,
  Link,
} from "@remix-run/react";


import {
  createUser,
  getAllUsers,
} from "~/utils/controllers/UserController.server";

export const meta = () => {
  return [
    { title: "Remix-Vite-Test" },
    { name: "description", content: "Welcome to the test remix" },
  ];
};

export const loader = async () => {
  const allUsers = await getAllUsers();
  return allUsers || { message: "No users found" };
};

export const action = async ({ request }) => {
  const formData = await request.formData();

  const username = formData.get("name");
  const email = formData.get("email");

  console.log(username, email);

  const action = await createUser(username, email);

  console.log("action: " + action);

  return action || null;
};

export default function Index() {
  const data = useLoaderData();

  return (
    <div className="bg-white lg:py-12 p-5">
      <div className="mx-auto max-w-screen-2xl">
        <h2 className="mb-4 text-center text-2xl text-gray-800 p-6 font-thin md:font-extrabold">
          INDEX ROUTE
        </h2>
      </div>
      <Form
        method="post"
        className="flex flex-col items-center gap-2"
        reloadDocument
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          className="bg-slate-200 rounded-lg p-2 "
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          className="bg-slate-200 rounded-lg p-2 "
        />
        <button type="submit">Create User</button>
      </Form>
      {data && (
        <div>
          <h2>USERS</h2>
          <ul>
            {data.map((user) => (
              <li key={user._id}>
                <Link to={`/${user.username}`}>{user.username}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return <div />;
  }
  return <div />;
}
