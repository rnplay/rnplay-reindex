let measurements = {
  nexus5: {
    width: 360,
    height: 640,
    phoneWidth: 400,
    phoneHeight: 795,
    screenOffsetTop: 67,
    screenOffsetLeft: 20,
    pixelRatio: 3
  },
  nexus7: {
    width: 600,
    height: 960,
    phoneWidth: 728,
    phoneHeight: 1268,
    screenOffsetTop: 155,
    screenOffsetLeft: 64,
    pixelRatio: 2
  },
  nexus9: {
    width: 768,
    height: 1024,
    phoneWidth: 866,
    phoneHeight: 1288,
    screenOffsetTop: 133,
    screenOffsetLeft: 49,
    pixelRatio: 2
  },
  iphone6: {
    width: 375,
    height: 668,
    phoneWidth: 416,
    phoneHeight: 870,
    screenOffsetTop: 100,
    screenOffsetLeft: 21,
    pixelRatio: 2
  },
  iphone4s: {
    width: 320,
    height: 480,
    phoneWidth: 370,
    phoneHeight: 733,
    screenOffsetTop: 125,
    screenOffsetLeft: 25,
    pixelRatio: 2
  },
  iphone5s: {
    width: 320,
    height: 568,
    phoneWidth: 365,
    phoneHeight: 782,
    screenOffsetTop: 105,
    screenOffsetLeft: 22,
    pixelRatio: 2
  },
  iphone6plus: {
    width: 621,
    height: 1104,
    phoneWidth: 690,
    phoneHeight: 1420,
    screenOffsetTop: 160,
    screenOffsetLeft: 35,
    pixelRatio: 3
  },
  ipadair: {
    width: 768,
    height: 1024,
    phoneWidth: 864,
    phoneHeight: 1287,
    screenOffsetTop: 130,
    screenOffsetLeft: 48,
    pixelRatio: 2
  },
};

measurements.iphone6s = measurements.iphone6;
measurements.iphone6splus = measurements.iphone6plus;
measurements.ipadair2 = measurements.ipadair;

export const DEVICE_MEASUREMENTS = measurements;

export const DEVICES = {
  ios: [
    { value: 'iphone4s', label: 'iPhone 4s'},
    { value: 'iphone5s', label: 'iPhone 5s'},
    { value: 'iphone6', label: 'iPhone 6'},
    { value: 'iphone6plus', label: 'iPhone 6+'},
    { value: 'ipadair', label: 'iPad Air'},
    { value: 'ipadair2', label: 'iPad Air 2'}
  ],
  android: [
    { value: 'nexus5', label: 'Nexus 5'},
    { make: 'nexus7', label: 'Nexus 7'},
    { make: 'nexus9', label: 'Nexus 9'}
  ]
};
