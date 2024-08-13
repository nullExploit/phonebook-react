import { useState } from "react";
import PhoneBookDetail from "./PhoneBookDetail";
import { updateAvatarPhoneBookAsync } from "../lib/redux/phonebooks/PhoneBookSlice";
import { useDispatch } from "react-redux";

export default function PhoneBookItem({ id, name, phone, avatar }) {
  const [fileName, setFileName] = useState();
  const [file, setFile] = useState();
  const dispatch = useDispatch();

  const handleSubmit = async (event, id, file) => {
    event.preventDefault();
    dispatch(updateAvatarPhoneBookAsync({ id, data: file }));
  };

  const handleChange = (event, setFileName, setFile, id) => {
    if (event.target.files[0]) {
      setFileName(URL.createObjectURL(event.target.files[0]));
      setFile(event.target.files[0]);
      setTimeout(() => {
        document.getElementById(`submit${id}`).click();
      });
    }
  };

  return (
    <div className="phonebook-item">
      <img
        className="img"
        src={fileName ? fileName : avatar}
        alt={file}
        onClick={() => document.getElementById(`fileUpload${id}`).click()}
      />
      <form
        onSubmit={(evt) => handleSubmit(evt, id, file)}
        id={`formUpload${id}`}
        style={{ display: "none" }}
        encType="multipart/form-data"
      >
        <input
          type="file"
          id={`fileUpload${id}`}
          accept="image/*"
          onChange={(evt) => handleChange(evt, setFileName, setFile, id)}
        />
        <button type="submit" id={`submit${id}`} />
      </form>
      <PhoneBookDetail name={name} phone={phone} id={id} />
    </div>
  );
}
