import Relay from 'react-relay';

export default class ChangeApplicationMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation { updateApplication }`;
  }

  getVariables() {
    return {
      id: this.props.id,
      name: this.props.name,
      indexIos: this.props.indexIos,
      updatedAt: '@TIMESTAMP',
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on _ApplicationPayload {
        changedApplication {
          name,
          updatedAt,
        },
      }
    `;
  }

  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        changedApplication: this.props.id,
      },
    }];
  }

  getOptimisticResponse() {
    return {
      changedApplication: {
        id: this.props.id,
        name: this.props.name
      },
    };
  }
}
