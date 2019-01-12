import React from "react";


export class Editor extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			content: props.content
		};

		//TODO: Load document versions, and latest/published version of document

		this.onChange = this.onChange.bind(this);
		this.onBlur = this.onBlur.bind(this);
	}

	onChange(event) {
		this.setState({content: event.target.value})
	}

	onBlur(event) {
		console.log("*** Editor.onBlur");
	}

	render() {
		return <>
			<label htmlFor="editor">Editor</label>
			<div className="row">
				<div className="col-md-12">
					<div className="form-group">
						<textarea value={this.state.content}
							onChange={this.onChange}
							onBlur={this.onBlur}
							className="form-control"
							id="editor"
						/>
					</div>
				</div>
			</div>
		</>;
	}
}