import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { useState } from "react";

import data from "./data.js";

function App() {
  let [shoes] = useState(data);

  return (
    <div className="App">
      <div>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="#home">Navbar</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        <div className="main-bg"></div>
        <div>
          <Container>
            <Row>
              {shoes.map(function (a, i) {
                return (
                  <Col>
                    <div className="list" key="i">
                      <List shoes={shoes[i]} i={i + 1} />
                    </div>
                  </Col>
                );
              })}
              {/* <img src={process.env.PUBLIC_URL + '/logo.png'}  
          public 폴더내의 이미지파일을 사용할때는 이 문법을 쓰세요~*/}
            </Row>
          </Container>
        </div>
        <Button variant="secondary">Secondary</Button>{" "}
      </div>
    </div>
  );
}

// 리스팅 컴포넌트

function List(props) {
  return (
    <div>
      <img
        src={"https://codingapple1.github.io/shop/shoes" + props.i + ".jpg"}
        width="80%"
      />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.content}</p>
      <p>{props.shoes.price}원</p>
    </div>
  );
}
export default App;
