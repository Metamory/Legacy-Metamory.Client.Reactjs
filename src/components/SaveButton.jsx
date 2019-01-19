import React from "react";


export class SaveButton extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			label: ""
		};
	}

	onChangeLabel = (event) => {
		this.setState({ label: event.target.value });
	}

	onSave = () => {
		this.props.onSave({
			contentName: this.props.contentName,
			label: this.state.label
		});
	}

	render() {
		return <>
			<div className="row">
				<div className="col-md-12">
					<div className="input-group">
						<input type="text"
							onChange={this.onChangeLabel}
							value={this.state.label}
							className="form-control"
						/>
						<div className="input-group-append">
							<button onClick={this.onSave}
								className="btn btn-primary"
								id="saveButton"
							>
								{this.props.children || "Save"}
							</button>
						</div>
					</div>
				</div>
			</div>
		</>;
	}
}
