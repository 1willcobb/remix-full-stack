import { NavLink, Outlet, Form, useSearchParams, useFetcher, useLoaderData, useRouteError, isRouteErrorResponse } from "@remix-run/react";
import Project from "./projects";
import { createCookie } from "@remix-run/node";
export const prefs = createCookie("prefs");
import { json } from "@remix-run/node";

// read the state from the cookie
export async function loader({ request }) {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await prefs.parse(cookieHeader)) || {};
  return json({ sidebarIsOpen: cookie.sidebarIsOpen });
}

// write the state to the cookie
export async function action({ request }) {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await prefs.parse(cookieHeader)) || {};
  const formData = await request.formData();
  console.log("clicked");

  const isOpen = formData.get("sidebar") === "open";
  cookie.sidebarIsOpen = isOpen;

  return json(isOpen, {
    headers: {
      "Set-Cookie": await prefs.serialize(cookie),
    },
  });
}

export default function Something() {
  const fetcher = useFetcher();
  let { sidebarIsOpen } = useLoaderData();

  // use optimistic UI to immediately change the UI state
  if (fetcher.formData?.has("sidebar")) {
    sidebarIsOpen = fetcher.formData.get("sidebar") === "open";
  }

  return (
    <div className="bg-white lg:py-12">
      <div className="mx-auto max-w-screen-2xl">
        <h2 className="mb-4 text-center text-2xl text-gray-800 p-6 font-thin md:font-extrabold">
          APP ROUTE
        </h2>
        <fetcher.Form method="post">
          <button name="sidebar" value={sidebarIsOpen ? "closed" : "open"}>
            {sidebarIsOpen ? "Close" : "Open"}
          </button>
        </fetcher.Form>
        <aside hidden={!sidebarIsOpen}>
          <Project />
        </aside>
      </div>
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return <h2>oh shit app</h2>;
  }
  return <h2>oh shit again! app</h2>;
}
