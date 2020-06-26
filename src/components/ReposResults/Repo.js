import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image } from 'semantic-ui-react';

const Repo = ({ name, owner, description }) => (
  <Card>
    <Image src={owner.avatar_url} wrapped ui={false} />
    <Card.Content>
      <Card.Header>{name}</Card.Header>
      <Card.Meta>{owner.login}</Card.Meta>
      <Card.Description>{description}</Card.Description>
    </Card.Content>
  </Card>
);

Repo.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  owner: PropTypes.shape({
    login: PropTypes.string.isRequired,
    avatar_url: PropTypes.string.isRequired,
  }).isRequired,
};

// valeurs par défaut à utiliser si une prop n'est pas définie
Repo.defaultProps = {
  description: '',
};

export default Repo;
