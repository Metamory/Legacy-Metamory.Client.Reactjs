import React from "react";
import { VersionSelector } from "./VersionSelector";


export class Editor extends React.Component {
	constructor(props) {
		super(props);

		//TODO: Load document versions, and latest/published version of document
	}


	save = () => {
		console.log("You pressed save!", this.props);
	}

	render() {
		return <>
			<h2>Editor for "{this.props.documentName}"</h2>
			<VersionSelector></VersionSelector>
			<div className="row">
				<div className="col-md-12">
					<div className="form-group">
						<textarea className="form-control"></textarea>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col-md-12">
					<div className="form-group">
						<button type="button" onClick={this.save} className="btn btn-primary">Save</button>
					</div>
				</div>
			</div>
		</>;
	}
}