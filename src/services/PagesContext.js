import React, { useState, createContext, useContext } from 'react';

const PagesContext = createContext();

export const PagesProvider = ({ children }) => {
    const [showMap, setShowMap] = useState(true);
    const [showRouteMap, setShowRouteMap] = useState(false);
    const [showAboutUs, setShowAboutUs] = useState(false);
    const [showHelp, setShowHelp] = useState(false);

    const toggleShowMap = () => {
        setShowMap(true);
        setShowAboutUs(false);
        setShowHelp(false);
        setShowRouteMap(false);
    }

    const toggleShowRouteMap = () => {
        setShowRouteMap(true);
        setShowMap(false);
        setShowAboutUs(false);
        setShowHelp(false);
    }

    const toggleShowAboutUs = () => {
        setShowAboutUs(true);
        setShowMap(false);
        setShowRouteMap(false);
        setShowHelp(false);
    }

    const toggleShowHelp = () => {
        setShowHelp(true);
        setShowMap(false);
        setShowRouteMap(false);
        setShowAboutUs(false);
    }

    return (
        <PagesContext.Provider value={{ showMap, setShowMap, showRouteMap, setShowRouteMap, showAboutUs, setShowAboutUs, showHelp, setShowHelp, toggleShowMap, toggleShowRouteMap, toggleShowAboutUs, toggleShowHelp }}>
            {children}
        </PagesContext.Provider>
    )
}

export const usePages = () => {
    return useContext(PagesContext);
}