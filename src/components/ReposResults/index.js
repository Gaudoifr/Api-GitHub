import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'semantic-ui-react';

import Repo from './Repo';

//! je déverse les informations que j'ai dans l'objet repos pour les fournir
//! au sous composant Repo avec le spread operator

const ReposResults = ({ repos }) => (
  <Card.Group itemsPerRow={3}>
    {repos.map((repo) => (
      <Repo
        key={repo.id}
        {...repo}
      />
    ))}
  </Card.Group>
);

ReposResults.propTypes = {
  repos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
};

export default ReposResults;
