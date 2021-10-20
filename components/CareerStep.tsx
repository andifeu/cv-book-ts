import { CareerConfig } from '../types';
import CSS from 'csstype';

import { useState, useEffect } from 'react';
import { FaCheck } from 'react-icons/fa';

import css from '../styles/PageContent.module.css';

interface Props {
    step: CareerConfig
}

interface LoadedImage {
    default?: {
        src: string
    }
}


export default function CareerStep(props: Props) {
    const technologies:JSX.Element[] = [];
    const descriptionList:JSX.Element[] = [];
    const bgStyle:CSS.Properties = {};
    const defaultState: LoadedImage = {};
    const [source, setSource] = useState(defaultState);

    useEffect(() => {
        if (!props.step.bgImage) {
            return;
        }
        import(`/public/images/${props.step.bgImage}`).then((image: LoadedImage) => {
            setSource(image);
        });
    }, [props.step.bgImage]);

    if (props.step.technologies && Array.isArray(props.step.technologies)) {
        props.step.technologies.forEach(technology => {
            technologies.push(
                <li key={technology}>
                    <FaCheck />
                    <span>{technology}</span>
                </li>
            );
        });
    }

    if (Array.isArray(props.step.description)) {
        for (let i = 0; i < props.step.description.length; i++) {
            descriptionList.push(
                <li key={`desc-${i}`}>{props.step.description[i]}</li>
            );
        }
    }

    if (source.default && source.default.src) {
        bgStyle.backgroundImage = 
            `linear-gradient(
                rgba(247,247,247,0.85),
                rgba(247,247,247,0.85)
            ), url(${source.default.src})`;
    }

    return (
        <div style={bgStyle} className={css['career-step']}>
            <div className={css.period}>
                <b>{props.step.period}</b>
            </div>
            <div className={css.description}>
                <div>{props.step.title}</div>
                <div>
                    <b>Ort:</b>&nbsp;{props.step.location}
                </div>
                <div>
                    <b>Aufgaben:</b>&nbsp;
                    {(() => {
                        if (Array.isArray(props.step.description)) {
                            return (
                                <ul className={css['description-list']}>
                                    {descriptionList}
                                </ul>
                            );
                        } else {
                            return props.step.description;
                        }
                    })()}
                </div>
                <div>
                    <ul className={css.technologies}>{technologies}</ul>
                </div>
            </div>
        </div>
    );
}
