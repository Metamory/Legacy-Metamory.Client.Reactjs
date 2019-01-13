import React from "react";


export const SaveButton = (props) => {
	const onSave = () => {
		props.onSave({
			contentName: props.contentName,
		});
	}

	return <>
		<div className="row">
			<div className="col-md-5">
				<label htmlFor="publishButton">{props.contentName}</label>
			</div>
			<div className="col-md-7" >
				<button onClick={onSave} className="btn btn-primary" id="saveButton">
					{props.children || "Save"}
				</button>
			</div>
		</div>
	</>;
}
