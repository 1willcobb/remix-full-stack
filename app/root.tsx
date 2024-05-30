import { type LinksFunction, json } from "@vercel/remix";
import {
  isRouteErrorResponse,
  useRouteError,
  Links,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";

import "./tailwind.css";

export const links: LinksFunction = () => {
  return [
    {
      rel: "preconnect",
      href: "https://fonts.googleapis.com",
    },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossOrigin: "anonymous",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Poetsen+One&display=swap",
    },
  ];
};

import { getUsers } from "./utils/controllers/UserController.server";

export const loader = async () => {
  const data = "Hello World";
  return { message: data };
};

export const action = async ({ request }) => {
  // Handle form submission logic here
  return json({ message: "Form submitted successfully" });
};

export function Layout() {
  const data = useLoaderData();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="m-3 bg-slate-300 bg-slate-400">
        <nav className="flex items-center justify-between px-10 p-5 space-x-3 bg-slate-200">
          <div className="flex gap-3 justify-start">
            <NavLink to="/" className="text-2xl font-extrabold ">
              HOME
            </NavLink>
            <NavLink to="/email" className="text-2xl font-extrabold">
              EMAIL
            </NavLink>
            <NavLink to="/1app" className="text-2xl font-extrabold">
              APP
            </NavLink>
          </div>
          <p>{data.message}</p>
        </nav>
        <div className="flex flex-col max-w-screen-lg m-auto">
          <Outlet />
        </div>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return <h2>oh shit</h2>;
  }
  return <h2>oh shit again!</h2>;
}
