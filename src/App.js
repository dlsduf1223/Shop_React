import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { useState, createContext } from "react";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import Detail from "./routes/Detail";
import data from "./data.js";
import axios from "axios";
import Cart from "./routes/Cart";

export let Context1 = createContext(); //보관함

function App() {
  let [shoes, setShoes] = useState(data);
  let [click, setClick] = useState(0);
  let navigate = useNavigate(); //페이지 이동을 도와주는 함수
  let [재고] = useState([10, 11, 12]);

  return (
    <div className="App">
      <div>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="/">ProjectShop</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link
                onClick={() => {
                  navigate("/cart");
                }}
              >
                Cart
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  navigate("/");
                }} ///navigate(1)뒤로가기, (-1) 앞으로가기
              >
                Log-in
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
                <div className="card">
                  <Container>
                    <Row>
                      {shoes.map(function (a, i) {
                        return (
                          <Col md={4} key={i}>
                            <div className="list">
                              <List shoes={shoes[i]} i={i + 1} />
                            </div>
                          </Col>
                        );
                      })}
                      {/* <img src={process.env.PUBLIC_URL + '/logo.png'}  
          public 폴더내의 이미지파일을 사용할때는 이 문법을 쓰세요~*/}
                    </Row>
                  </Container>
                  <button
                    onClick={() => {
                      setClick(click + 1);
                      console.log(click);
                      let num = click + 2;

                      click < 2
                        ? axios
                            .get(
                              "http://codingapple1.github.io/shop/data" +
                                num +
                                ".json"
                            )
                            .then((결과) => {
                              let copy = [...shoes, ...결과.data];
                              setShoes(copy);
                            })
                            .catch(() => {
                              console.log("실패");
                            })
                        : alert("더이상 더보기 할 수 없습니다.");

                      // axios.post('/asdfasd', {name:'kim'}) //서버로 데이터 보내기
                      // Promise.all([axios.get('/url1'),axios.et('/url2')]).then(())  두개의 데이터를 각각의 url에서 요청할때
                      // "{"name":"kim"}" <- json data임
                    }}
                  >
                    더보기
                  </button>
                </div>
              </div>
            }
          />
          <Route
            path="/detail/:id"
            element={
              // state 공유하는법
              <Context1.Provider value={{ 재고, shoes }}>
                <Detail shoes={shoes} />
              </Context1.Provider>
            }
          />
          <Route path="/cart" element={<Cart />}></Route>
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
        navigate("/detail/" + props.shoes.id);
      }}
    >
      <img
        src={"https://codingapple1.github.io/shop/shoes" + props.i + ".jpg"}
        width="80%"
      />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.content}</p>
      <p>{props.shoes.price.toLocaleString("ko-KR")}원</p>
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
