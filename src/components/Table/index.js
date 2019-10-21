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
  const [fromLocationName, setFromLocationName] = useState("");

  const { result = [] } = useSelector(state =>
    fromLocationName === "topQuestion" ? state.topQuestions : state.faqs
  );

  const dispatch = useDispatch();

  const handleAuthor = id => {
    setFromLocationName("topQuestion");
    setIsOpenPanel(true);
    dispatch(getTopQuestions.request(id));
  };

  const handleTag = event => {
    setFromLocationName("faqs");
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
              tags
            } = item;
            return (
              <tr key={question_id.toString()} className="table__tr">
                <td>
                  <Button
                    onClick={() => handleAuthor(user_id)}
                    className="button--author"
                  >
                    {display_name}
                  </Button>
                </td>
                <td>
                  <Link
                    to={{
                      pathname: `/answers/${question_id}`,
                      state: { fromLocation }
                    }}
                  >
                    {title}
                  </Link>
                </td>
                <td>
                  <Link
                    to={{
                      pathname: `/answers/${question_id}`,
                      state: { fromLocation }
                    }}
                  >
                    {answer_count}
                  </Link>
                </td>
                <td>
                  {tags
                    .map(tag => (
                      <Button
                        onClick={event => handleTag(event)}
                        key={tag}
                        className="button--tag"
                      >
                        {tag}
                      </Button>
                    ))
                    .reduce((prev, curr) => [prev, ", ", curr])}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {isOpenPanel && (
        <BootProcess fromLocation={fromLocationName}>
          {result.length === 0 ? (
            <Notification
              name={`No results were found for your request! Try selecting a different ${
                fromLocationName === "faqs" ? "tag" : "author"
              }.`}
              className="notification--notice"
            />
          ) : (
            <Modal modalClose={() => setIsOpenPanel(false)}>
              <h2>Popular questions</h2>
              <Table bodyData={result} fromLocation={fromLocationName} />
            </Modal>
          )}
        </BootProcess>
      )}
    </>
  );
};
