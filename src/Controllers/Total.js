import React from "react";
import "../View/Total.css";
import CurrencyFormat from "react-currency-format";
import { useHistory } from "react-router-dom";
import { useStateValue } from "../Model/StateProvider";
import { getTotal } from "../Model/rootReducer";

function Total() {
  const [{ user, userName, rentbox }, dispatch] = useStateValue();
  const history = useHistory();
  return (
    <div className="total">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Total ({rentbox?.length} mangas): <strong> {value} </strong>
            </p>
          </>
        )}
        decimalScale={2}
        value={getTotal(rentbox)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
    </div>
  );
}

export default Total;
