import React from 'react';
import {useAppSelector} from "../hooks/redux";
import {useActions} from "../hooks/actions";

const FavouritesPage = () => {
    const {favorites} = useAppSelector(state => state.github);
    const {removeFavorite} = useActions();

    if (favorites.length === 0) {
        return (
            <div className='flex justify-center pt-10 mx-auto h-screen w-screen'>
                <p className='text-center text-gray-600'>No favorites yet</p>
            </div>
        );
    }

    function removeFromFavorites(repo: string) {
        removeFavorite(repo);
    }

    return (
        <ul className='list-none'>
            { favorites.map((repo) => (
                <li key={repo} className='flex justify-between items-center px-2 py-4 hover:bg-gray-100 transition-colors cursor-pointer'>
                    <a href={repo} target='_blank' className='ml-2'>{repo}</a>
                    <button
                        className='px-4 py-2 rounded bg-blue-400 hover:bg-amber-200 transition-all'
                        onClick={() => {removeFromFavorites(repo)}}
                    >Remove from favourites</button>
                </li>
            )) }
        </ul>
    );
};

export default FavouritesPage;
