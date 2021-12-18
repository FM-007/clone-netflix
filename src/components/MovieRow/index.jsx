import React, { useState } from 'react';
import {BsChevronCompactRight, BsChevronCompactLeft} from 'react-icons/bs';
import './style.scss';

export const MovieRow = ({title, itens}) => {
    const [scrollX, setScrollX] = useState(-400);
    const handleLeftArrow = () => {
        let x = scrollX + Math.round(window.innerWidth / 2);

        if(x > 0) {
            x = 0;
        }

        setScrollX(x);
    };

    const handleRightArrow = () => {
        let x = scrollX - Math.round(window.innerWidth / 2);
        let listW = itens.results.length * 150;

        if((window.innerWidth - listW) > x) {
            x = (window.innerWidth - listW) - 60;
        }

        setScrollX(x);
    };

    return (
        <div className='movierow'>
            <h2>{title}</h2>
            <div className="movierow--left" onClick={handleLeftArrow}>
                <BsChevronCompactLeft style={{fontSize: 45}} />
            </div>
            <div className="movierow--right" onClick={handleRightArrow}>
                <BsChevronCompactRight style={{fontSize: 45}} />
            </div>
            <div className="movierow--listarea">
                <div className="movierow--list" style={{
                    marginLeft: scrollX,
                    width: itens.results.length * 150
                }}>
                    {itens.results.length > 0 && itens.results.map((item, key) => (
                        <div key={key} className="movie--item">
                            <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.original_title} />
                        </div>
                    ))}
                </div>                
            </div>
        </div>
    )
}