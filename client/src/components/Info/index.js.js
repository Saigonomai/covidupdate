import React, {PureComponent} from 'react';

export default class Info extends PureComponent {
  render() {
    const {info} = this.props;
    const displayName = `${info.city}, ${info.province}`;

    return (
      <div>
        <div>
          {displayName} |{' '}
        </div>
        <p>{info.description}</p>
      </div>
    );
  }
}