import { Form } from "@remix-run/react";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const toolBarOptions = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link"],
    ["clean"],
  ],
};

export default function TextEditor() {
  const [content, setContent] = useState("");

  const handleChange = (content, delta, source, editor) => {
    setContent(editor.getHTML());
  };

  return (
    <div>
      <Form method="post" className="flex flex-col gap-2">
        <ReactQuill
          className="bg-white h-96 flex flex-col-reverse rounded-lg"
          theme="snow"
          placeholder="Write description"
          modules={toolBarOptions}
          value={content}
          onChange={handleChange}
        />
        <input type="hidden" name="content" value={content} />
        <button
          type="submit"
          className="bg-slate-200 p-2 px-10 m-auto rounded-full hover:shadow-md"
        >
          Submit
        </button>
      </Form>
    </div>
  );
}
