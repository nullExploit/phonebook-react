import {
  faArrowDownAZ,
  faArrowUpZA,
  faMagnifyingGlass,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadPhoneBookAsync } from "../lib/redux/phonebooks/PhoneBookSlice";

export default function PhoneBookSearch({
  sort,
  setSort,
  search,
  setSearch,
  limit,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="search-container">
      <button
        className="sorting-button"
        onClick={() => {
          setSort((prev) => !prev);
        }}
      >
        <FontAwesomeIcon icon={!sort ? faArrowUpZA : faArrowDownAZ} />
      </button>
      <input
        className="search-bar"
        type="text"
        onChange={(evt) => setSearch(evt.target.value)}
        onKeyUp={() =>
          dispatch(loadPhoneBookAsync({ sort, keyword: search, limit }))
        }
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
