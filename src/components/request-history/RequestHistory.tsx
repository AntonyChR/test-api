import { FC } from "react";

interface RequestHistoryProps{
    className: string;
}
export const RequestHistory:FC<RequestHistoryProps> = ({className}) => {
    return (
        <div className={`${className}`}>
            <h3>GET:200 URL:www.example.com dataSize: 200kb</h3>
            <h3>POST:200 URL:www.example.com dataSize: 200kb</h3>
            <h3>PUT:200 URL:www.example.com dataSize: 200kb</h3>
            <h3>GET:200 URL:www.example.com dataSize: 200kb</h3>
        </div>
    );
};