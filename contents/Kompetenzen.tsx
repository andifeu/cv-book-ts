import PageContent from './PageContent';
import PieChart from '../components/widgets/PieChart';

import { FaCheck } from 'react-icons/fa';

export default class Kompetenzen extends PageContent {
    
    render1() {
        return (
            <>
                {this.headline && <h2>{this.headline}</h2>}
                <p>
                    Mein momentaner Schwerpunkt liegt in der Frontendentwicklung
                    mit Javascript, HTML5 und CSS3. Darüber hinaus konnte in
                    einigen Projekten eine mehrjährige Erfahung in der
                    Backendentwicklung mit PHP und MySQL sammeln.
                </p>
                <PieChart
                    label="Javascript"
                    sublabel="10 Jahre Erfahrung"
                    value="95"
                >
                    <div className={this.css.details}>
                        <b>Frameworks & Standarts</b>
                        <ul>
                            <li>
                                <FaCheck />
                                ECMAScript 5
                            </li>
                            <li>
                                <FaCheck />
                                ECMAScript 6 & neuer
                            </li>
                            <li>
                                <FaCheck />
                                Typescript
                            </li>
                            <li>
                                <FaCheck />
                                jQuery
                            </li>
                            <li>
                                <FaCheck />
                                React.js
                            </li>
                            <li>
                                <FaCheck />
                                Next.js
                            </li>
                            <li>
                                <FaCheck />
                                Node.js
                            </li>
                        </ul>
                    </div>
                </PieChart>
                <PieChart label="PHP" sublabel="12 Jahre Erfahrung" value="90">
                    <div className={this.css.details}>
                        <b>Frameworks & Standarts</b>
                        <ul>
                            <li>
                                <FaCheck />
                                PHP 7
                            </li>
                            <li>
                                <FaCheck />
                                CakePHP
                            </li>
                            <li>
                                <FaCheck />
                                Laravel
                            </li>
                            <li>
                                <FaCheck />
                                Doctrine
                            </li>
                        </ul>
                    </div>
                </PieChart>
                <PieChart
                    label="HTML 5"
                    sublabel="8 Jahre Erfahrung"
                    value="90"
                />
            </>
        );
    }

    render2() {
        return (
            <>
                <PieChart
                    label="CSS 3"
                    sublabel="10 Jahre Erfahrung"
                    value="90"
                />
                <PieChart
                    label="MySQL"
                    sublabel="8 Jahre Erfahrung"
                    value="85"
                />
                <PieChart
                    label="MongoDB"
                    sublabel="1 Jahre Erfahrung"
                    value="85"
                />
                <PieChart
                    label="C/C++"
                    sublabel="5 Jahre Erfahrung"
                    value="50"
                />
                <PieChart
                    label="Dart & Flutter"
                    sublabel="1 Jahr Erfahrung"
                    value="50"
                />
            </>
        );
    }
}
