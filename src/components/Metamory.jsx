import React from "react";

export class Metamory extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			contentName: props.contentName || "",
			currentVersionId: props.versionId || "",
			publishedVersionId: undefined,
			availableVersions: [],
			content: undefined,

			draft: undefined,
			isDraftInAvailableVersions: false
		};
	}


	componentDidMount() {
		this.loadVersions(this.state.contentName)
			.then(() => this.loadContent(this.state.currentVersionId))
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
		return fetch(versionsUrl, {mode: "cors"})
			.then(response => response.json())
			.then(availableVersions => {
				const publishedVersion = availableVersions.filter(version => version.isPublished)[0]
				const publishedVersionId = publishedVersion && publishedVersion.versionId;
				const latestVersionId = availableVersions[availableVersions.length - 1] && availableVersions[availableVersions.length - 1].versionId;
				const currentVersionId = this.state.currentVersionId || publishedVersionId || latestVersionId;

				this.setState({
					publishedVersionId,
					currentVersionId,
					availableVersions
				});
			});
	}

	loadContent(versionId) {
		this.setState({
			// contentName: undefined,
			currentVersionId: versionId,
			content: undefined
		});

		if (!versionId) {
			return Promise.reject(new Error("Failed to load content, since no version was selected"));
		}

		if (versionId === "DRAFT") {
			this.setState({
				content: this.state.draft,
				currentVersionId: "DRAFT"
			});
			return Promise.resolve();
		}

		const contentUrl = `${this.props.serviceBaseUrl}/${this.props.siteName}/${this.state.contentName}/${versionId}`;
		return fetch(contentUrl, {mode: "cors"})
			.then(response => response.text())
			.then(content => {
				this.setState({
					currentVersionId: versionId,
					content
				});
			});
	}


	onLoad = ({ contentName }) => {
		this.setState({
			contentName: contentName,
			currentVersionId: undefined,
			content: ""
		});

		this.loadVersions(contentName)
			.then(() => this.loadContent(this.state.currentVersionId))
			.catch(err => console.warn(err));
	}


	onChangeVersionId = ({ versionId }) => {
		if (this.state.currentVersionId === "DRAFT") {
			this.setState({
				draft: this.state.content
			});
		}

		if (versionId === "DRAFT") {
			this.setState({
				content: this.state.draft,
				currentVersionId: versionId
			});
			return;
		}

		this.loadContent(versionId)
			.catch(err => console.warn(err));
	}


	onPublish = (data) => {
		console.log("*** Metamory.onPublish", data);
		//TODO: Publish here!

		// some_promise.then((newlyPublishedVersion) => {
		// 	this.setState({
		// 		publishedVersionId: newlyPublishedVersion.versionId
		// 	});
		// });
	}


	onSave = ({label}) => {
		console.log("*** Metamory.onSave", { label, content: this.state.content });

		const contentUrl = `${this.props.serviceBaseUrl}/${this.props.siteName}/${this.state.contentName}`;
		const body = {
			previousVersionId: this.draftVersion.previousVersionId,
			content: this.state.content,
			label,
			contentType: this.props.contentType
		};
		fetch(contentUrl, { method: "POST", mode: "cors", cache: "no-cache", body: JSON.stringify(body) })
			.then(newlyCreatedVersion => {
				this.setState({
					isDraftInAvailableVersions: false
				});

				delete this.draftVersion.isDraft;
				Object.assign(this.draftVersion, newlyCreatedVersion);
			});


		//TODO: Set timestamp and copy version properties!
		//TODO: Save content here!

		// some_promise.then((newlySavedVersion) => {
		// 	this.setState({
		// 		availableVersions: [...availableVersions, newlySavedVersion]
		// 	});
		// });
	}


	draftVersion = undefined;


	ensureDraftInAvaliableVersions() {
		if (this.state.isDraftInAvailableVersions) {
			return;
		}

		this.draftVersion = {
			versionId: "DRAFT",
			// timestamp: undefined,
			previousVersionId: undefined,
			// author: undefined,
			// label: undefined,
			isPublished: false,
			isDraft: true
		};

		this.setState({
			isDraftInAvailableVersions: true,
			availableVersions: [...this.state.availableVersions, this.draftVersion]
		});
	}


	resetDraftIfVersionHasChanged() {
		if (this.state.currentVersionId === "DRAFT") {
			return;
		}

		Object.assign(this.draftVersion, {
			previousVersionId: this.state.currentVersionId || undefined,
		});

		this.setState({
			content: this.state.draft
		});
	}


	selectDraftAsCurrentVersion() {
		this.setState({
			currentVersionId: "DRAFT"
		});
	}


	onEdit = ({ content }) => {
		this.ensureDraftInAvaliableVersions();
		this.resetDraftIfVersionHasChanged();
		this.selectDraftAsCurrentVersion();

		this.setState({
			content
		});
	}


	render() {
		const newProps = {
			contentName: this.state.contentName,
			publishedVersionId: this.state.publishedVersionId,
			currentVersionId: this.state.currentVersionId,
			onChangeVersionId: this.onChangeVersionId,
			availableVersions: this.state.availableVersions,
			content: this.state.content,
			onLoad: this.onLoad,
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