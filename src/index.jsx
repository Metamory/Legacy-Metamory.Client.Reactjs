import "bootstrap/dist/css/bootstrap.css";
import ReactDOM from "react-dom";
import React from "react";

import { Editor } from "./components/Editor";


ReactDOM.render(
	<Editor documentName="index.html"></Editor>,
	document.getElementById("app")
);
