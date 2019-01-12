import React from "react";

export class SaveButton extends React.Component {
	constructor(props) {
		super(props);
	}

	save = () => {
		console.log("You pressed save!", this.props);
	}

	onSave() {
		console.log("*** SaveButton.onSave");
	}

	render() {
		return <>
			<div className="row">
				<div className="col-md-5">
					<label htmlFor="saveButton">Version {this.props.version} of {this.props.contentName}</label>
				</div>
				<div className="col-md-7" >
					<button onClick={this.onSave.bind(this)} className="btn btn-primary" id="saveButton">
						Save
					</button>
				</div>
			</div>
		</>;
	}
}