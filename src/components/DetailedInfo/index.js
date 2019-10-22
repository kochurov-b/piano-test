import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";

import "./styles.css";

export default () => {
  const {
    state: { fromLocation }
  } = useLocation();
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { answers = [], title } = useSelector(state =>
    state[fromLocation].result.find(item => item.question_id === +id)
  );

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
    </div>
  );
};
