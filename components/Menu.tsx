import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import DataContext from '../context/DataContext';

import styles from '../styles/Menu.module.css';
import { BookPageConfig } from '../types';

export default function Menu() {
    const dataContext = useContext(DataContext);
    const data = dataContext.getData();
    const router = useRouter();

    if (data.pages.length === 0) {
        return <nav></nav>;
    }

    const listContent = data.pages.map(
        (page: BookPageConfig, index: number) => {
            if (page.part !== undefined && page.part > 1) {
                return false;
            }
            return (
                <li key={page.id}>
                    <Link href={`/${page.url}`} as={`${page.url}`} shallow>
                        <a>{page.headline}</a>
                    </Link>
                    <span>{index + 1}</span>
                </li>
            );
        }
    );

    return (
        <nav>
            <ul className={styles.leaders}>{listContent}</ul>
        </nav>
    );
}
