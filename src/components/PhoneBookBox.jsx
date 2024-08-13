import { useDispatch, useSelector } from "react-redux";
import PhoneBookItem from "./PhoneBookItem";
import PhoneBookSearch from "./PhoneBookSearch";
import avatar from "../avatar.png";
import { useEffect, useState } from "react";
import {
  loadPhoneBookAsync,
  selectPhoneBook,
  total,
} from "../lib/redux/phonebooks/PhoneBookSlice";

export default function PhoneBookBox() {
  const phonebooks = useSelector(selectPhoneBook);
  const totalData = useSelector(total);
  const dispatch = useDispatch();
  const [sort, setSort] = useState(false);
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(48);

  window.onscroll = () => {
    if (
      limit < totalData &&
      window.scrollY + window.innerHeight ===
        document.documentElement.scrollHeight
    ) {
      setLimit((prev) => (prev += 10));
    }
  };

  useEffect(() => {
    dispatch(loadPhoneBookAsync({ sort, search, limit }));
  }, [dispatch, sort, search, limit]);

  const list = phonebooks.map((item) => (
    <PhoneBookItem
      id={item.id}
      name={item.name}
      phone={item.phone}
      avatar={item.avatar ? `http://localhost:3001/${item.avatar}` : avatar}
      key={item.id}
    />
  ));

  return (
    <section>
      <PhoneBookSearch
        sort={sort}
        setSort={setSort}
        search={search}
        setSearch={setSearch}
        limit={limit}
      />
      <div className="phonebooks">{list}</div>
    </section>
  );
}
