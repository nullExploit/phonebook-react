import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPhoneBook } from "../lib/redux/phonebooks/PhoneBookSlice";

export default function PhoneBookAdd() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <section>
      <div className="input">
        <input
          type="text"
          name=""
          onChange={(evt) => setName(evt.target.value)}
        />
        <input
          type="text"
          name=""
          onChange={(evt) => setPhone(evt.target.value)}
          onKeyDown={(event) => {
            if (!/[0-9]/.test(event.key) && event.code !== "Backspace") {
              event.preventDefault();
            }
          }}
        />
      </div>
      <div className="inputbutton">
        <button
          onClick={() => {
            dispatch(createPhoneBook(name, phone));
            navigate("/");
          }}
        >
          save
        </button>
        <button onClick={() => navigate("/")}>cancel</button>
      </div>
    </section>
  );
}
