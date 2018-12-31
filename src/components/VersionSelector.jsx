import React from "react";

export class VersionSelector extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return <>
			<div className="row">
				<div className="col-md-4">
					<label htmlFor="versionSelector">Select version</label>
				</div>
				<div className="col-md-8" >
					{/* <select className="form-control" id="versionSelector">
					<option>1</option>
					<option>2</option>
					<option>3</option>
					<option>4</option>
					</select> */}
					<input type="text" className="form-control" id="versionSelector" />
				</div>
			</div>
		</>;
		}
}