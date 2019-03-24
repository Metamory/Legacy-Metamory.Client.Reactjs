import React from "react";

const DRAFT = "DRAFT";

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
			draftVersion: undefined
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
			.then(metadata => {
				const availableVersions = metadata.versions;
				const publishedVersionId = metadata.publishedVersionId;
				const latestVersionId = availableVersions[availableVersions.length - 1] && availableVersions[availableVersions.length - 1].versionId;
				const currentVersionId = this.state.currentVersionId || publishedVersionId || latestVersionId;

				this.setState({
					publishedVersionId: metadata.publishedVersionId,
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

		if (versionId === DRAFT) {
			this.setState({
				content: this.state.draft,
				currentVersionId: DRAFT
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
		if (this.state.currentVersionId === DRAFT) {
			this.setState({
				draft: this.state.content
			});
		}

		if (versionId === DRAFT) {
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
		const contentUrl = `${this.props.serviceBaseUrl}/${this.props.siteName}/${this.state.contentName}/${this.state.currentVersionId}/status`;
		const body = {
			status: "Published",
			// startDate: "",	// publication date
			// responsible: "",
		};
		const headers = {
			'Content-Type': 'application/json'
		};
		fetch(contentUrl, { method: "POST", mode: "cors", cache: "no-cache", headers, body: JSON.stringify(body) })
			.then(response => response.json())
			.then(response => {
				const publishedVersionId = response.filter(statusItem => statusItem.isPublished)[0].versionId;
				// console.log("*** new published version should be", publishedVersionId);
				this.setState({
					publishedVersionId
				});
			});

	}


	onSave = ({label}) => {
		const contentUrl = `${this.props.serviceBaseUrl}/${this.props.siteName}/${this.state.contentName}`;
		const body = {
			previousVersionId: this.state.draftVersion.previousVersionId,
			content: this.state.content,
			label,
			contentType: this.props.contentType
		};
		const headers = {
			'Content-Type': 'application/json'
		};
		fetch(contentUrl, { method: "POST", mode: "cors", cache: "no-cache", headers, body: JSON.stringify(body) })
			.then(response => response.json())
			.then(newlyCreatedVersion => {
				this.setState({
					availableVersions: [...this.state.availableVersions, newlyCreatedVersion],
					currentVersionId: newlyCreatedVersion.versionId,
					draftVersion: undefined
				});
			});
	}


	resetDraftIfVersionHasChanged() {
		if (this.state.currentVersionId === DRAFT) {
			return;
		}

		this.setState({
			draftVersion: {
				versionId: DRAFT,
				previousVersionId: this.state.currentVersionId || undefined,
				isPublished: false,
				isDraft: true
			},
			content: this.state.draft
		});
	}


	selectDraftAsCurrentVersion() {
		this.setState({
			currentVersionId: DRAFT
		});
	}


	onEdit = ({ content }) => {
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
			availableVersions: this.state.draftVersion === undefined
				? this.state.availableVersions
				: [...this.state.availableVersions, this.state.draftVersion],
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