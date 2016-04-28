import React, { Component } from 'react';
import Qs from 'qs';
import {DEVICE_MEASUREMENTS} from './devices';
import Resizable from 'react-component-resizable';

const DEFAULT_OPTIONS = {
  embed: true,
  screenOnly: true,
  xdocMsg: true,
  debug: true,
  device: 'ipadair',
  orientation: 'portrait'
};

export default class Appetize extends Component {

  constructor(props) {
     super(props);
     this.state = {
       calculatedWidth: null
     };
   }

  action(action) {
    document.querySelector('iframe').contentWindow.postMessage(action, '*');
  }

  getOptions() {
    let options = {...DEFAULT_OPTIONS, ...this.props.options};
    let calculatedScale = (this.state.calculatedWidth / DEVICE_MEASUREMENTS[options.device].width) * 100;
    if (calculatedScale > 100) {
      calculatedScale = 100;
    }
    return {...options, scale: calculatedScale};
  }

  url() {
    return `https://appetize.io/embed/${this.props.id}?
      ${Qs.stringify(this.getOptions())}&
      params=${encodeURIComponent(JSON.stringify(this.props.appParams))}`;
  }


  messageEventHandler(message) {
    console.log(message);
  }

  componentDidMount() {
    this.eventHandler = ::this.messageEventHandler;
    this.eventListener = window.addEventListener('message', this.eventHandler, false);
    this.calculateWidth();
  }

  calculateWidth = (values) => {
    let width = values ? values.width : (this.refs.container.offsetWidth / window.devicePixelRatio) - 16;
    this.setState({calculatedWidth: width});
  }

  render() {
    let measurements = DEVICE_MEASUREMENTS[this.getOptions().device];
    let width = measurements.width * (this.getOptions().scale / 100);
    let height = measurements.height * (this.getOptions().scale / 100);

    let styles = {
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: "center"
    };

      return (
        <Resizable ref="container" onResize={this.calculateWidth} style={styles}>
          {this.state.calculatedWidth && <iframe
            className={this.props.className || 'appetizeIframe'}
            onLoad={this.props.onLoad}
            ref="appetizeIframe"
            src={this.url()}
            width={width}
            style={{margin: '0 auto'}}
            height={height}
            frameBorder="0"
            scrolling="no"
          />}
        </Resizable>
      );
  }
}
