import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './Dashboard';

type Props = { match: Object };

export default class Index extends React.Component {
  render() {
    const { match } = this.props;
    return (
      <div>
        <Switch>
          <Route
            path={`${match.url}/`}
            render={(props) => (
              <Dashboard {...props} rebase={this.props.rebase} />
            )}
          />
        </Switch>
      </div>
    );
  }
}

