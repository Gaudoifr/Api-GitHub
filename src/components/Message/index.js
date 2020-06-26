import React, { useEffect } from 'react';
import { Message as MessageSemanticUI } from 'semantic-ui-react';
import PropTypes from 'prop-types';


const Message = ({ message, hideMessage }) => {
  useEffect(() => {
    // disparition au bout de 10sc :
    const timeoutId = setTimeout(() => {
      // console.log('Destruction');
      // je demande à App de détruire le message
      hideMessage();
    },
    5000);

    // au moment où on crée l'effet, on veut planifier son nettoyage
    // si on retourne une fonction dans useEffect, c'est une fonction de nettoyage
    // - si aucune dépendance => fonction appelée à la disparition du composant
    // (componentWillUnmount)
    // - si tableau de dépendance => fonction appelée juste avant le prochain
    // useEffect, donc quand la dépendance change de valeur

    return () => {
      // console.log(`nettoyage de l'effet ${message}`);
      clearTimeout(timeoutId);
    };
  }, [message]);

  return (
    <MessageSemanticUI>
      {message}
    </MessageSemanticUI>
  );
};

Message.propTypes = {
  message: PropTypes.string.isRequired,
  hideMessage: PropTypes.func.isRequired,
};

export default Message;
