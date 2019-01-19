import React from "react";


export const PublishButton = ({ contentName, currentVersionId, ...props }) => {
	const onPublish = () => {
		props.onPublish({
			contentName,
			currentVersionId
		});
	};

	return <>
		<div className="row">
			<div className="col-md-12" >
				<button onClick={onPublish}
					className="btn btn-warning float-right"
					id="publishButton"
				>
					{props.children || "Publish"}
				</button>
			</div>
		</div>
	</>;
}
