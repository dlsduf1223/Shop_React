import React, { useContext, useEffect } from "react";
import "../App.css";

import { useParams } from "react-router-dom";
import { useState } from "react";
import { cleanup } from "@testing-library/react";
import Nav from "react-bootstrap/Nav";
import { addItem } from "../store/cartSlice";
import { useSelector, useDispatch } from "react-redux";

import { Context1 } from "../App";

function Detail(props) {
  let state = useSelector((state) => {
    return state;
  });
  let dispatch = useDispatch();
  useEffect(() => {
    //mount, update(재렌더링)될때 실행해줍니다. useEffect 안의 코드는  html렌더링 후 동작합니다. 성능에 관한 문제.. 서버에서 데이터 가져오는 작업, 타이머 장착

    let a = setTimeout(() => {
      setAlert(false);
    }, 2000);
    return () => {
      clearTimeout(a); //useEffect 동작전에 실행되는 코드
    };
  }, []); //[]의 state가 장착될때 1회만 사용이 되도록 하는 dependency, 재렌더링되어도 실행시키지 않도록

  let [alert, setAlert] = useState(true);
  let { id } = useParams(); //본체의 코드 라우터패스에 :idx가 그 자리에 남음
  let 찾은상품 = props.shoes.find(function (x) {
    return x.id == id;
  });
  let num1 = parseInt(id) + 1;
  let [탭, 탭변경] = useState(0);

  let [fade2, setFade2] = useState("");
  useEffect(() => {
    setFade2("end");
    return () => {
      setFade2("");
    };
  }, []);

  return (
    <div>
      <div className={"container start " + fade2}>
        {alert == true ? (
          <div className="alert alert-warning">2초 이내 구매시 할인</div>
        ) : null}

        <div className="row">
          <div className="col-md-6">
            <img
              src={"https://codingapple1.github.io/shop/shoes" + num1 + ".jpg"}
              width="100%"
            />
          </div>

          <div className="col-md-6">
            {/* 현재 url 파라미터 */}
            <h4 className="pt-5">{찾은상품.title}</h4>
            <p>{찾은상품.content}</p>
            <p>{찾은상품.price}원</p>
            <button
              className="btn btn-danger"
              onClick={() => {
                dispatch(
                  addItem({ id: 찾은상품.id, name: 찾은상품.title, count: 1 })
                );
                console.log("aaa");
              }}
            >
              주문하기
            </button>
          </div>
        </div>
        <Nav variant="tabs" defaultActiveKey="link0">
          <Nav.Item>
            <Nav.Link
              eventKey="link0"
              onClick={(e) => {
                탭변경(0);
              }}
            >
              리뷰
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="link1"
              onClick={(e) => {
                탭변경(1);
              }}
            >
              문의
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="link2"
              onClick={(e) => {
                탭변경(2);
              }}
            >
              버튼2
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <TabContent 탭={탭} shoes={props.shoes} />
      </div>
    </div>
  );
}

function TabContent(props) {
  let [fade, setFade] = useState("");
  let { 재고 } = useContext(Context1); //보관함을 해체해주는 함수

  useEffect(() => {
    let a = setTimeout(() => {
      setFade("end");
    }, 100);
    return () => {
      clearTimeout(a);
      setFade("");
    };
  }, [props.탭]); //useEffect를 사용해서 css사용 시점 조절하기
  let [입력값, set입력값] = useState([""]);
  let [review, setReview] = useState(["정말 좋아요", "굳입니다."]);
  return (
    <div className={`start ${fade}`}>
      {
        [
          <div className="review">
            <input
              size="40"
              type="text"
              placeholder="리뷰를 입력해주세요."
              onChange={(e) => {
                set입력값(e.target.value);
              }}
              value={입력값}
            />
            <button
              onClick={(e) => {
                let copy = [...review];
                copy.unshift(입력값);
                setReview(copy);
                set입력값("");
              }}
            >
              등록
            </button>
            {review.map(function (a, i) {
              return <Review review={review} i={i} />;
            })}
          </div>,
          <div>{재고}</div>,
          <div>내용2</div>,
        ][props.탭]
      }
    </div>
  );
  function Review(props) {
    return (
      <div className="reviewList">
        <span>{props.review[props.i]}</span>
      </div>
    );
  }
}

export default Detail;
