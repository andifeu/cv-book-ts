import { FaCheck } from 'react-icons/fa';
import Card from '../components/widgets/Card';
import PageContent from './PageContent';

export default class Ausbildung extends PageContent {
    
    render() {
    
        const imageStyle = {
            width: '60%',
            height: '30%',
        };

        return (
            <>
                <h2>{this.headline}</h2>
                <div className={this.css.subheadline}>
                    <h3>Berufsausbilding</h3>
                </div>

                <div
                    style={imageStyle} className={this.css['image-container']}
                >
                    <Card image="avira-logo.png" filterFrequency="0.2" />
                </div>
                <div className={this.css['margin-top-10']}>
                    <p>
                        <b>Ort:</b>&nbsp;
                        <a
                            target="_blank"
                            rel="noreferrer"
                            href="https://www.avira.com/"
                        >
                            Avira GmbH
                        </a>
                        &nbsp; in Tettnang am Bodensee
                    </p>
                </div>
                <div>
                    <p>
                        <b>Dauer:</b>&nbsp;September 2005 - Juli 2008
                    </p>
                </div>
                <div className={this.css.line}>
                    <b>Tätigkeitsbereiche:</b>
                    <ul className={this.css.tasks}>
                        <li>
                            <FaCheck />
                            <span>Erlernen der Programmiersprachen C/C++</span>
                        </li>
                        <li>
                            <FaCheck />
                            <span>
                                Entwicklung des{' '}
                                <a
                                    target="_blank"
                                    rel="noreferrer"
                                    href="https://www.chip.de/downloads/Avira-RegistryCleaner_49840903.html"
                                >
                                    Avira RegistryCleaners
                                </a>{' '}
                                (C++/MFC)
                            </span>
                        </li>
                        <li>
                            <FaCheck />
                            <span>Erlernen der Programmiersprache Java</span>
                        </li>
                        <li>
                            <FaCheck />
                            <span>
                                Entwicklung von Kleinprojekten in PHP / HTML / CSS
                            </span>
                        </li>
                    </ul>
                </div>
            </>
        );
    }
}
