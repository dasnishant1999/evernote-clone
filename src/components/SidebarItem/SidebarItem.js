import React, { useContext } from "react";
import { Context } from "../../contexts/Context";

import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import { ListItem, ListItemText } from "@material-ui/core";
import { removeHTMLTags } from "../../helpers";
import "./SidebarItem.css";

function SidebarItem({ note, index }) {
  const { deleteNote, selectNote, selectedNoteIndex } = useContext(Context);

  return (
    <div>
      <ListItem alignItems="flex-start" selected={selectedNoteIndex === index}>
        <div className="list-content" onClick={() => selectNote(note, index)}>
          <ListItemText
            primary={note.title}
            secondary={
              removeHTMLTags(note.body).length > 15
                ? `${removeHTMLTags(note.body).substring(0, 10)}...`
                : removeHTMLTags(note.body)
            }
          ></ListItemText>
        </div>
        <DeleteRoundedIcon
          // style={{ marginLeft: "auto" }}
          onClick={() => deleteNote(note)}
        ></DeleteRoundedIcon>
      </ListItem>
    </div>
  );
}

export default SidebarItem;
