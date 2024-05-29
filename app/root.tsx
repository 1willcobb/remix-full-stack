import type { LinksFunction } from "@remix-run/node";
import {
  isRouteErrorResponse,
  useRouteError,
  Links,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import "./tailwind.css";

export const links: LinksFunction = () => {
  return [
    {
      rel: "preconnect",
      href: "https://fonts.googleapis.com"
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
    }
  ];
};

// import { getUsers } from "./utils/user.server";

// export const loader = async () => {
//   console.log("loader");
//   return json("Hello World");

// };
//   return json(await getUsers());
// };

// import User from "./models/User";

// export const loader = async () => {
//   await User.find({});

// };

// const Users = (user) => {
//   return (
//     <ul>
//       {user.map((user) => (
//         <li key={user._id}>{user.name}</li>
//       ))}
//     </ul>
//   );
// };

export function Layout() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="m-3 bg-slate-300 bg-slate-400">
        <nav className="px-10 p-5 space-x-3 bg-slate-200">
          <NavLink to="/" className="text-2xl font-extrabold ">
            HOME
          </NavLink>
          <NavLink to="/email" className="text-2xl font-extrabold">
            EMAIL
          </NavLink>
          <NavLink to="/app" className="text-2xl font-extrabold">
            APP
          </NavLink>
        </nav>
        <Outlet/>
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
    return <h2>oh shit</h2> ;
  }
  return <h2>oh shit again!</h2> ;
}
