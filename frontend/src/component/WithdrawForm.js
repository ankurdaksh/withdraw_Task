
import React, { useState } from "react";
import axios from "axios";

function WithdrawForm() {
  const [amount, setAmount] = useState("");
  const [withdrawnNotes, setWithdrawnNotes] = useState({});
  const [totalWithdrawnAmount, setTotalWithdrawnAmount] = useState(0);
  const [error, setError] = useState("");

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
    setError('')
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount.trim()) return;

    try {
      const response = await axios.post(
        "http://localhost:7878/api/v1/withdraw",
        {
          amount: Number(amount),
        }
      );
      const { status, data } = response;
      if (status == 200) {
        const { withdrawnNotes } = data;
        const totalAmount =
          withdrawnNotes?.notes500 * 500 +
          withdrawnNotes?.notes200 * 200 +
          withdrawnNotes?.notes100 * 100;
        setTotalWithdrawnAmount(totalAmount);
        setWithdrawnNotes(withdrawnNotes);
        setAmount("");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <>
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      <div style={{ textAlign: "center" }}>
        <h2>ATM Withdrawal</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="amount">Enter Amount:</label>
          <br />
          <input
            type="number"
            id="amount"
            name="amount"
            value={amount}
            onChange={handleAmountChange}
            style={{ marginBottom: "10px" }}
          />
          <br />
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Submit
          </button>
        </form>
        {Object.keys(withdrawnNotes).length > 0 && (
          <div>
            <h3>Withdrawn Amount:</h3>
            {withdrawnNotes?.notes500 ? (
              <p>500: {withdrawnNotes?.notes500}</p>
            ) : (
              ""
            )}
            {withdrawnNotes?.notes200 ? (
              <p>200: {withdrawnNotes?.notes200}</p>
            ) : (
              ""
            )}
            {withdrawnNotes?.notes100 ? (
              <p>100: {withdrawnNotes?.notes100}</p>
            ) : (
              ""
            )}
            {totalWithdrawnAmount ? (
              <p>Total Amount:{totalWithdrawnAmount}</p>
            ) : (
              ""
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default WithdrawForm;
