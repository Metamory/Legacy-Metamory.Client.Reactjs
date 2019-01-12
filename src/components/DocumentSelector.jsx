import React from "react";

export class DocumentSelector extends React.Component {
	constructor(props) {
		super(props);
	}

	onChange(){
		console.log("*** DocumentSelector.onChange")
	}

	render() {
		return <>
			<div className="row">
				<div className="col-md-5">
					<label htmlFor="documentSelector">Select document</label>
				</div>
				<div className="col-md-7" >
					<input type="text" value={this.props.contentName} onChange={this.onChange.bind()} className="form-control" id="documentSelector" />
				</div>
			</div>
		</>;
		}
}