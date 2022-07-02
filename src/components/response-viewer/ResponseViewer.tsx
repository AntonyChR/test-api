import { FC } from "react";
interface ResponseViewerProps{
    className: string;
}
export const ResponseViewer:FC<ResponseViewerProps> = ({className}) => {
    const data = {
        data: {
            id: 2,
            email: 'janet.weaver@reqres.in',
            first_name: 'Janet',
            last_name: 'Weaver',
            avatar: 'https://reqres.in/img/faces/2-image.jpg',
        },
        support: {
            url: 'https://reqres.in/#support-heading',
            text: 'To keep ReqRes free, contributions towards server costs are appreciated!',
        },
    };
    return (
        <div className={`${className}`}>
            <pre>{JSON.stringify(data, null, 2)}</pre>;
        </div>
    );
};
