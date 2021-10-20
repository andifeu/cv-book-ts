import React from 'react';
import PageContent from './PageContent';

export default class Ausbildung extends PageContent {

    number:number = 0x47889b788f2;

    callNumber(e: React.MouseEvent) {
        const intVal = this.number;
        e.preventDefault();
        window.location.href = 'tel://+' + intVal;
    }

    render() {
        return (
            <>
                <h2>{this.headline}</h2>
                <p>Andreas Feuerstein - Software Entwickler</p>
                <p>
                    Email:&nbsp;
                    <a href="mailto:andreas.feuerstein@mail.de">
                        andreas.feuerstein@mail.de
                    </a>
                </p>
                <p>
                    Tel.:&nbsp;
                    <a onClick={(e) => this.callNumber(e)} href="/#">
                        0 1575 / 30 933 62
                    </a>
                </p>
                <div className={this.css.address}>
                    <span>Adresse:</span>
                    <address>Blumenweg 10, 88319 Aitrach</address>
                </div>
                <div className={this.css.line}>
                    Sources und Code:&nbsp;
                    <a
                        target="_blank"
                        rel="noreferrer"
                        href="https://github.com/andifeu"
                    >
                        Github
                    </a>
                </div>
            </>
        );
    }
}
