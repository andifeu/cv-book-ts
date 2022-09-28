import Head from 'next/head';
// import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { SyntheticEvent, useContext, useEffect, useRef } from 'react';
import Book from '../components/Book';
import Layer from '../components/Layer';
import ImageContext from '../context/ImageContext';

import css from '/styles/Layout.module.css';

export default function Layout() {
    const menuRef = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<HTMLDivElement>(null);
    const imageContext = useContext(ImageContext);
    const router = useRouter();
    const imageUrl = imageContext.getName();
    let sceneDom: HTMLDivElement;

    let perspectiveClass = 'book';
    let visibility = 'hide';

    function menuClickHandler() {
        router.push('/');
    }

    function tableClickHandler() {
        if (!sceneRef.current) {
            return;
        }
        if (sceneRef.current.classList.contains('preload')) {
            sceneRef.current.classList.remove('preload');
        }
        sceneRef.current.classList.toggle('shown');
    }

    useEffect(() => {
        sceneRef.current?.addEventListener('animationend', event => {
            console.log('animation ended');
        });
    }, []);

    if (imageContext.isVisible()) {
        perspectiveClass = 'book image-shown';
        visibility = 'show';
    }

    function setSize(loadEvent: SyntheticEvent<HTMLImageElement>) {
        // const image = loadEvent.target;
        // image.style.maxHeight = image.naturalHeight + "px";
        // image.style.maxWidth = image.naturalWidth + "px";
    }

    return (
        <div ref={sceneRef} className="scene preload shown">
            <div className="room"></div>
            <div className="table" onClick={tableClickHandler}>
                <div className={css['book-container']}>
                    <Head>
                        <title>Curriculum Vitae</title>
                        <meta name="description" content="Andreas Feuerstein - Webentwicklung - Curriculum Vitae" />
                        {/* <link rel="icon" href="/favicon.ico" /> */}
                    </Head>
                    <div ref={menuRef} onClick={menuClickHandler} className={css['btn-menu']}>
                        <span>Menu</span>
                        <div className={css.line}></div>
                        <div className={css.line}></div>
                        <div className={css.line}></div>
                    </div>
                    <div className={`${css.book} ${perspectiveClass}`}>
                        {imageContext.isVisible() && <Layer />}
                        <div className={css.cover}>
                            <div className={css['page-container']}>
                                <Book menuRef={menuRef} />
                            </div>
                        </div>
                    </div>
                    {imageUrl && (
                        <div className={`detail-image ${visibility}`}>
                            {/**
                             * @todo: Alt Tag mit Bildbeschreibung anpassen
                             */}
                            <div className="image-container">
                                {/* <Image onLoad={setSize} src={imageUrl} alt="Details" /> */}
                                <img onLoad={setSize} src={imageContext.getName()} alt="Details" />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
