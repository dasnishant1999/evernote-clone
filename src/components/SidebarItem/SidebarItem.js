import React, { useContext } from "react";
import { Context } from "../../contexts/Context";

import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import { ListItem, ListItemText } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
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
              removeHTMLTags(note.body)?(
              removeHTMLTags(note.body).length > 15
                ? `${removeHTMLTags(note.body).substring(0, 10)}...`
                : removeHTMLTags(note.body)):'Empty note'
            }
          ></ListItemText>
        </div>
        <DeleteRoundedIcon
          // style={{ marginLeft: "auto" }}
          onClick={() => deleteNote(note)}
        ></DeleteRoundedIcon>
      </ListItem>
      <Divider />
    </div>
  );
}

export default SidebarItem;
