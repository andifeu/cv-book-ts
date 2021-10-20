import { CareerConfig } from '../types';

import PageContent from './PageContent';
import CareerStep from '../components/CareerStep';
import DataContext from '../context/DataContext';

export default class Career extends PageContent {

    static contextType = DataContext;

    careerElements:Array<Array<CareerConfig>> = [];

    loadData() {
        const data = this.context.getData();
        data.career.forEach((step: CareerConfig) => {
            const pageIndex = step.part! - 1;
            if (this.careerElements[pageIndex] === undefined) {
                this.careerElements[pageIndex] = [];
            }
            this.careerElements[pageIndex].push(step);
        });
    }


    getPageContent(pageNumber: number) {
        const elements:JSX.Element[] = [];

        if (this.careerElements.length === 0) {
            this.loadData();
        }

        this.careerElements[pageNumber].forEach(step => {
            elements.push(<CareerStep key={step.id} step={step} />);
        });

        return (
            <>
                <h2>{this.headline}</h2>
                {elements}
            </>
        );
    }


    render1() {
        return this.getPageContent(0);
    }

    render2() {
        return this.getPageContent(1);
    }
}
