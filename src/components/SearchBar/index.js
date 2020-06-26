import React, { useEffect, useRef } from 'react';
import { Input, Form, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const SearchBar = ({ searchValue, setSearchValue, handleSubmit }) => {

  const manageSubmit = (event) => {
    event.preventDefault();
    handleSubmit();
    // on veut envoyer une requête vers https://api.github.com/search/repositories?q=TEXTE
  };

  // https://reactjs.org/docs/hooks-reference.html#useref
  const refInput = useRef(null);

  useEffect(() => {
    // console.log('on va placer le focus sur l\'input');
    // une_reference.current permet d'accéder à l'élément référencé
    refInput.current.focus();
  }, []);
  // la dépendance est un tableau vide : ne marchera qu'au premier chargement

  return (
    <Segment>
      <Form onSubmit={manageSubmit}>
        <Form.Field>
          <Input
            ref={refInput}
            icon="search"
            iconPosition="left"
            placeholder="Rechercher..."
            value={searchValue}
            onChange={(event) => {
              setSearchValue(event.target.value);
            }}
          />
        </Form.Field>
      </Form>
    </Segment>
  );
};

SearchBar.propTypes = {
  searchValue: PropTypes.string.isRequired,
  // paramètre : nouvelle valeur de l'input (rappel qu'ell attend un argument)
  setSearchValue: PropTypes.func.isRequired,
  // pas de paramètre
  handleSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
