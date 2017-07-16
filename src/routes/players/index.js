import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PlayerProfile from './PlayerProfile';

type Props = { match: Object };

const Players = ({ match }: Props) => (
  <div>
    <Switch>
      <Route path={`${match.url}/`} component={PlayerProfile} />
    </Switch>
  </div>
);

export default Players;
