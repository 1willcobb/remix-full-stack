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

export default function TextEditor(users) {
  const [content, setContent] = useState("");

  console.log("users: ", users);

  const handleChange = (content, delta, source, editor) => {
    setContent(editor.getHTML());
  };

  return (
    <div>
      <Form method="post" className="flex flex-col gap-2">
        {users.users.length > 1 ? (
          <div className="flex flex-col">
            <label htmlFor="email">Select User to Email</label>
            <select name="email" className="p-2 rounded-lg">
              {users.users.map((user) => (
                <option key={user._id} value={user.email}>
                  {user.username}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <input type="hidden" name="email" value={users.users[0].email} />
        )}
        <label htmlFor="subject">Subject</label>
        <input type="text" name="subject" className="bg-white p-2 rounded-lg" />
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
