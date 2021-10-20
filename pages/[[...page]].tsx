import type {
    GetStaticPaths,
    GetStaticPathsContext,
    GetStaticProps,
    GetStaticPropsContext,
} from 'next';

import type { BookPageConfig, AppConfig } from '../types';

import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { SERVER_ORIGIN } from '../config/Config';
import DataContext from '../context/DataContext';
import Layout from '../layout/Layout';
import { ImageContextProvider } from '../context/ImageContext';

interface Props {
    page: String;
    data: AppConfig;
}

export default function Page({ page, data }: Props) {
    const dataContext = useContext(DataContext);
    const router = useRouter();
    
    useEffect(() => {
        if (!page) {
            router.replace('/');
        }
        const storedData = dataContext.getData();
        if (storedData.pages.length === 0) {
            dataContext.setData(data);
        }

    }, []);
    
    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    return (
        <ImageContextProvider>
            <Layout />
        </ImageContextProvider>
    );
}


export const getStaticPaths: GetStaticPaths = async (context: GetStaticPathsContext) => {
    const data = await fetch(`${SERVER_ORIGIN}/api/pages`);
    const pages = await data.json();

    const paths = pages.map((page: BookPageConfig) => {
        return {
            params: { page: [page.url] },
        };
    });

    return {
        paths,
        fallback: true,
    };
};

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
    const page = context.params?.page || '/';
    const data = await fetch(`${SERVER_ORIGIN}/api/config`);
    const config = await data.json();

    return {
        props: {
            page: page,
            data: config
        },
    };
};
