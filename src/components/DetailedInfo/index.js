import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";

import Notification from "../Notification";

import "./styles.css";

export default () => {
  const {
    state: { fromLocation }
  } = useLocation();
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { answers = [], title } = useSelector(state => {
    const { search, faqs, topQuestions } = state;
    const findInArray =
      fromLocation === "search"
        ? search.result
        : fromLocation === "faqs"
        ? faqs.result
        : topQuestions.result;

    return findInArray.find(item => item.question_id === +id);
  });

  return (
    <div className="answers">
      <h2>{title}</h2>
      <ul className="answers__list">
        {answers.map(answer => {
          const { answer_id, body } = answer;
          return (
            <li
              key={answer_id.toString()}
              className="answers__item"
              dangerouslySetInnerHTML={{ __html: body }}
            ></li>
          );
        })}
      </ul>

      {answers.length === 0 && (
        <Notification
          name="No results were found for your request!"
          linkName="Try a different question!"
          linkTo="/answers"
          className="notification--notice"
        />
      )}
    </div>
  );
};
