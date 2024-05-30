import {
  isRouteErrorResponse,
  useRouteError,
  useLoaderData,
  useActionData,
} from "@remix-run/react";
import { Suspense } from "react";
import { sendEmail } from "~/utils/mailgun.server";
import TextEditor from "~/components/TextEditor.client";
import { getUserByUsername } from "~/utils/controllers/UserController.server";


export const loader = async ({ params }) => {
  const { user } = params;

  const userData = await getUserByUsername(user);

  console.log("userDarta: ", userData);
  return userData;
};

export const action = async ({ request }) => {
  try {
    const formData = await request.formData();
    const html = formData.get("content");
    const to = formData.get("email");
    const subject = formData.get("subject");
    console.log("sending email");

    await sendEmail({ to, subject, html });

    console.log("email sent");

    return { message: "Email Sent" }; // or return a meaningful response like json({ success: true })
  } catch (error) {
    console.error("Error sending email:", error);
    // Handle the error appropriately, for example, by returning a response with an error message
    return new Response("Failed to send email", { status: 500 });
  }
};

export default function EmailRoute() {
  const user = useLoaderData();
  const data = useActionData();

  return (
    <div className="flex items-center w-full justify-center flex-col">
      <h2>Send an email to {user.username}</h2>
      <Suspense fallback={<div>Loading editor...</div>}>
        <TextEditor users={[user]} />
      </Suspense>
      {data && (
        <div
          class="flex items-center p-4 mt-4 text-sm text-green-800 rounded-lg bg-green-50"
          role="alert"
        >
          <svg
            class="flex-shrink-0 inline w-4 h-4 me-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span class="sr-only">Info</span>
          <div>
            <span class="font-medium"> Success! </span> Email Sent
          </div>
        </div>
      )}
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return <h2>oh shit email</h2>;
  }
  return <h2>oh shit again! emails</h2>;
}
