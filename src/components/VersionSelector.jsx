import React from "react";

export class VersionSelector extends React.Component {
	constructor(props) {
		super(props);
	}

	onChange(){
		console.log("*** VersionSelector.onChange")
	}

	render() {
		return <>
			<div className="row">
				<div className="col-md-5">
					<label htmlFor="versionSelector">Select version of document {this.props.documentName}</label>
				</div>
				<div className="col-md-7" >
					{/* <select className="form-control" id="versionSelector">
					<option>1</option>
					<option>2</option>
					<option>3</option>
					<option>4</option>
					</select> */}
					<input type="text" value={this.props.version} onChange={this.onChange.bind(this)} className="form-control" id="versionSelector" />
				</div>
			</div>
		</>;
		}
}