const React = require("react");
const sendEvent = require("./browser-send-event.js");

let pos, context, editor;

exports.Editor = class Editor extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
  	return <div className="canvas-container" id="canvas-container">
      <canvas className="editor" id="editor" ref="editor" height={document.body.scrollHeight} width={document.body.scrollWidth}></canvas>
    </div>
  }

  componentDidMount() {
  	this.edit();
  }

  edit() {
    pos = { x: 0, y: 0 };
    editor = document.getElementById("editor");
    context = this.refs.editor.getContext('2d');
    document.body.style.margin = 0;
    document.querySelector("#canvas-container").addEventListener("mousemove", this.draw)
    document.querySelector("#canvas-container").addEventListener("mousedown", this.setPosition);
    document.querySelector("#canvas-container").addEventListener("mouseenter", this.setPosition);
  }

  setPosition(e) {
    var rect = editor.getBoundingClientRect();
    pos.x = e.clientX - rect.left,
    pos.y = e.clientY - rect.top
  }

  resize() {
    context.canvas.width = window.innerWidth;
    context.canvas.height = window.innerHeight;
  }

  draw(e) {
    if (e.buttons !== 1) return;
    context.beginPath(); // begin

    context.lineWidth = 25;
    context.lineCap = 'round';
    context.strokeStyle = 'rgb(255,255,0)';

    context.moveTo(pos.x, pos.y); // from
    var rect = editor.getBoundingClientRect();
    pos.x = e.clientX - rect.left,
    pos.y = e.clientY - rect.top
    context.lineTo(pos.x, pos.y); // to

    context.stroke(); // draw it!
  }
}
