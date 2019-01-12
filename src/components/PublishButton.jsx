import React from "react";

export class PublishButton extends React.Component {
	constructor(props) {
		super(props);
	}

	onPublish() {
		console.log("*** PubllishButton.onPublish")
	}

	render() {
		return <>
			<div className="row">
				<div className="col-md-5">
					<label htmlFor="publishButton">Version {this.props.version} of {this.props.contentName}</label>
				</div>
				<div className="col-md-7" >
					<button onClick={this.onPublish.bind(this)} className="btn btn-warning" id="publishButton">
						Publish
					</button>
				</div>
			</div>
		</>;
	}
}