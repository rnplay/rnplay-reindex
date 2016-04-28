import React, {Component} from 'react';
import webtask from './webtask';

export default class NewApp extends Component {

  static contextTypes = {
    router: React.PropTypes.object,
  };

  async componentDidMount() {
    let result = await webtask("getNewApplicationToken");
    console.log(result)
    this.context.router.replace(`/apps/${result.body.urlToken}`);
  }

  render() {
    return <h1>New App</h1>;
  }
}
