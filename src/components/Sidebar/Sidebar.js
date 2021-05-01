import React, { useContext, useState } from "react";

import { Button, List } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Context } from "../../contexts/Context";
import "./Sidebar.css";
import SidebarItem from "../SidebarItem/SidebarItem";
import { useAuth } from "../../contexts/AuthProvider";

function Sidebar() {
  const [addingNote, setaddingNote] = useState(false);
  const [title, settitle] = useState("");

  const { notes, addNote } = useContext(Context);
  const { currentUser, logout } = useAuth();
  // console.log(currentUser.email);

  return (
    <div className="sidebar">
      <div className="sidebar-profile">
        <p>{`${currentUser.email.split("@")[0]}`}</p>
        <ExitToAppIcon onClick={logout} />
      </div>
      <div className="sidebar-header">
        <Button
          onClick={() => {
            setaddingNote(!addingNote);
            settitle("");
          }}
        >
          {addingNote ? "Cancel" : "New Note"}
        </Button>
        {addingNote ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addNote(title);
              settitle("");
              setaddingNote(false);
            }}
          >
            <input
              className="new-note-input"
              type="text"
              placeholder="Note title"
              onChange={(e) => {
                settitle(e.target.value);
              }}
            ></input>
            <Button type="submit">Add Note</Button>
          </form>
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
