import {
  faArrowDownAZ,
  faArrowUpZA,
  faMagnifyingGlass,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

export default function PhoneBookSearch({ sort, setSort, setSearch, setPage }) {
  const navigate = useNavigate();

  return (
    <div className="search-container">
      <button
        className="sorting-button"
        onClick={() => {
          setSort((prev) => !prev);
          setPage(1);
        }}
      >
        <FontAwesomeIcon icon={!sort ? faArrowUpZA : faArrowDownAZ} />
      </button>
      <input
        className="search-bar"
        type="text"
        onKeyUp={(evt) => {
          setSearch(evt.target.value);
          setPage(1);
        }}
      />
      <span>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </span>
      <button className="add-button" onClick={() => navigate("/add")}>
        <FontAwesomeIcon icon={faUserPlus} />
      </button>
    </div>
  );
}
