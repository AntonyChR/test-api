import { Page } from "./components";
import { RequestProvider } from "./context";
import './App.css'

function Eagle() {
    return (
        <RequestProvider>
            <Page/>
        </RequestProvider>
    );
}

export default Eagle;
