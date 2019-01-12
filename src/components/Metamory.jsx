import React from "react";
import { DocumentSelector } from "./DocumentSelector";
import { VersionSelector } from "./VersionSelector";
import { PublishButton } from "./PublishButton";
import { Editor } from "./Editor";
import { SaveButton } from "./SaveButton";

export class Metamory extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			contentName: props.contentName,
			version: props.version,
			content: props.content
		};

		this.render.bind(this)
	}

	render() {
		return <div style={{border: "2px solid lightgray", borderRadius: "4px"}}>
			ContentName: "{this.state.contentName}", Version: {this.state.version}
			<hr/>
			{React.Children.map(this.props.children, child => React.cloneElement(child, this.state))}
		</div>;
	}
}