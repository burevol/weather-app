import React from "react";
import { Container } from "react-bootstrap";
import "../styles/App.css";
import Header from "./Header";
import Main from "./Main";

function App() {
    return (
        <Container expand="lg">
            <Header pushSearchData={Main.pullSearchData} switchMode={Main.switchMode}/>
            <Main/>
        </Container>);
}

export default App;