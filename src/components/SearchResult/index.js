import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

import Table from "../Table";
import { useInfiniteScroll } from "../../hooks";
import { getSearchData } from "../../store/actions/search";
import { SearchResultContext } from "../../utils/context";
import BootProcess from "../BootProcess";
import Modal from "../Modal";

import "./styles.css";

export default () => {
  const [locationInsideTable, setLocationInsideTable] = useState("");
  const [isOpenPanel, setIsOpenPanel] = useState(false);
  const { has_more } = useSelector(state => state.search);
  const { count, loading } = useInfiniteScroll(has_more);
  const dispatch = useDispatch();
  const { query } = useParams();

  useEffect(() => {
    isOpenPanel
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "visible");

    loading &&
      has_more &&
      dispatch(getSearchData.request({ query, page: count }));
  });

  useEffect(() => {
    return () => {
      document.body.style.overflow === "hidden" &&
        (document.body.style.overflow = "visible");
    };
  }, []);

  return (
    <>
      <SearchResultContext.Provider
        value={{
          setIsOpenPanel,
          locationInsideTable,
          setLocationInsideTable
        }}
      >
        <div className="search-result">
          <h2>Search results - {query}</h2>
          <div className="search-result__table">
            <Table fromLocation="search" />
          </div>
        </div>

        {locationInsideTable && (
          <BootProcess fromLocation={locationInsideTable}>
            <CSSTransition
              in={isOpenPanel}
              appear
              mountOnEnter
              unmountOnExit
              timeout={300}
              classNames="fade"
            >
              <Modal
                modalClose={() => {
                  setLocationInsideTable("");
                  setIsOpenPanel(false);
                }}
              >
                <h2>Popular questions</h2>
                <Table fromLocation={locationInsideTable} />
              </Modal>
            </CSSTransition>
          </BootProcess>
        )}
      </SearchResultContext.Provider>
    </>
  );
};
