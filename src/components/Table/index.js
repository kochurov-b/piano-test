import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

import Button from "../Button";
import { getTopFaqs } from "../../store/actions/faqs";
import { getTopQuestions } from "../../store/actions/topQuestions";
import BootProcess from "../BootProcess";
import Modal from "../Modal";
import Table from "../Table";

import "./styles.css";

export default ({ fromLocation }) => {
  const { result = [] } = useSelector(state => state[fromLocation]);

  const [isOpenPanel, setIsOpenPanel] = useState(false);
  const [locationInsideTable, setLocationInsideTable] = useState("");
  const [data, setData] = useState(result);
  const [sortDirection, setSortDirection] = useState({
    answer_count: "desc"
  });

  const dispatch = useDispatch();

  useEffect(() => {
    setData(result);
  }, [result]);

  const handleAuthor = id => {
    setLocationInsideTable("topQuestions");
    setIsOpenPanel(true);
    dispatch(getTopQuestions.request(id));
  };

  const handleTag = event => {
    setLocationInsideTable("faqs");
    setIsOpenPanel(true);
    dispatch(getTopFaqs.request(event.target.innerText));
  };

  const sortBy = key => {
    setData(data => [
      ...data.sort((a, b) =>
        sortDirection[key] === "desc" ? b[key] - a[key] : a[key] - b[key]
      )
    ]);

    setSortDirection(direction => ({
      ...direction,
      [key]: direction[key] === "desc" ? "asc" : "desc"
    }));
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Author</th>
            <th>Theme</th>
            <th>
              <Button
                className="button--sort"
                onClick={() => sortBy("answer_count")}
              >
                Number of responses
              </Button>
            </th>
            <th>Tags</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => {
            const {
              owner: { display_name, user_id },
              question_id,
              title,
              answer_count,
              tags,
              answers
            } = item;
            return (
              <tr key={question_id.toString()} className="table__tr">
                <td className="table__td-author">
                  {fromLocation !== "search" ? (
                    <span>{display_name.trim()}</span>
                  ) : (
                    <Button
                      onClick={() => handleAuthor(user_id)}
                      className="button--author"
                    >
                      {display_name.trim()}
                    </Button>
                  )}
                </td>
                <td>
                  <Link
                    to={{
                      pathname: `/question/${question_id}`,
                      state: { fromLocation }
                    }}
                    className={!answers ? "disabled-link" : undefined}
                    onClick={event => !answers && event.preventDefault()}
                  >
                    {title}
                  </Link>
                </td>
                <td className="table__td-answers-count">
                  <Link
                    to={{
                      pathname: `/question/${question_id}`,
                      state: { fromLocation }
                    }}
                  >
                    {answer_count}
                  </Link>
                </td>
                <td className="table__td-tags">
                  {tags
                    .map(tag =>
                      fromLocation !== "search" ? (
                        <span key={tag}>{tag}</span>
                      ) : (
                        <Button
                          onClick={event => handleTag(event)}
                          key={tag}
                          className="button--tag"
                        >
                          {tag}
                        </Button>
                      )
                    )
                    .reduce((prev, curr) => [prev, ", ", curr])}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

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
            <Modal modalClose={() => setIsOpenPanel(false)}>
              <h2>Popular questions</h2>
              <Table fromLocation={locationInsideTable} />
            </Modal>
          </CSSTransition>
        </BootProcess>
      )}
    </>
  );
};
