import React from "react";
import { Navbar, Container, Dropdown, Form, FormControl, Button, Stack } from "react-bootstrap";

function Header(props) {

    let searchInput = React.createRef();

    function searchButtonClick() {
       props.pushSearchData(searchInput.current.value);
    }

    function switchHourly() {
        props.switchMode('hourly');
    }

    function swichDaily() {
        props.switchMode('daily');
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand>Weather App</Navbar.Brand>
                <Stack direction="horizontal" gap={3}>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Режим отображения
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={switchHourly}>Почасовой</Dropdown.Item>
                            <Dropdown.Item onClick={swichDaily}>Ежедневный</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form className="d-flex">
                        <FormControl
                            ref={searchInput}
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success" onClick={searchButtonClick}>Search</Button>
                    </Form>
                </Stack>
            </Container>

        </Navbar>
    );
}

export default Header;