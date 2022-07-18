import { useParams } from "react-router-dom";

function Detail(props) {
  let { id } = useParams(); //본체의 코드 라우터패스에 :idx가 그 자리에 남음
  let 찾은상품 = props.shoes.find(function (x) {
    return x.id == id;
  });

  return (
    <div>
      <div className="container">
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
