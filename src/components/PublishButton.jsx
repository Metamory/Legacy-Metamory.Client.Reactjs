import React from "react";


export const PublishButton = ({ contentName, version, ...props }) => {
	const onPublish = () => {
		props.onPublish({
			contentName,
			version
		});
	};

	return <>
		<div className="row">
			<div className="col-md-5">
				<label htmlFor="publishButton">Version {version} of {contentName}</label>
			</div>
			<div className="col-md-7" >
				<button onClick={onPublish} className="btn btn-warning" id="publishButton">
					{props.children || "Publish"}
				</button>
			</div>
		</div>
	</>;
}
