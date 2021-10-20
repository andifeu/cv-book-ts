import PageContent from './PageContent';
import Card from '../components/widgets/Card';

type Part = number | null;
interface Props {
    headline: string
    pageNum: number,
    part: Part
}

export default class About extends PageContent {

    render() {
        return (
            <>
                <h2>{this.headline}</h2>
                <div className={this.css['image-container']}>
                    <Card image="portrait.jpg" title="Über mich" description="Andreas Feuerstein" />
                </div>
                <div className={this.css['about-text']}>
                    <p>
                        Hallo! Mein Name ist Andreas Feuerstein. Seit 2011
                        arbeite ich leidenschaftlich als Webentwickler mit den
                        Schwerpunkten PHP-Backend- sowie
                        Javascript-Frontendentwicklung. Bei zahlreichen
                        spannenden Projekten in den letzten Jahren konnte ich
                        mein Know-How weiterentwickeln.
                    </p>
                    <p>
                        Seit Oktober 2015 bin ich als selbstständiger
                        Softwareentwickler tätig und biete Ihnen kreative
                        Lösungen für Ihr Projekt.
                    </p>
                </div>
            </>
        );
    }
}
