import { Page } from "./components";
import { RequestProvider } from "./context";
import './App.css'

function ApiTest() {
    return (
        <RequestProvider>
            <Page/>
        </RequestProvider>
    );
}

export default ApiTest;
