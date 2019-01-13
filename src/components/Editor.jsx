import React from "react";


export const Editor = (props) => {
	const onChange = (event) => {
		props.onEdit({
			content: event.target.value
		});
	};

	return <>
		<label htmlFor="editor">Editor</label>
		<div className="row">
			<div className="col-md-12">
				<div className="form-group">
					<textarea value={props.content}
						onChange={onChange}
						className="form-control"
						id="editor"
					/>
				</div>
			</div>
		</div>
	</>;

}