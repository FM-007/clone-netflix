import React, { useEffect, useState } from 'react';
import {Tmdb} from './Tmdb';

import { MovieRow } from './components/MovieRow';
import { FeatureMovie } from './components/FeatureMovie';
import { Header } from './components/Header';

import './styles/globals.scss';

 const App = () => {

  const [movieList, setMovieList] = useState([]);
  const [featureData, setFeatureData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(() => {
    const loadAll = async () => {
      // Recuperando Lista Total
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      // Recuperando Featured
      let originals = list.filter(i => i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].itens.results.length - 1));
      let chosen = originals[0].itens.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      setFeatureData(chosenInfo);
    }
    
    loadAll();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true)
      } else {
        setBlackHeader(false)
      }
    }

    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  }, []);

  return (
    <div className='page'>
      <Header black={blackHeader} />
      {
        featureData && 
          <FeatureMovie item={featureData} />
      }
      <section className='lists'>
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} itens={item.itens} />
        ))}
      </section>
      <footer>
        Feito com <span role='img' aria-label='coração'>💖</span> pela DevWeb <br />
        Direitos de imagens para Netflix <br />
        Dados pegos do site TMDB
      </footer>
      {movieList.length <= 0 &&
        <div className="loading">
          <img src="https://www.rchandru.com/images/portfolio/modals/m-loading.gif" alt="carregando" />
        </div>
      }
    </div>
  );
}

export default App;
