import { useState, createContext, ReactNode } from 'react';
import type { AppConfig } from '../types';

interface Props {
    children: ReactNode
}

const defaultValue:AppConfig = {
    pages: [],
    career: []
};

const DataContext = createContext({
    setData:(data: AppConfig) => {},
    getData:(): AppConfig => {
        return defaultValue;
    }
});

export function DataContextProvider(props: Props) {

    const [data, setData] = useState<AppConfig>({
        pages: [],
        career: []
    });

    const [isLoaded, setLoaded] = useState(false);

    function set(data: AppConfig) {
        console.log('SET DATA!!!!!!!!!!!!!', data);
        setData(data);
    }


    function get(): AppConfig {
        return data;
    } 

    const context = {
        setData: set,
        getData: get
    };

    return (
        <DataContext.Provider value={context}>
            {props.children}
        </DataContext.Provider>
    );
}

export default DataContext;