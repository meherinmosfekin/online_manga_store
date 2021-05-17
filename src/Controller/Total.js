import React from "react";
import "../View/Total.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "../Model/StateProvider";
import { getTotal } from "../Model/rootReducer";

function Total() {
  const [{ rentbox }] = useStateValue();
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
