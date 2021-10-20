import { useState, createContext } from 'react';

interface Props {
    children: React.ReactNode
}

const defaultState: {
    visible: boolean,
    name: string
} = {
    visible: false,
    name: ''
};

const ImageContext = createContext({
    setName: (name: string) => {},
    getName: (): string => {
        return '';
    },
    isVisible: (): boolean => {
        return false;
    },
    setVisible: (visible: boolean) => {}
});

export function ImageContextProvider(props: Props) {
    const [detailImage, setImage] = useState(defaultState);

    function setName(name: string) {
        setImage(prevImage => {
            return {
                visible: prevImage.visible,
                name: name
            };
        })
    }

    function getName(): string {
        return detailImage.name;
    }

    function isVisible(): boolean {
        return detailImage.visible; 
    }

    function setVisible(visible: boolean) {
        setImage(prevImage => {
            return {
                visible: visible,
                name: prevImage.name
            };
        })
    }

    const context = {
        setName: setName,
        getName: getName,
        isVisible: isVisible,
        setVisible: setVisible
    };

    return (
        <ImageContext.Provider value={context}>
            {props.children}
        </ImageContext.Provider>
    );
}

export default ImageContext;