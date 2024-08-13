import {
  faCheck,
  faFloppyDisk,
  faPenToSquare,
  faTrashCan,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { useState } from "react";
import {
  deletePhoneBook,
  editPhoneBook,
} from "../lib/redux/phonebooks/PhoneBookSlice";

export default function PhoneBookButton({ name, phone, editStatus, edit, id }) {
  const dispatch = useDispatch();

  const [valid, setValid] = useState(false);

  if (valid) {
    return (
      <div className="button">
        <FontAwesomeIcon
          className="buttons"
          onClick={() => {
            dispatch(deletePhoneBook(id));
            setValid((prev) => !prev);
          }}
          icon={faCheck}
        />
        <FontAwesomeIcon
          className="buttons"
          onClick={() => setValid((prev) => !prev)}
          icon={faXmark}
        />
      </div>
    );
  }

  if (editStatus) {
    return (
      <div className="button">
        <FontAwesomeIcon
          className="buttons"
          onClick={() => {
            dispatch(editPhoneBook(id, name, phone));
            edit();
          }}
          icon={faFloppyDisk}
        />
      </div>
    );
  }

  return (
    <div className="button">
      <FontAwesomeIcon
      aria-label="editbutton"
        className="buttons"
        onClick={() => edit()}
        icon={faPenToSquare}
      />
      <FontAwesomeIcon
        className="buttons"
        onClick={() => setValid((prev) => !prev)}
        icon={faTrashCan}
      />
    </div>
  );
}
