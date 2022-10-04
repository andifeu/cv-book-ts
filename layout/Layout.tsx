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
    const tableRef = useRef<HTMLDivElement>(null);
    const imageContext = useContext(ImageContext);
    const router = useRouter();
    const imageUrl = imageContext.getName();

    let perspectiveClass = 'book';
    let visibility = 'hide';

    function menuClickHandler() {
        router.push('/');
    }

    function zoomIn(scene: HTMLDivElement, animationFinished: () => void) {
        const table = scene.getElementsByClassName('table')[0] as HTMLDivElement;
        const room = scene.getElementsByClassName('room')[0] as HTMLDivElement;

        const animationOptions: KeyframeAnimationOptions = {
            duration: 500,
            fill: 'forwards'
        };

        room.animate([
            {
                transform: 'scale(1) rotateX(0)',
                top: 0
            },
            {
                transform: 'scale(1.9)',
                top: 0
            }
        ], animationOptions);

        table.animate([
            {
                top: '33vh',
                transform: 'scale(0.4) rotateX(45deg)'
            },
            {
                top: '33vh',
                transform: 'scale(1) rotateX(45deg)'
            }
        ], animationOptions).addEventListener('finish', () => {
            table.animate([
                {
                    top: '33vh',
                    transform: 'rotateX(45deg)'
                },{
                    top: 0,
                    transform: 'rotateX(0)'
                }
            ], animationOptions);

            room.animate([
                {
                    top: 0,
                    transform: 'scale(1.9) rotateX(0)'
                },{
                    top: '-33vh',
                    transform: 'scale(1.9) rotateX(-40deg)'
                }
            ], animationOptions).addEventListener('finish', () => {
                animationFinished();
            });
        });
    }

    function zoomOut(scene: HTMLDivElement, animationFinished: () => void) {
        const table = scene.getElementsByClassName('table')[0] as HTMLDivElement;
        const room = scene.getElementsByClassName('room')[0] as HTMLDivElement;
        
        const animationOptions: KeyframeAnimationOptions = {
            duration: 500,
            fill: 'forwards'
        };

        room.animate([
            {
                top: '-33vh',
                transform: 'scale(1.9) rotateX(-40deg)'
            },
            {
                top: 0,
                transform: 'scale(1.9) rotateX(0)'
            }
        ], animationOptions);

        table.animate([
            {
                top: 0,
                transform: 'rotateX(0)'
            },{
                top: '33vh',
                transform: 'rotateX(45deg)'
            }
        ], animationOptions).addEventListener('finish', () => {
            table.animate([
                {
                    top: '33vh',
                    transform: 'scale(1) rotateX(45deg)'
                },
                {
                    top: '33vh',
                    transform: 'scale(0.4) rotateX(45deg)'
                }
            ], animationOptions);

            room.animate([
                {
                    transform: 'scale(1.9)',
                    top: 0
                },
                {
                    transform: 'scale(1) rotateX(0)',
                    top: 0
                }
            ], animationOptions).addEventListener('finish', () => {
                animationFinished();
            });
        });
    }

    function tableClickHandler() {
        const scene = sceneRef.current!;
        

        if (!scene || scene.classList.contains('animation-running')) {
            return;
        }

        if (sceneRef.current.classList.contains('preload')) {
            sceneRef.current.classList.remove('preload');
        }

        scene.classList.add('animation-running');
        if (sceneRef.current.classList.contains('shown')) {
            zoomIn(scene, () => {
                scene.classList.remove('animation-running');
                scene.classList.remove('shown');
            });
        } else {
            zoomOut(scene, () => {
                scene.classList.remove('animation-running');
                scene.classList.add('shown');
            });
        }

    }


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
            <div ref={tableRef} className="table" onClick={tableClickHandler}>
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
