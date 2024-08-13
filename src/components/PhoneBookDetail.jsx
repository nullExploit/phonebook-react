import { useState } from "react";
import PhoneBookButton from "./PhoneBookButton";

export default function PhoneBookDetail({ id, name, phone }) {
  const [edit, setEdit] = useState(false);
  const [tempName, setTempName] = useState(name);
  const [tempPhone, setTempPhone] = useState(phone);

  const onEdit = () => {
    setEdit((prev) => !prev);
  };

  if (edit) {
    return (
      <div className="details">
        <input
          type="text"
          className="edits"
          value={tempName}
          onChange={(evt) => setTempName(evt.target.value)}
        />
        <input
          type="text"
          className="edits"
          value={tempPhone}
          onChange={(evt) => setTempPhone(evt.target.value)}
        />
        <br />
        <PhoneBookButton
          edit={onEdit}
          name={tempName}
          phone={tempPhone}
          editStatus={edit}
          id={id}
        />
      </div>
    );
  }

  return (
    <div className="details">
      <p className="name">{name}</p>
      <p>{phone}</p>
      <br />
      <PhoneBookButton
        edit={onEdit}
        name={tempName}
        phone={tempPhone}
        editStatus={edit}
        id={id}
      />
    </div>
  );
}
