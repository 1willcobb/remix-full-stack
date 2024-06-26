import { Outlet, useLoaderData, useParams, Link } from "@remix-run/react";
import { useState } from "react";
import { getUserByUsername } from "../utils/controllers/UserController.server";

export const loader = async ({ request, params }) => {
  const { user } = params;

  const userData = await getUserByUsername(user);

  console.log("loader user: " + user);

  return userData;
};

export default function UserPage() {
  const { user } = useParams();
  const data = useLoaderData();
  const [toggleLink, setToggleLink] = useState(false);

  return (
    <section className=" flex border-2 border-primary rounded-2xl">
      <div>
        <h1>User Page</h1>
        <h2>Welcome {user}</h2>
        {data.username && <p>{data.email}</p>}
        {toggleLink ? (
          <button onClick={() => setToggleLink(!toggleLink)} className="btn btn-outline btn-secondary">
            <Link to={`/${user}`}>Back to {user} page</Link>
          </button>
        ) : (
          <button onClick={() => setToggleLink(!toggleLink)} className="btn btn-outline btn-secondary">
            <Link to={`/${user}/email`}>Email User</Link>
          </button>
        )}
      </div>

      <Outlet />
    </section>
  );
}
