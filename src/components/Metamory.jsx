import React from "react";

export class Metamory extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			contentName: props.contentName || "",
			currentVersionId: props.versionId || "",
			publishedVersionId: undefined,
			availableVersions: [],
			content: undefined
		};
	}


	componentDidMount() {
		this.loadVersions(this.state.contentName)
			.then(() => this.loadContent(this.state.contentName, this.state.currentVersionId))
			.catch(err => console.warn(err));
	}


	componentWillUnmount() {
	}


	loadVersions(contentName) {
		this.setState({
			contentName,
			currentVersionId: undefined,
			content: ""
		});

		if (!contentName) {
			return Promise.reject(new Error("Failed to load versions, since no content name was selected"));
		}

		const versionsUrl = `${this.props.serviceBaseUrl}/${this.props.siteName}/${contentName}/versions`;
		return fetch(versionsUrl)
			.then(response => response.json())
			.then(availableVersions => {
				const publishedVersion = availableVersions.filter(version => version.isPublished)[0]
				const publishedVersionId = publishedVersion && publishedVersion.versionId;
				const latestVersionId = availableVersions[availableVersions.length - 1];
				const currentVersionId = this.state.currentVersionId || publishedVersionId || latestVersionId;

				this.setState({
					publishedVersionId,
					currentVersionId,
					availableVersions
				});
			});
	}

	loadContent(contentName, versionId) {
		this.setState({
			contentName: undefined,
			currentVersionId: versionId,
			content: undefined
		});

		if (!versionId) {
			return Promise.reject(new Error("Failed to load content, since no version was selected"));
		}

		const contentUrl = `${this.props.serviceBaseUrl}/${this.props.siteName}/${contentName}/${versionId}`;
		return fetch(contentUrl)
			.then(response => response.text())
			.then(content => {
				this.setState({
					contentName,
					currentVersionId: versionId,
					content
				});
			});
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
		this.setState({
			contentName: data.contentName,
			currentVersionId: undefined,
			content: ""
		});

		this.loadVersions(data.contentName)
			.then(() => this.loadContent(data.contentName, this.state.currentVersionId))
			.catch(err => console.warn(err));
	}


	onChangeVersionId = (data) => {
		this.loadContent(this.state.contentName, data.versionId)
			.catch(err => console.warn(err));
	}


	onEdit = (data) => {
		//TODO: Make sure edits are on a new and unsaved version
		this.setState({
			content: data.content,
			currentVersionId: undefined
		});
	}


	render() {
		const newProps = {
			contentName: this.state.contentName,
			onChangeContentName: this.onChangeContentName,
			publishedVersionId: this.state.publishedVersionId,
			currentVersionId: this.state.currentVersionId,
			onChangeVersionId: this.onChangeVersionId,
			availableVersions: this.state.availableVersions,
			content: this.state.content,
			onPublish: this.onPublish,
			onSave: this.onSave,
			onEdit: this.onEdit
		};
		return <div className={"Metamory"}>
			{React.Children.map(this.props.children, child =>
				React.cloneElement(child, newProps)
			)}
		</div>;
	}
}