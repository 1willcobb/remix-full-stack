import { useRouteError, isRouteErrorResponse } from '@remix-run/react';

export default function Project() {
  return (
    <div className="bg-white lg:py-12 ">
      <div className="mx-auto max-w-screen-2xl">
        <h2 className="mb-4 text-center text-2xl text-gray-800 p-6 font-thin md:font-extrabold">
          Project ROUTE
        </h2>
        <h2 className="mb-4 text-center text-2xl text-gray-800 p-6 font-thin md:font-extrabold">
          Project ROUTE
        </h2>
        <h2 className="mb-4 text-center text-2xl text-gray-800 p-6 font-thin md:font-extrabold">
          Project ROUTE
        </h2>
        <h2 className="mb-4 text-center text-2xl text-gray-800 p-6 font-thin md:font-extrabold">
          Project ROUTE
        </h2>
        <h2 className="mb-4 text-center text-2xl text-gray-800 p-6 font-thin md:font-extrabold">
          Project ROUTE
        </h2>
      </div>
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return <h2>oh shit projects</h2> ;
  }
  return <h2>oh shit again! Projects</h2> ;
}