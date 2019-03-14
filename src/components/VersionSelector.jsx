import React from "react";


export const VersionSelector = (props) => {
	const onChange = (event) => {
		props.onChangeVersionId({ versionId: event.target.value });
	};

	return <>
		<div className="row">
			<div className="col-md-4">
				<label htmlFor="versionSelector">Select version</label>
			</div>
			<div className="col-md-8">
				<select value={props.currentVersionId}
					onChange={onChange}
					className="form-control"
					id="versionSelector"
				>
					{props.availableVersions.map((version, ix) =>
						<option value={version.versionId} key={ix}>
							{version.versionId === props.publishedVersionId ? "*" : ""}
							{version.versionId}
							{version.label && ` (${version.label})`}
						</option>)}
				</select>
			</div>
		</div>
	</>;
}