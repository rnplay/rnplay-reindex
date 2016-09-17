import React, { Component } from 'react';
import Qs from 'qs';
import {DEVICES, DEVICE_MEASUREMENTS} from '../devices';
import styles from '../styles/main.css';
import Select from 'react-select';
import Config from '../config';

export default class Appetize extends Component {

  state = {
    device: 'iphone6',
    scale: 75
  };

  switchToDevice = (option) => {
    this.setState({device: option.value});
  }

  action(action) {
    document.querySelector('iframe').contentWindow.postMessage(action, '*');
  }

  url() {
    let platform =  this.state.device.includes("ip") ? 'ios' : 'android';
    let appetizeKey = platform == 'ios' ? 'mzv0wej631g9mxc881x2wmnpvc' : 'rkwyy8kaabjhz3zq2160n9gprw';
    let manifestUrl = `${Config.RNPLAY_MANIFEST_BASE_URL}/expManifest-development?urlToken=${this.props.application.urlToken}`;

    console.log(manifestUrl)

    let appetizeOptions = {
      embed: true,
      screenOnly: true,
      xdocMsg: true,
      debug: true,
      scale: this.state.scale,
      orientation: 'portrait',
      device: this.state.device,
      launchUrl: platform === 'android' ? manifestUrl : undefined
    };

    let appParams = {
      'EXKernelLaunchUrlDefaultsKey': manifestUrl
    };

    return `https://appetize.io/embed/${appetizeKey}?
      ${Qs.stringify(appetizeOptions)}&
      params=${encodeURIComponent(JSON.stringify(appParams))}`;
  }


  messageEventHandler(message) {
    console.log(message.data ? message.data : message);
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
              options={DEVICES.ios.concat(DEVICES.android)}
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
