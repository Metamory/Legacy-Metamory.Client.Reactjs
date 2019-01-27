import React from "react";


export class ContentNameSelector extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			contentName: props.contentName
		};
	}


	onChange = (event) => {
		this.setState({
			contentName: event.target.value
		});
	};


	onLoad = (event) => {
		this.props.onLoad({ contentName: this.state.contentName });
	}


	render() {
		return <>
			<div className="row">
				<div className="col-md-4">
					<label htmlFor="documentSelector">Select document</label>
				</div>
				<div className="col-md-8" >
					<div className="input-group">
						<input type="text"
							value={this.state.contentName}
							onChange={this.onChange}
							className="form-control"
							id="documentSelector"
						/>
						<div className="input-group-append">
							<button className="btn btn-primary"
								onClick={this.onLoad}
							>
								{this.props.children || "Load"}
							</button>
						</div>
					</div>
				</div>
			</div>
		</>;
	}
}