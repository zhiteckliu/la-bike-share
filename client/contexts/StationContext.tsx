import React, { useState, createContext } from 'react';
import { FilterAvailableStationQuery, FindEmptyDocksQuery } from '../query/GetBikeShareStationsQuery';

export const StationContext = createContext(null);

const StationContextProvider = ({ children, client }) => {
    const [stations, setStations] = useState([]);

    const fetchStations = (region, classic, electric, smart) => {
        return new Promise(resolve => {
            client.query({
                query: FilterAvailableStationQuery,
                variables: { region, classic, electric, smart }
            }).then(
                ({ loading, data }) => {
                    if (!loading) {
                        setStations(data.filterAvailableStations)
                        resolve(data.filterAvailableStations);
                    }
                }
            )
        })
    }

    const fetchDocks = (region, total) => {
        return new Promise(resolve => {
            client.query({
                query: FindEmptyDocksQuery,
                variables: { region, total }
            }).then(
                ({ loading, data }) => {
                    if (!loading) {
                        setStations(data.findEmptyDocks)
                        resolve(data.findEmptyDocks);
                    }
                }
            )
        })
    }

    return (
        <StationContext.Provider value={{ stations, fetchStations, fetchDocks }}>
            {children}
        </StationContext.Provider>
    )
}

export default StationContextProvider;