import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const SearchBox = () => {

  let [keyword, setKeyword] = useState("");
  const [focusedField, setFocusedField] = useState(false);
  const [noKeyword, setNoKeyword] = useState(false); // 검색어가 없는 경우
  const [noMatched, setNoMatched] = useState(false); // 검색어가 매칭되지 않는 경우
  const { filteredList } = useSelector(state => state);
  let dispatch = useDispatch();

  const searchByName = (event) => {
    event.preventDefault(); // 리로드 막기

    // 검색어가 없는 경우
    if (keyword === "") {
      setNoKeyword(true);
      setNoMatched(false);
    }
    else { // 검색어가 있는 경우
      setNoKeyword(false);
      dispatch({type:"SEARCH_BY_NAME", payload:{keyword}});
    }
  };

  useEffect(() => {
    // 검색어가 있는 상태에서만 필터링 상태를 확인
    if (keyword !== "") {
      if (filteredList.length === 0) {
        setNoMatched(true);
      } else {
        setNoMatched(false);
      }
    } else {
      // 검색어가 없을 때에는 매칭 상태를 확인할 필요가 없음
      setNoMatched(false);
    }
  }, [filteredList]);

  // 엔터를 눌러도 검색(필터링)이 되게 하기
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      searchByName(event);
    }
  }
  
  return (
    <div>
      <div className={`search-form ${focusedField ? "focus" : ""}`}>
        <input
          text="text"
          placeholder="이름으로 검색"
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setFocusedField(true)}
          onBlur={() => setFocusedField(false)}
        />
        <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" onClick={searchByName} />
      </div>
      <div>
        {noKeyword && (<div className="search-msg">키워드가 입력되지 않았습니다.</div>)}
        {noMatched && (<div className="search-msg">검색 결과가 없습니다.</div>)}
      </div>
    </div>
  )
};

export default SearchBox;
