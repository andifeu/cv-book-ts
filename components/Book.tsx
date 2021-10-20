import React, { RefObject } from 'react';
import { BrowserInfo, detect } from 'detect-browser';
import { withRouter } from 'next/router';

import Page from './Page';
import Menu from './Menu';
import DataContext from '../context/DataContext';

import styles from '../styles/Book.module.css';

import { AppConfig, BookPageConfig } from '../types';
import { WithRouterProps } from 'next/dist/client/with-router';
import Toolkit from '../utils/Toolkit';

interface Props extends WithRouterProps {
    menuRef: RefObject<HTMLDivElement>;
}

const PAGINATION_INTERVAL = 300;

class Book extends React.Component<Props> {

    static contextType = DataContext;

    data: AppConfig | null = null;

    pages: BookPageConfig[] = [];

    numPages: number = 0;

    numSites: number = 0;

    activePageIndex: number = 0;

    pageRefs: Page[] = [];

    prevDirectionUp: boolean = true;

    animationActive: boolean = false;

    browserInfo: BrowserInfo;

    menuRef: RefObject<HTMLDivElement>;

    // isSafari: boolean = false;

    constructor(props: Props) {
        super(props);
        this.menuRef = props.menuRef;
        this.browserInfo = detect() as BrowserInfo;
    }

    // shouldComponentUpdate() {
    //     return false;
    // }

    isAnimationActive(): boolean {
        return this.pageRefs.some((page: Page) => page.isAnimationActive());
    }

    goToPageByUrl(url: string) {
        const pages = this.pages;
        let int: number;
        let targetPageIndex = 0, i = 0, j = 0;
        let pageFound = false;
        let pageUrl: string;

        while (i < pages.length) {
            pageUrl = pages[i].url;
            if (pages[i].url.substr(0, 1) !== '/') {
                pageUrl = '/' + pages[i].url;
            }

            if (url === pageUrl) {
                pageFound = true;
                break;
            }
            i++;
        }

        if (!pageFound) {
            this.props.router.replace('');
            return;
        }

        targetPageIndex = Math.floor((i + 1) / 2);
        const numPagesToTurn = targetPageIndex - this.activePageIndex;

        let goToPage = () => {
            if (j < numPagesToTurn) {
                this.pageAnimation(j, false);
                j++;
            } else {
                clearInterval(int);
            }
        }
        
        if (numPagesToTurn < 0) {
            j = Math.abs(numPagesToTurn) - 1;
            goToPage = () => {
                if (j >= 0) {
                    this.pageAnimation(j, false);
                    j--;
                } else {
                    clearInterval(int);
                }
            }
        }

        int = window.setInterval(goToPage, PAGINATION_INTERVAL);
    }
    

    componentDidMount() {
        const currentPath = this.props.router.asPath;
        console.log('componentDidMount');
        document.addEventListener('wheel', this.mousewheelHandler.bind(this));

        setMenuVisibility(this.props.menuRef.current!, currentPath);
        Toolkit.delayedExecution(() => {
            this.goToPageByUrl(currentPath);
        }, 0);

        this.props.router.events.on('routeChangeComplete', url => {
            const isAutoChanged = this.props.router.query?.autoChange ? true : false;

            setMenuVisibility(this.menuRef.current!, url);

            if (!this.isAnimationActive() && !isAutoChanged) {
                this.goToPageByUrl(url);
            }
        });
    }

    componentWillUnmount() {
        document.removeEventListener(
            'wheel',
            this.mousewheelHandler.bind(this)
        );
    }

    mousewheelHandler(e: WheelEvent) {
        let pageIndex = this.activePageIndex;
        let directionUp = true;
        if (e.deltaY < 0) {
            if (pageIndex === 0) {
                return;
            }
            directionUp = false;
            pageIndex--;
        } else if (pageIndex === this.numSites) {
            return;
        }

        if (!this.pageRefs[pageIndex]) {
            return;
        }

        this.pageAnimation(
            pageIndex,
            this.prevDirectionUp !== directionUp,
            true
        );
    }

