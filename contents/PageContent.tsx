import React from 'react';
import type { PagePart, PageContentProps } from  '../types';
import css from '../styles/PageContent.module.css';


interface Styles {
    readonly [key: string]: string; 
};

export default class PageContent extends React.Component<PageContentProps> {

    headline: string;

    pageNum: number;

    part: PagePart;

    css: Styles;

    constructor(props: PageContentProps) {
        super(props);
        this.headline = props.headline  || '';
        this.pageNum = props.pageNum;
        this.part = props.part || null;
        this.css = css;
    }

    render() {
        const funcName = `render${this.part}` as keyof PageContent;
        if (this.part && this[funcName]) {
            return this[funcName](this.props);
        }
        throw new Error('Fehler: render' + (this.part || '') + '() nicht implementiert');
    }
}