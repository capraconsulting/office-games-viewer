import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './Dashboard';

type Props = { match: Object };

export default class Index extends React.Component {
  render() {
    const { match, rebase, players } = this.props;
    return (
      <div>
        <Switch>
          <Route
            path={`${match.url}/`}
            render={(props) => (
              <Dashboard {...props} rebase={rebase} players={players} />
            )}
          />
        </Switch>
      </div>
    );
  }
}

