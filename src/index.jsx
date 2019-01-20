import "bootstrap/dist/css/bootstrap.css";

import ReactDOM from "react-dom";
import React from "react";
import { ContentNameSelector } from "./components/ContentNameSelector";
import { VersionSelector } from "./components/VersionSelector";
import { PublishButton } from "./components/PublishButton";
import { SaveButton } from "./components/SaveButton";
import { Editor } from "./components/Editor";
import { Metamory } from "./components/Metamory";


ReactDOM.render(
	<>
		<Metamory serviceBaseUrl="http://some-metamory-server"
			siteName="testsite"
			contentName="testcontent"
		>
			<ContentNameSelector />
			<VersionSelector />
			<PublishButton />
			<Editor />
			<SaveButton />
		</Metamory>
	</>,
	document.getElementById("app"));


