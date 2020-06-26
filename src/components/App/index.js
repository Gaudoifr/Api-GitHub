// == Import npm
import React, { useState } from 'react';
import 'semantic-ui-css/semantic.min.css';
import axios from 'axios';

// == Import
import Header from 'src/components/Header';
import SearchBar from 'src/components/SearchBar';
import Message from 'src/components/Message';
import ReposResults from 'src/components/ReposResults';
import './styles.scss';
import { Loader, Dimmer } from 'semantic-ui-react';

// == Composant
const App = () => {
  // contenu du champ de recherche
  const [search, setSearch] = useState('');

  // repositories à afficher, on map dessus, il faut obligatoirement un tableau :
  const [repos, setRepos] = useState([]);

  // nombre de résultats (cela est variable dans le temps) :
  // const [nbResults, setNbResults] = useState(0);

  // le message à afficher évolue avec le temps :
  const [message, setMessage] = useState('');

  // le loading :
  const [loading, setLoading] = useState(false);

  // indique si le message est affiché
  const [displayMessage, setDisplayMessage] = useState(false);

  const loadRepos = () => {
    // console.log(`on va charger les repos pour : ${search}`);
    setLoading(true);

    axios.get(`https://api.github.com/search/repositories?q=${search}`)
      .then((response) => {
        setRepos(response.data.items);
        // programme le changement de valeur de nbResults :
        // setNbResults(response.data.total_count);
        // attention, le résultat est asynchrone : NbResults est
        // calculé au prochain rendu du composant, il faut donc utiliser les données de la réponse
        setMessage(`La recherche a retourné ${response.data.total_count} résultat(s)`);
      })
      .catch(() => {
        setMessage('Une erreur s\'est produite');
        // on vide les résultats précédents
        setRepos([]);
      })
      .finally(() => {
        setLoading(false);
        setDisplayMessage(true);
      });
  };

  /* avant simplification :
  setSearchValue={handleChange} dans le return au niveau de SearchBar

  const handleChange = (newValue) => {
    console.log(`Nouvelle valeur reçue par App : ${newValue}`);
    setSearch(newValue);
  };

  Attention : en mettant directement setSearch dans le return, on ne peut pas faire de console.log !
  */

  const hideMessage = () => {
    setDisplayMessage(false);
  };

  return (
    <div className="app">
      <Header />
      {loading
        && (
        <Dimmer active>
          <Loader size="large" />
        </Dimmer>
        )}
      <SearchBar
        handleSubmit={loadRepos}
        searchValue={search}
        setSearchValue={setSearch}
      />

      {displayMessage
      && (
        <Message message={message} hideMessage={hideMessage} />
      )}

      <ReposResults repos={repos} />
    </div>
  );
};

// == Export
export default App;
