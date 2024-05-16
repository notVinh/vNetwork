import { useState } from "react";
import useDebounc from "../hooks/useDebounc";
import useSearch from "../zustand/useSearch";

const Search = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [showSearchIcon, setShowSearchIcon] = useState(true);
  const [showResult, setShowResult] = useState(false);

  const [search, setSearch] = useState("");

  const { result, loading } = useDebounc();

  const { setSearchText } = useSearch();

  return (
    <div className="w-70 relative">
      {showSearchIcon && (
        <div
          className="group mx-3 rounded-full p-2 flex items-center justify-center hover:bg-[#877eff] cursor-pointer "
          onClick={() => {
            setShowSearch(true);
            setShowSearchIcon(false);
          }}
        >
          <img
            src="/assets/icons/search2.svg"
            className="w-[30px] group-hover:invert-white"
          />
        </div>
      )}
      <div
        className={`border-2 rounded-full my-1 ${
          showSearch ? "flex" : "hidden"
        }`}
      >
        <input
          type="text"
          className="text-black outline-none ml-3 mr-5 pl-1"
          onBlur={() => {
            setShowSearch(false);
            setShowSearchIcon(true);
            setShowResult(false);
          }}
          autoFocus
          value={search}
          placeholder="type something..."
          onFocus={() => setShowResult(true)}
          onChange={(e) => {
            const text = e.target.value;
            if (!text.startsWith(" ")) {
              setSearch(text);
              setSearchText(text);
            }
          }}
        />
        <img
          src={
            !loading ? "/assets/icons/close.svg" : "assets/icons/loading.svg"
          }
          className="w-8 group-hover:invert-white mx-1 cursor-pointer"
          onClick={() => {
            setShowSearch(false);
            setShowSearchIcon(true);
          }}
        />
        {/* <div>
          {loading && (
            <img src="assets/icons/loading.svg" alt="" className="w-8" />
          )}
        </div> */}
      </div>
      {search.length > 0 && (
        <div className="absolute top-[40px] left-[10px] w-[230px] drop-shadow-lg ">
          <div
            className={`${
              showResult ? "block" : "hidden"
            } w-full text-black bg-white h-[300px] rounded-lg  `}
          >
            {result.map((item) => (
              <div
                className="flex items-center mx-1 my-1 cursor-pointer px-1 border-b-2 hover:bg-slate-400 rounded-lg"
                key={item._id}
              >
                <img
                  src={item?.profilePicture}
                  alt=""
                  className="w-8 rounded-full mr-2 my-2"
                />
                <h1>{item.name}</h1>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
