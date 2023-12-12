import React, { useState, createContext, useContext } from 'react';

const PagesContext = createContext();

export const PagesProvider = ({ children }) => {
    const [showMap, setShowMap] = useState(true);
    const [showRouteMap, setShowRouteMap] = useState(false);
    const [showAboutUs, setShowAboutUs] = useState(false);
    const [showHelp, setShowHelp] = useState(false);
    const [showReport, setShowReport] = useState(false);

    const toggleShowMap = () => {
        setShowMap(true);
        setShowAboutUs(false);
        setShowHelp(false);
        setShowRouteMap(false);
        setShowReport(false);
    }

    const toggleShowRouteMap = () => {
        setShowRouteMap(true);
        setShowMap(false);
        setShowAboutUs(false);
        setShowHelp(false);
        setShowReport(false);
    }

    const toggleShowAboutUs = () => {
        setShowAboutUs(true);
        setShowMap(false);
        setShowRouteMap(false);
        setShowHelp(false);
        setShowReport(false);
    }

    const toggleShowHelp = () => {
        setShowHelp(true);
        setShowMap(false);
        setShowRouteMap(false);
        setShowAboutUs(false);
        setShowReport(false);
    }

    const toggleShowReport = () => {
        setShowReport(true);
        setShowMap(false);
        setShowRouteMap(false);
        setShowAboutUs(false);
        setShowHelp(false);
    }

    return (
        <PagesContext.Provider value={{ showMap, setShowMap, showRouteMap, setShowRouteMap, showAboutUs, setShowAboutUs, showHelp, setShowHelp, showReport, setShowReport, toggleShowMap, toggleShowRouteMap, toggleShowAboutUs, toggleShowHelp, toggleShowReport }}>
            {children}
        </PagesContext.Provider>
    )
}

export const usePages = () => {
    return useContext(PagesContext);
}