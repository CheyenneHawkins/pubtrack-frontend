// const {ReactDraggable: Draggable, React, ReactDOM} = window;

// class DraggableDiv extends React.Component {
//   state = {
//     activeDrags: 0,
//     deltaPosition: {
//       x: 0, y: 0
//     },
//     controlledPosition: {
//       x: -400, y: 200
//     }
//   };

//   handleDrag = (e, ui) => {
//     const {x, y} = this.state.deltaPosition;
//     this.setState({
//       deltaPosition: {
//         x: x + ui.deltaX,
//         y: y + ui.deltaY,
//       }
//     });
//   };

//   onStart = () => {
//     this.setState({activeDrags: ++this.state.activeDrags});
//   };

//   onStop = () => {
//     this.setState({activeDrags: --this.state.activeDrags});
//   };
//   onDrop = (e) => {
//     this.setState({activeDrags: --this.state.activeDrags});
//     if (e.target.classList.contains("drop-target")) {
//       alert("Dropped!");
//       e.target.classList.remove('hovered');
//     }
//   };
//   onDropAreaMouseEnter = (e) => {
//     if (this.state.activeDrags) {
//       e.target.classList.add('hovered');
//     }
//   }
//   onDropAreaMouseLeave = (e) => {
//     e.target.classList.remove('hovered');
//   }

//   // For controlled component
//   adjustXPos = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     const {x, y} = this.state.controlledPosition;
//     this.setState({controlledPosition: {x: x - 10, y}});
//   };

//   adjustYPos = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     const {controlledPosition} = this.state;
//     const {x, y} = controlledPosition;
//     this.setState({controlledPosition: {x, y: y - 10}});
//   };

//   onControlledDrag = (e, position) => {
//     const {x, y} = position;
//     this.setState({controlledPosition: {x, y}});
//   };

//   onControlledDragStop = (e, position) => {
//     this.onControlledDrag(e, position);
//     this.onStop();
//   };

//   render() {
//     const dragHandlers = {onStart: this.onStart, onStop: this.onStop};
//     return (
//       <div>
//         <Draggable handle="strong" {...dragHandlers}>
//           <div className="box no-cursor">
//             <strong className="cursor"><div>Drag here</div></strong>
//             <div>You must click my handle to drag me</div>
//           </div>
//         </Draggable>
        

//       </div>
//     );
//   }
// }

// export default DraggableDiv;