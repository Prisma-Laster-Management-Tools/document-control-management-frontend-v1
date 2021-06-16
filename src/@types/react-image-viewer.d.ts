//import 'react-images-viewer';
declare module 'react-images-viewer' {
    import React from 'react';

    interface IComponentProps {
        imgs: Array<{ src: string }>;
        currImg?: number;
        isOpen?: boolean;
        onClose?: (...any: [any]) => any;
        onClickPrev?: (...any: [any]) => any;
        onClickNext?: (...any: [any]) => any;
    }

    declare const ImgsViewer: React.ComponentClass<IComponentProps>;
    export default ImgsViewer;
}
