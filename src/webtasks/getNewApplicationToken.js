import {generateRandomHash, initContext, mutation} from './utils';

const SAMPLE = `
import React, {
  Component,
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class SampleApp extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to the React Native Playground!
        </Text>
        <Text style={styles.instructions}>
          This is a sample app - just edit and save, and you will see the
          changes reflect immediately in the simulator.
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('SampleApp', () => SampleApp);
`;

async function run(context, cb) {
  initContext(context);
  let hash = generateRandomHash(8);

  try {
    await mutation('createApplication', {
      createdAt: '@TIMESTAMP',
      updatedAt: '@TIMESTAMP',
      urlToken: hash,
      name: 'React Native Starter',
      body: SAMPLE
    });

    cb(null, {urlToken: hash});
  } catch(error) {
    cb(error);
  }

};


module.exports = run;
