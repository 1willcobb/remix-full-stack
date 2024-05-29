import { isRouteErrorResponse, useRouteError } from "@remix-run/react";
import { Suspense } from "react";
// import { sendEmail } from "../utils/mailgun";
import TextEditor from "~/components/TextEditor.client";

// export const action = async ({ request }) => {
//   try {
//     const formData = await request.formData();
//     const html = formData.get("content");
//     console.log("Received content:", html);
//     console.log("sending email");

//     await sendEmail({
//       to: "will@sorev.co",
//       subject: `Hello from Remix!!`,
//       html,
//     });

//     return null; // or return a meaningful response like json({ success: true })
//   } catch (error) {
//     console.error("Error sending email:", error);
//     // Handle the error appropriately, for example, by returning a response with an error message
//     return new Response("Failed to send email", { status: 500 });
//   }
// };

export default function EmailRoute() {
  return (
    <div className="flex items-center w-full justify-center flex-col">
      <h1>Send an Email</h1>
      
      <Suspense fallback={<div>Loading editor...</div>}>
        <TextEditor />
      </Suspense>
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
