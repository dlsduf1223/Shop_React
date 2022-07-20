import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { cleanup } from "@testing-library/react";

function Detail(props) {
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

  return (
    <div>
      <div className="container">
        {alert == true ? (
          <div className="alert alert-warning">2초 이내 구매시 할인</div>
        ) : null}

        <div className="row">
          <div className="col-md-6">
            <img
              src={"https://codingapple1.github.io/shop/shoes" + id + ".jpg"}
              width="100%"
            />
          </div>

          <div className="col-md-6">
            {/* 현재 url 파라미터 */}
            <h4 className="pt-5">{찾은상품.title}</h4>
            <p>{찾은상품.content}</p>
            <p>{찾은상품.price}원</p>
            <button className="btn btn-danger">주문하기</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
