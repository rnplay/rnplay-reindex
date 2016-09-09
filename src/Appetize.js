import React, { Component } from 'react';
import Qs from 'qs';
import {DEVICE_MEASUREMENTS} from './devices';
import {DEVICES} from './devices';
import Draggable from 'react-draggable';
import classNames from 'classnames';
import styles from './styles/main.css';
import Select from 'react-select';

export default class Appetize extends Component {

  state = {
    embed: true,
    screenOnly: true,
    xdocMsg: true,
    debug: true,
    scale: 75,
    orientation: 'portrait',
    device: 'iphone6'
  };

  switchToDevice = (option) => {
    this.setState({device: option.value});
  }

  action(action) {
    document.querySelector('iframe').contentWindow.postMessage(action, '*');
  }

  url() {
    return `https://appetize.io/embed/${this.props.id}?
      ${Qs.stringify(this.state)}&
      params=${encodeURIComponent(JSON.stringify(this.props.appParams))}`;
  }


  messageEventHandler(message) {
    console.log(message);
  }

  componentDidMount() {
    this.eventHandler = ::this.messageEventHandler;
    this.eventListener = window.addEventListener('message', this.eventHandler, false);
  }

  render() {
    let measurements = DEVICE_MEASUREMENTS[this.state.device];
    let width = measurements.width * (this.state.scale / 100);
    let height = measurements.height * (this.state.scale / 100);

      return (
        <div className={styles.appetize}>
          <div className={styles.appetizeHeader}>
            <Select
              className={styles.device}
              name="device"
              clearable={false}
              value={this.state.device}
              options={DEVICES.ios}
              onChange={this.switchToDevice}
            />
          </div>
          <iframe
            className={this.props.className || 'appetizeIframe'}
            onLoad={this.props.onLoad}
            ref="appetizeIframe"
            src={this.url()}
            height={height}
            width={width}
            frameBorder="0"
            scrolling="no"
          />
        </div>
      );
  }
}
