import React from "react";


export const VersionSelector = (props) => {
	const onChange = (event) => {
		props.onChangeVersion({ version: event.target.value });
	};

	return <>
		<div className="row">
			<div className="col-md-5">
				<label htmlFor="versionSelector">Select version of document {props.documentName}</label>
			</div>
			<div className="col-md-7" >
				<input type="text" value={props.version} onChange={onChange} className="form-control" id="versionSelector" />
			</div>
		</div>
	</>;
}