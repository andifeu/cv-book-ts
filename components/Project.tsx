import CSS from 'csstype';

import Card from './widgets/Card';
import { FaCheck } from 'react-icons/fa';

import css from '../styles/PageContent.module.css';

interface ProjectImage {
    name: string[],
    bgCSS?: string,
    style?: CSS.Properties
}

interface Props {
    projectname: string | JSX.Element,
    image: ProjectImage,
    customer: string | JSX.Element
    duration: string,
    technologies: string[],
    description: JSX.Element,
    code?: JSX.Element,
    demo?: JSX.Element
}

export default function Project(props: Props) {

    const technologies: JSX.Element[] = [];
    const images: JSX.Element[] = [];

    if (props.technologies && Array.isArray(props.technologies)) {
        props.technologies.forEach(function (technology) {
            technologies.push(
                <li key={technology}>
                    <FaCheck />
                    <span>{technology}</span>
                </li>
            );
        });
    }

    if (props.image && Array.isArray(props.image.name)) {
        props.image.name.forEach(function (name) {
            images.push(<Card key={name} image={name} filterFrequency="0.2" />);
        });
    }

    return (
        <>
            {props.image && props.image.bgCSS && (
                <div
                    className={`${css[props.image.bgCSS]} ${
                        css['project-bg-image']
                    }`}
                ></div>
            )}
            <div className={css.subheadline}>
                <h3>{props.projectname}</h3>
            </div>
            {images.length > 0 && (
                <div
                    style={props.image.style}
                    className={css['image-container']}
                >
                    {images}
                </div>
            )}

            <div className={css['project-desc']}>
                {props.customer && (
                    <div className={css.line}>
                        <p>
                            <b>Kunde:</b> {props.customer}
                        </p>
                    </div>
                )}
                {props.duration && (
                    <div className={css.line}>
                        <p>
                            <b>Dauer:</b>&nbsp;{props.duration}
                        </p>
                    </div>
                )}
                {technologies && (
                    <div className={css.line}>
                        <b>Technologien:</b>
                        <ul className={css.technologies}>{technologies}</ul>
                    </div>
                )}
                {props.description && (
                    <div className={css.line}>
                        <b>Beschreibung:</b>
                        <p>{props.description}</p>
                    </div>
                )}
            </div>
            {(props.code || props.demo) && (
                <div className={css.sources}>
                    {props.code && (
                        <div>
                            <b>Code:</b>&nbsp;
                            {props.code}
                        </div>
                    )}
                    {props.demo && (
                        <div>
                            <b>Demo:</b>&nbsp;
                            {props.demo}
                        </div>
                    )}
                </div>
            )}
        </>
    );
}
