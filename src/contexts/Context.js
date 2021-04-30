import React, { createContext, useState, useEffect, useRef } from "react";

import { db, timestamp } from "../config/firebase";
import { useAuth } from "./AuthProvider";

export const Context = createContext();

function ContextProvider({ children }) {
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const [notes, setNotes] = useState([]);
  const titleRef = useRef("");
  const bodyRef = useRef("");
  const { currentUser } = useAuth();

  useEffect(() => {
    db.collection("users")
      .doc(currentUser.uid)
      .collection("notes")
      .orderBy("updatedAt", "desc")
      .onSnapshot((snapshot) => {
        const notes = snapshot.docs.map((doc) => {
          const data = doc.data();
          data["id"] = doc.id;
          return data;
        });
        console.log("effect");
        setNotes(notes);
      });
    return () => {};
  }, []);

  const addNote = async (noteTitle) => {
    if (!noteTitle) {
      return alert("Note should have a title");
    }
    await db.collection("users").doc(currentUser.uid).collection("notes").add({
      title: noteTitle,
      body: "",
      updatedAt: timestamp(),
    });
    setSelectedNote(null);
    setSelectedNoteIndex(null);
  };

  const selectNote = (note, index) => {
    setSelectedNoteIndex(index);
    setSelectedNote(note);
  };

  //debounce
  const doSomeMagic = (fn, timeOut) => {
    let timer;
    return function () {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn();
      }, timeOut);
    };
  };

  const debounceTitle = doSomeMagic(
    () =>
      db
        .collection("users")
        .doc(currentUser.uid)
        .collection("notes")
        .doc(selectedNote.id)
        .update({ title: titleRef.current }),
    1000
  );

  const updateTitle = (title) => {
    titleRef.current = title;
    debounceTitle();
  };

  const debounceBody = doSomeMagic(
    () =>
      db
        .collection("users")
        .doc(currentUser.uid)
        .collection("notes")
        .doc(selectedNote.id)
        .update({ body: bodyRef.current }),
    1500
  );

  const updateBody = (body) => {
    bodyRef.current = body;
    debounceBody();
  };

  //debounce

  const deleteNote = (note) => {
    if (window.confirm(`Are you sure you want to delete ${note.title}?`)) {
      db.collection("users")
        .doc(currentUser.uid)
        .collection("notes")
        .doc(note.id)
        .delete();
      console.log("delete");
      setSelectedNote(null);
      setSelectedNoteIndex(null);
    }
  };

  return (
    <Context.Provider
      value={{
        notes,
        selectedNoteIndex,
        selectedNote,
        addNote,
        deleteNote,
        selectNote,
        updateTitle,
        updateBody,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export default ContextProvider;
