import React from "react";


export const ContentNameSelector = (props) => {
	const onChange = (event) => {
		props.onChangeContentName({ contentName: event.target.value });
	};


	return <>
		<div className="row">
			<div className="col-md-5">
				<label htmlFor="documentSelector">Select document</label>
			</div>
			<div className="col-md-7" >
				<input type="text" value={props.contentName} onChange={onChange} className="form-control" id="documentSelector" />
			</div>
		</div>
	</>;
}