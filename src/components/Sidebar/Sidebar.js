import React, { useContext, useState } from "react";

import { Button, List } from "@material-ui/core";

import { Context } from "../../contexts/Context";
import "./Sidebar.css";
import SidebarItem from "../SidebarItem/SidebarItem";
import { useAuth } from "../../contexts/AuthProvider";

function Sidebar() {
  const [addingNote, setaddingNote] = useState(false);
  const [title, settitle] = useState("");

  const { notes, addNote } = useContext(Context);
  const { currentUser, logout } = useAuth();
  console.log(currentUser.email);

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        {/* <p>{currentUser.email}</p>
        <button onClick={logout}>Log Out</button> */}
        <Button
          className="new-note-btn"
          onClick={() => {
            setaddingNote(!addingNote);
            settitle("");
          }}
        >
          {addingNote ? "Cancel" : "New Note"}
        </Button>
        {addingNote ? (
          <div>
            <input
              className="new-note-input"
              type="text"
              placeholder="Note title"
              onChange={(e) => {
                settitle(e.target.value);
              }}
            ></input>
            <Button
              className="new-note-add-btn"
              onClick={() => {
                addNote(title);
                settitle("");
                setaddingNote(false);
              }}
            >
              Add Note
            </Button>
          </div>
        ) : null}
      </div>
      {notes && (
        <List>
          {notes.map((_note, _index) => {
            return (
              <SidebarItem
                key={_index}
                note={_note}
                index={_index}
              ></SidebarItem>
            );
          })}
        </List>
      )}
    </div>
  );
}

export default Sidebar;
