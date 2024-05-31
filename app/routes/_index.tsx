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
    <div className="lg:py-12 p-5 border-2 border-primary rounded-2xl">
      <div className="mx-auto max-w-screen-2xl">
        <h2 className="mb-4 text-center text-2xl text-secondary p-6 font-thin md:font-extrabold">
          INDEX ROUTE
        </h2>
      </div>
      <Form
        method="post"
        className="flex flex-col items-center gap-2 glass"
        reloadDocument
      >
        <label
          htmlFor="name"
          className="input input-bordered flex items-center gap-2"
        >
          Name
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Jack Doe"
            className="grow"
          />
        </label>

        <label
          htmlFor="email"
          className="input input-bordered flex items-center gap-2"
        >
          Email
          <input
            type="email"
            id="email"
            name="email"
            placeholder="jack123@gmail.com"
            className="grow"
          />
        </label>

        <button
          type="submit"
          className="btn bg-accent text-neutral hover:bg-neutral hover:"
        >
          Create User
        </button>
      </Form>
      {data && (
        <div>
          <h2>USERS</h2>
          <ul>
            {data.map((user) => (
              <li key={user._id}>
                <div className="tooltip tooltip-accent" data-tip={`link to ${user.username}`}>
                  <Link to={`/${user.username}?info`} className="btn">
                    {user.username}
                  </Link>
                </div>
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
    return (
      <Link to="/" role="alert" className="alert alert-error">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>Error! Something went wrong. Click to return</span>
      </Link>
    );
  }
  return (
    <Link to="/" className="toast toast-top toast-end">
      <div className="alert alert-info">
        <span>Error! Something went wrong. Click to return</span>
      </div>
    </Link>
  );
}
