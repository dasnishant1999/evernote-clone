import React, { useContext } from "react";
import { Context } from "../contexts/Context";

import Sidebar from "../components/Sidebar/Sidebar";
import Editor from "../components/Editor/Editor";
import "./Home.css";

function Home() {
  const { selectedNote } = useContext(Context);

  return (
    <div className="home">
      <Sidebar />
      {selectedNote && <Editor />}
    </div>
  );
}

export default Home;
