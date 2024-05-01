import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import NoteApp from "./components/NoteApp";
import { newInitialData } from "./utils/index";

import "./styles/style.css";

const root = createRoot(document.getElementById("root"));
root.render(
	<StrictMode>
      <NoteApp newInitialData={newInitialData} />
	</StrictMode>,
);
