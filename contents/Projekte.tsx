import PageContent from './PageContent';
import Project from '../components/Project';

export default class Projekte extends PageContent {
    
    render1() {
        const image = {
            name: ['ospneo.png'],
            bgCSS: 'ospneo-bg',
            style: {
                width: '40%',
                height: '26%',
            },
        };

        const customer = (
            <>
                <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://www.microdoc.com/"
                >
                    MicroDoc Computersysteme GmbH
                </a>{' '}
                als Dienstleister für die{' '}
                <a target="_blank" rel="noreferrer" href="https://www.f-i.de/">
                    Finanz Informatik GmbH & Co. KG.
                </a>
            </>
        );

        const technologies = ['Javascript', 'HTML5', 'CSS3'];

        const desc = (
            <>
                Mitentwicklung des Javascript UI-Frameworks OSPlus_neo, für den
                Einsatz bei Onlinebanking-Frontends, Bankberater-Software und
                inzwischen auch Geldautomaten:
                <br />
                <a
                    rel="noreferrer"
                    target="_blank"
                    href="https://www.youtube.com/watch?v=3RqmiVekSNA"
                >
                    Produktvideo
                </a>
            </>
        );

        return (
            <>
                <h2>{this.headline}</h2>
                <Project
                    projectname="OSPlus_neo"
                    image={image}
                    customer={customer}
                    duration="April 2016 - Februar 2021"
                    technologies={technologies}
                    description={desc}
                />
            </>
        );
    }

    render2() {
        const name = (
            <>
                Intranet Telefonbuch
                <br />-<br />
                Giesecke+Devrient
            </>
        );

        const image = {
            name: ['giesecke.jpg'],
            bgCSS: 'giesecke-bg'
        };

        const customer = (
            <a target="_blank" rel="noreferrer" href="https://www.gi-de.com/">
                Giesecke & Devrient
            </a>
        );

        const desc = (
            <>
                Entwicklung eines leichtgewichtigen PHP-MVC Frameworks zur
                internen Verwendung für G&D.
                <br />
                Portierung des alten Intranet-Telefonbuchs auf das neue System.
            </>
        );

        return (
            <Project
                projectname={name}
                image={image}
                customer={customer}
                duration="September 2015 - Dezember 2015"
                technologies={['PHP', 'Javascript']}
                description={desc}
            />
        );
    }

    render3() {
        const image = {
            name: ['cv-booklet.png'],
            style: {
                width: '80%',
                height: '35%',
            },
        };

        const desc = (
            <>
                Entwicklung eines Lebenslaufs in Form eines 3D-Hefts auf Basis
                von Vanilla Javascript und React.js.
            </>
        );

        const code = (
            <ul className={this.css['code-links']}>
                <li>
                    <a
                        rel="noreferrer"
                        target="_blank"
                        href="https://github.com/andifeu/cv-book-ts"
                    >
                        Github: Typescript/Next.js Version
                    </a>
                </li>
                <li>
                    <a
                        rel="noreferrer"
                        target="_blank"
                        href="https://github.com/andifeu/cv-booklet/tree/master"
                    >
                        Github: Javascript/React Version
                    </a>
                </li>
            </ul>
        );

        const demo = (
            <a
                rel="noreferrer"
                target="_blank"
                href="https://andifeu.github.io/cv-booklet/#/"
            >
                Github pages
            </a>
        );

        return (
            <Project
                projectname="CV Booklet"
                image={image}
                customer="privates Projekt"
                duration="August 2021 - September 2021"
                technologies={['Javascript', 'React.js']}
                description={desc}
                code={code}
                demo={demo}
            />
        );
    }

    render4() {
        const image = {
            name: ['webrtc-flutter-1.jpg', 'webrtc-flutter-2.jpg'],
            style: {
                width: '80%',
                height: '40%',
                padding: '5%',
            }
        };

        const desc = (
            <>
                Entwicklung einer Peer-To-Peer Videotelefonie-App für Android
                und iOS auf Basis des Frameworks Flutter und Firebase (Backend).
            </>
        );

        const code = (
            <>
                <a
                    rel="noreferrer"
                    target="_blank"
                    href="https://github.com/andifeu/webrtc_flutterclient"
                >
                    Github
                </a>
            </>
        );

        return (
            <Project
                projectname="WebRTC Video Call App"
                image={image}
                customer="privates Projekt"
                duration="März 2021 - Mai 2021"
                technologies={['Flutter', 'Dart', 'WebRTC']}
                description={desc}
                code={code}
            />
        );

    }
}
