import type { PageContentProps } from  '../types';
import { BookPageConfig } from '../types';

import React, { ComponentType, RefObject} from 'react';
import dynamic from 'next/dynamic'
import DataContext from '../context/DataContext';
import Page from './Page';

import styles from '../styles/ContentContainer.module.css';

interface Props {
    type: 'front' | 'back',
    pageNum: number;
    page: Page
    component?: string,
}

export default class ContentContainer extends React.Component<Props> {

    static contextType = DataContext;

    ref: RefObject<HTMLDivElement>;

    pageTypeCSS: string;

    hasNoContent: boolean = true;

    content: ComponentType<PageContentProps> | null = null;

    constructor(props: Props) {
        super(props);
        this.ref = React.createRef();
        this.pageTypeCSS = props.type === 'front' ? styles['page-front'] : styles['page-back'];
        if (props.component) {
            this.content = dynamic(() => import(`../contents/${props.component}`));
        }
    }

    render() {
        const data = this.context.getData();
        const pageConfig = data.pages[this.props.pageNum - 1] as BookPageConfig;
        if (!this.content) {
            return <></>;
        }
        
        this.hasNoContent = false;

        return (
            <div ref={this.ref} className={`${styles['page-content']} ${this.pageTypeCSS}`}>
                <div className={styles['page-content-header']}></div>
                <div className={`${styles['page-content-text']}`}>
                    {this.content && pageConfig && (
                        <this.content
                            key={pageConfig.id}
                            headline={pageConfig.headline || null}
                            pageNum={this.props.pageNum}
                            part={pageConfig.part || null}
                        />
                    )}
                    <div className={styles['page-num']}>
                        {this.props.pageNum}
                    </div>
                </div>
                <div className={styles['page-content-footer']}></div>
            </div>
        );
    }
}
