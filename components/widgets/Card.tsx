import React from 'react';
import { BrowserInfo, detect } from 'detect-browser';
import ImageContext from '../../context/ImageContext';
import Toolkit from '../../utils/Toolkit';

import type CSS from 'csstype';

import css from '/styles/Card.module.css';

interface Props {
    image: string,
    title?: string,
    description?: string
    filterId?: string,
    filterFrequency?: string
}

type Ref = React.RefObject<HTMLDivElement>;

export default class Card extends React.Component<Props> {

    static contextType = ImageContext;

    image: string | null = null;

    breakpoint: number = 620;

    useFilter: boolean = true;

    filterRef: Ref;

    imageRef: Ref;

    filterFrequency: string | null = null;

    filterId: string | null = null;

    browserInfo: BrowserInfo;

    fallbackMode: boolean = false;

    timer: number = 0;

    constructor(props: Props) {
        super(props);
        this.browserInfo = detect() as BrowserInfo;

        this.imageRef = React.createRef();
        this.fallbackMode = this.browserInfo.name === 'safari';
        this.filterRef = React.createRef();
        if (!this.fallbackMode) {
            this.filterId = props.filterId || 'card-filter_' + getRandomNumber();
            this.filterFrequency = props.filterFrequency || '0.02';
        }
    }

    componentDidMount() {
        this.setImage(this.props.image);
        if (this.fallbackMode) {
            return;
        }

        setFilter(this, true);
        window.addEventListener('resize', (e) => {
            this.timer = Toolkit.delayedExecution(
                () => {
                    setFilter(this);
                },
                100,
                this.timer
            );
        });
    }

    setImage(imageName: string) {
        import(`/public/images/${imageName}`).then((image) => {
            if (!image || !image.default) {
                console.error('Image not found');
                return;
            }
            this.image = image.default.src;
            updateImage(this);
        });
    }

    showImage(e: React.MouseEvent) {
        e.stopPropagation();
        this.context.setName(this.image);
        this.context.setVisible(true);
    }

    render() {
        const bgImageCSS:CSS.Properties = {};

        if (this.image) {
            bgImageCSS.backgroundImage = `url(${this.image})`;
        }

        return (
            <div
                onClick={(e) => this.showImage(e)}
                className={css['card-widget']}
            >
                <div ref={this.filterRef} className={css['card-bg']}></div>
                <div className={css.card}>
                    <div
                        ref={this.imageRef}
                        className={`${css.image}`}
                        style={bgImageCSS}
                    ></div>
                </div>
                {this.filterId &&
                    <svg>
                        <filter id={this.filterId}>
                            <feTurbulence
                                x="0"
                                y="0"
                                baseFrequency={this.filterFrequency!}
                                numOctaves="5"
                                seed="1"
                            ></feTurbulence>
                            <feDisplacementMap in="SourceGraphic" scale="20" />
                        </filter>
                    </svg>
                }
            </div>
        );
    }
}

function getRandomNumber() {
    return Math.floor(Math.random() * 100000 + 1);
}

function setFilter(card: Card, initialize: boolean = false) {
    if (
        (initialize || card.useFilter === true) &&
        window.innerWidth < card.breakpoint
    ) {
        card.filterRef.current!.style.filter = '';
        card.useFilter = false;
    } else if (
        (initialize || card.useFilter === false) &&
        window.innerWidth >= card.breakpoint
    ) {
        card.filterRef.current!.style.filter = `url(#${card.filterId})`;
        card.useFilter = true;
    }
}

function updateImage(card: Card) {
    card.imageRef.current!.style.backgroundImage = `url(${card.image})`;
}
