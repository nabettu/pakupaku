declare var window: Window;
import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "./components/App";
import "./index.css";

interface Window {
  AudioContext(): void;
  webkitAudioContext(): any;
  navigator: {
    getUserMedia(): any;
    webkitGetUserMedia(): any;
    mozGetUserMedia(): any;
  };
}
window.AudioContext = window.AudioContext || window.webkitAudioContext;
window.navigator.getUserMedia =
  window.navigator.getUserMedia ||
  window.navigator.webkitGetUserMedia ||
  window.navigator.mozGetUserMedia;

ReactDOM.render(<App />, document.getElementById("root") as HTMLElement);
