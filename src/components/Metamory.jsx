import React from "react";
import { DocumentSelector } from "./ContentNameSelector";
import { VersionSelector } from "./VersionSelector";
import { PublishButton } from "./PublishButton";
import { Editor } from "./Editor";
import { SaveButton } from "./SaveButton";
import { promised } from "q";

export class Metamory extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			contentName: props.contentName,
			currentVersion: props.version,
			availableVersions: [],
			content: undefined
		};
	}


	componentDidMount() {
		//TODO: Remove this temporary content
		this.setState({ content: `This is version ${this.state.currentVersion} of the ${this.state.contentName} page` })

		console.log("*** Metamory.componentDidMount")
		//TODO: Fetch content here!
		//TODO: Fetch publishedVersion and availableVersions here!
		
		// some_promise.then(({publishedVersion, availableVersions}) => {
		// 	this.setState({
		// 		publishedVersion,
		//		availableVersions
		// 	});
		// });

	}


	componentWillUnmount() {

	}


	onPublish = (data) => {
		console.log("*** Metamory.onPublish", data);
		//TODO: Publish here!

		// some_promise.then((newlyPublishedVersion) => {
		// 	this.setState({
		// 		publishedVersion: newlyPublishedVersion
		// 	});
		// });
	}


	onSave = (data) => {
		console.log("*** Metamory.onSave", { ...data, content: this.state.content });
		//TODO: Save content here!

		// some_promise.then((newlySavedVersion) => {
		// 	this.setState({
		// 		availableVersions: [...availableVersions, newlySavedVersion]
		// 	});
		// });
	}


	onChangeContentName = (data) => {
		this.setState({ contentName: data.contentName });
	}


	onChangeVersion = (data) => {
		this.setState({ currentVersion: data.version });
	}


	onEdit = (data) => {
		this.setState({ content: data.content });
	}


	render() {
		const newProps = {
			contentName: this.state.contentName,
			version: this.state.currentVersion,
			content: this.state.content,
			availableVersions: this.state.availableVersions,
			onPublish: this.onPublish,
			onSave: this.onSave,
			onChangeContentName: this.onChangeContentName,
			onChangeVersion: this.onChangeVersion,
			onEdit: this.onEdit
		};
		return <div className={"Metamory"}>
			{React.Children.map(this.props.children, child =>
				React.cloneElement(child, newProps)
			)}
		</div>;
	}
}