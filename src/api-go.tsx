import { Page } from "./components";
import { RequestProvider } from "./context";
import './App.css'

function ApiGo() {
    return (
        <RequestProvider>
            <Page/>
        </RequestProvider>
    );
}

export default ApiGo;
