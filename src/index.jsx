import "bootstrap/dist/css/bootstrap.css";

import ReactDOM from "react-dom";
import React from "react";
import { DocumentSelector } from "./components/DocumentSelector";
import { VersionSelector } from "./components/VersionSelector";
import { PublishButton } from "./components/PublishButton";
import { SaveButton } from "./components/SaveButton";
import { Editor } from "./components/Editor";
import { Metamory } from "./components/Metamory";


const MyChild = (props) => <h1>Hello {props.content}</h1>;

ReactDOM.render(
	<Metamory contentName="index.html" version="4" content="Hello World">
		<DocumentSelector/>
		<VersionSelector/>
		<PublishButton/>
		<Editor/>
		<SaveButton/>
	</Metamory>,
	document.getElementById("app"));




// import React, { Component } from 'react';
// import ReactDOM from 'react-dom';

// const Child = ({ index, someFunction, isActive }) => (
//     <div>
//         <button onClick={someFunction}>
//             Child {index}
//         </button>
//         <div style={{ display: isActive ? 'block': 'none'}}>
//             Child {index} Content
//         </div>
//     </div>
// )

// class Parent extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             activeIndex: 0
//         }
//     }

//     render() {
//         const children = React.Children.map(this.props.children, (child, index) => {
//             return React.cloneElement(child, {
//                 index,
//                 isActive: index === this.state.activeIndex,
//                 someFunction: () => this.setState({ activeIndex: index })
//             });
//         });

//         return (
//             <div>
//                 { children }
//             </div>
//         )
//     }
// }

// ReactDOM.render(
//   <div>
//       <Parent>
//           <Child />
//           <Child />
//       </Parent>
//   </div>,
//   document.getElementById('app')
// );