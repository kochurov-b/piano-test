import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Button from "../Button";
import { getTopFaqs } from "../../store/actions/faqs";
import { getTopQuestions } from "../../store/actions/topQuestions";
import BootProcess from "../BootProcess";
import Modal from "../Modal";
import Table from "../Table";
import Notification from "../Notification";

import "./styles.css";

export default ({ bodyData, fromLocation }) => {
  const [isOpenPanel, setIsOpenPanel] = useState(false);
  const [locationInsideTable, setLocationInsideTable] = useState("");

  const { result = [] } = useSelector(state =>
    locationInsideTable === "topQuestion" ? state.topQuestions : state.faqs
  );

  const dispatch = useDispatch();

  const handleAuthor = id => {
    setLocationInsideTable("topQuestion");
    setIsOpenPanel(true);
    dispatch(getTopQuestions.request(id));
  };

  const handleTag = event => {
    setLocationInsideTable("faqs");
    setIsOpenPanel(true);
    dispatch(getTopFaqs.request(event.target.innerText));
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Author</th>
            <th>Theme</th>
            <th>Number of responses</th>
            <th>Tags</th>
          </tr>
        </thead>
        <tbody>
          {bodyData.map(item => {
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

      {isOpenPanel && (
        <BootProcess fromLocation={locationInsideTable}>
          {result.length === 0 ? (
            <Notification
              name={`No results were found for your request! Try selecting a different ${
                locationInsideTable === "faqs" ? "tag" : "author"
              }.`}
              className="notification--notice"
            />
          ) : (
            <Modal modalClose={() => setIsOpenPanel(false)}>
              <h2>Popular questions</h2>
              <Table bodyData={result} fromLocation={locationInsideTable} />
            </Modal>
          )}
        </BootProcess>
      )}
    </>
  );
};
