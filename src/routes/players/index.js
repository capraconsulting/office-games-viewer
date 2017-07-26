import React from 'react';
import { Switch, Route } from 'react-router-dom';

import PlayerList from './PlayerList';
import PlayerProfile from './PlayerProfile';

type Props = { match: Object };

export default class Players extends React.Component {
  render() {
    const { match, rebase } = this.props;
    return (
      <div>
        <Switch>
          <Route
            exact
            path={`${match.url}/`}
            render={(props) => (
              <PlayerList {...props} rebase={rebase} />
            )}
          />
          <Route
            path={`${match.url}/:slackUserId`}
            render={(props) => (
              <PlayerProfile {...props} rebase={rebase} />
            )}
          />
        </Switch>
      </div>
    );
  }
}
