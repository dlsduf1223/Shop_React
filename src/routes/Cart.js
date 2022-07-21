import Table from "react-bootstrap/Table";
import { useSelector, useDispatch } from "react-redux";
import { addCount, subCount } from "../store/cartSlice";
import Button from "react-bootstrap/Button";

function Cart() {
  let state = useSelector((state) => {
    return state;
  });
  let dispatch = useDispatch();
  //redux에서 저장한 state를 갔다쓰기 위한 문법

  console.log(state);

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
          </tr>
        </thead>
        <tbody>
          {state.cart1.map((a, i) => (
            <tr key={i}>
              <td>{state.cart1[i].id}</td>
              <td>{state.cart1[i].name}</td>
              <td>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    dispatch(addCount(state.cart1[i].id));
                  }}
                >
                  +
                </Button>{" "}
                {state.cart1[i].count}{" "}
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    dispatch(subCount(state.cart1[i].id));
                  }}
                >
                  -
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Cart;