    pageAnimation(pageIndex: number, blockWhileActive: boolean, updateURL?: boolean) {
        if (!this.pageRefs[pageIndex]) {
            console.error('page not set!');
            return;
        }
        const page = this.pageRefs[pageIndex],
            frontActive = page.isFrontActive(),
            animationActive = this.isAnimationActive();

        if (
            (animationActive && blockWhileActive) || 
            (
                pageIndex === this.numSites - 1 && 
                page.backRef.current?.hasNoContent === true
            )
        ) {
            return;
        }

        if (!frontActive) {
            this.prevDirectionUp = false;
            this.activePageIndex--;
        } else {
            this.prevDirectionUp = true;
            this.activePageIndex++;
        }

        if (!animationActive) {
            for (let i = 0; i < this.pageRefs.length; i++) {
                if (this.browserInfo.name === 'firefox' && this.pageRefs[i]) {
                    this.pageRefs[i].ref.current!.style.display = '';
                }
            }
        }

        page.animate((page: Page) => {
            if (!this.isAnimationActive()) {
                if (updateURL) {
                    let pageNum = page.pageNum;
                    if (!page.isFrontActive()) {
                        pageNum++;
                    }
                    setUrlForPageNum(this, pageNum);
                }

                /**
                 * Firefox fix:
                 * z-order of pages broken when using z-index and transform-style "preserve-3d"
                 */
                if (this.browserInfo.name === 'firefox') {
                    for (let i = 0; i < this.pageRefs.length; i++) {
                        if (
                            i !== this.activePageIndex - 1 &&
                            i !== this.activePageIndex
                        ) {
                            this.pageRefs[i].ref.current!.style.display = 'none';
                        }
                    }
                }
            }
        });
    }

    // componentDidUpdate() {
    //     console.log('componentDidUpdate');
    // }

    render() {

        this.data = this.context.getData();
        this.pages = this.data?.pages || [];
        this.numPages = this.pages.length;
        this.numSites = Math.ceil(this.numPages / 2);

        const pages = [];
        const eventTagBlacklist = ['A'];
        for (let i = 0; i < this.numSites; i++) {
            const pageClickListener = (e: React.MouseEvent) => {
                const selection = document.getSelection();
                const domEl = e.target as HTMLElement;
                if (!selection || selection.type.toLowerCase() === 'range') {
                    return;
                }

                if (eventTagBlacklist.indexOf(domEl.tagName) === -1) {
                    this.pageAnimation(i, true, true);
                }
            };

            pages.push(
                <Page
                    key={`page-${i}`}
                    numSites={this.numSites}
                    siteIndex={i}
                    ref={(ref: Page) => {
                        this.pageRefs[i] = ref;
                    }}
                    onPageClick={pageClickListener}
                />
            );
        }
        
        return (
            <>
                <div className={styles.contents}>
                    <div className={styles.headline}>
                        <h1 className={styles.title}>
                            Andreas Feuerstein
                            <br />
                            Softwareentwicklung
                        </h1>
                    </div>
                    <div className={styles.index}>
                        <h2>Inhalte</h2>
                        <Menu />
                    </div>
                </div>
                {pages}
                <div className={styles.back}></div>
            </>
        );
    }
}

function setUrlForPageNum(book: Book, pageNum: number) {
    let currentChapter = book.pages[pageNum - 1];
    let pathname = '[[...page]]';
    let url = currentChapter.url;

    if (currentChapter.url !== book.props.router.asPath) {
        if (currentChapter.url === '') {
            pathname = '';
            url = '/';
        }
        book.props.router.push(
            {
                pathname: pathname, 
                query: {
                    autoChange: true
                },
            },
            url, {
                shallow: true
            }
        );
    }
}

function setMenuVisibility(menuDom: HTMLDivElement, pathname: string) {
    if (pathname === '/') {
        menuDom.classList.add('hide');
    } else {
        menuDom.classList.remove('hide');
    }
}

export default withRouter(Book);