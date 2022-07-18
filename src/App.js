import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { useState } from "react";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import Detail from "./routes/Detail";

import data from "./data.js";

function App() {
  let [shoes] = useState(data);
  let navigate = useNavigate(); //페이지 이동을 도와주는 함수

  return (
    <div className="App">
      <div>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="/">Navbar</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="/Cart">Cart</Nav.Link>
              <Nav.Link
                onClick={() => {
                  navigate("/");
                }} ///navigate(1)뒤로가기, (-1) 앞으로가기
              >
                Pricing
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                {" "}
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
              </div>
            }
          />
          <Route path="/detail/:id" element={<Detail shoes={shoes} />} />
          <Route path="/about" element={<About />}>
            <Route path="member" element={<div>멤버임</div>} />
            <Route path="location" element={<div>로케이션임</div>} />
          </Route>
          <Route path="*" element={<div>잘못된 주소입니다.</div>} />
          <Route path="/event" element={<Event />}>
            <Route path="one" element={<div>첫 주문시 양배추즙 서비스</div>} />
            <Route path="two" element={<div>생일기념 쿠폰 받기</div>} />
          </Route>
        </Routes>
        <Button variant="secondary">Secondary</Button>{" "}
      </div>
    </div>
  );
}

// 리스팅 컴포넌트

function List(props) {
  let navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate("/detail/" + props.shoes.id + 1);
      }}
    >
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

//어바웃 컴포넌트

function About() {
  return (
    <div>
      <h4>회사정보임</h4>
      <Outlet></Outlet>
      {/* outlet은 nested route를 보여주기 위해 뚫어주는 위치 구멍이라 생각해 */}
    </div>
  );
}

function Event() {
  return (
    <div>
      <h3>오늘의 이벤트</h3>
      <Outlet></Outlet>
    </div>
  );
}
