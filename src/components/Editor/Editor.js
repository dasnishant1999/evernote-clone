import React, { useContext, useEffect, useState } from "react";
import ReactQuill from "react-quill";

import BorderColorRoundedIcon from "@material-ui/icons/BorderColorRounded";

import "./Editor.css";
import { Context } from "../../contexts/Context";

function Editor() {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const { selectedNote, updateTitle, updateBody } = useContext(Context);

  useEffect(() => {
    setText(selectedNote.body);
    setTitle(selectedNote.title);
    setId(selectedNote.id);
  }, [selectedNote]);

  return (
    <div className="editor">
      <div className="editor-head">
        <BorderColorRoundedIcon className="editIcon" />
        <input
          className="titleInput"
          placeholder="Note title"
          value={title ? title : ""}
          onChange={(e) => {
            setTitle(e.target.value);
            updateTitle(e.target.value);
          }}
        ></input>
      </div>
      <ReactQuill
        value={text}
        onChange={(value) => {
          setText(value);
          updateBody(value);
        }}
      ></ReactQuill>
    </div>
  );
}

export default Editor;
