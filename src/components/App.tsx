import * as React from "react";
declare var window: Window;
declare const require: Function;
const img1 = require("../img/1.png");

interface Window {
  hackForMozzila: any;
}

interface AppState {
  img: string;
  vol: number;
  ctx: any;
  analyser: any;
  frequencies: any;
}

export class App extends React.Component<{}, AppState> {
  constructor(props: any) {
    super(props);

    const ctx = new AudioContext();
    const analyser = ctx.createAnalyser();
    const frequencies = new Uint8Array(analyser.frequencyBinCount);

    this.state = {
      img: img1,
      vol: 0,
      ctx,
      analyser,
      frequencies
    };
  }
  public refs: { logo: HTMLImageElement };

  public componentDidMount() {
    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
      window.hackForMozzila = stream;
      this.state.ctx
        .createMediaStreamSource(stream)
        .connect(this.state.ctx.destination);
    });

    // 可能な限り高いフレームレートで音量を取得し、表示を更新する
    const draw = () => {
      const vol = Math.floor(this.getByteFrequencyDataAverage());
      console.log(vol);
      this.setState({
        vol
      });
      requestAnimationFrame(draw);
    };
    draw();
  }

  private getByteFrequencyDataAverage = () => {
    const { analyser, frequencies } = this.state;
    analyser.getByteFrequencyData(frequencies);
    // 解析結果の全周波数の振幅を、合計し、要素数で割ることで、平均を求める
    return (
      frequencies.reduce(function(previous: any, current: any) {
        return previous + current;
      }) / analyser.frequencyBinCount
    );
  };

  public render(): JSX.Element {
    return (
      <div className="container bordered">
        <h1 className="title">{this.state.vol}</h1>
        <img ref="logo" src={this.state.img} className="logo" />
      </div>
    );
  }
}
