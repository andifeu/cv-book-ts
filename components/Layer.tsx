import { useContext } from 'react';
import ImageContext from '../context/ImageContext';

import css from '/styles/Layer.module.css';

export default function Layer() {
    const imageContext = useContext(ImageContext);
    return (
        <div
            onClick={() => imageContext.setVisible(false)}
            className={css.layer}
        ></div>
    );
}
