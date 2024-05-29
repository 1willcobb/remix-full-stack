import { Button, Html, Tailwind } from "@react-email/components";

export default function Email(insert) {
const content = insert;

  return (
    <Html>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                brand: "#007291",
              },
            },
          },
        }}
      >
        <div className="flex flex-col">
        {content}
          <Button
            href="https://sorev.co"
            className="bg-brand px-3 py-2 font-medium leading-4 text-white"
          >
            Click me
          </Button>
        </div>
      </Tailwind>
    </Html>
  );
}
