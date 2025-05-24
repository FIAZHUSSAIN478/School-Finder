import { createContext, useState } from "react";

export const Context = createContext();

export default function ContextProvider({ children }) {

    const [favorites, setFavorites] = useState([]);
    const [recentlyViewed, setRecentlyViewed] = useState([]);


    const addFavorite = (school) => {
        if (!favorites.find((item) => item.id === school.id)) {
            setFavorites([...favorites, school]);
        }
    };

    const removeFavorite = (id) => {
        setFavorites(favorites.filter((item) => item.id !== id));
    };


    // add recently view

    const addRecentlyViewed = (school) => {
        setRecentlyViewed(prev => {
            const filtered = prev.filter(s => s.id !== school.id);
            return [school, ...filtered].slice(0, 5);
        });
    };
    return (
        <>
            <Context.Provider value={{
                favorites, addFavorite, removeFavorite, recentlyViewed,
                addRecentlyViewed
            }} >
                {children}
            </Context.Provider>
        </>
    )
}