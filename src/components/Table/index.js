import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import Modal from "../Modal";
import Button from "../Button";
import { getTopFaqs } from "../../store/actions/faqs";

import "./styles.css";

export default ({ bodyData, fromLocation }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const dispatch = useDispatch();

  const handleTag = event => {
    setIsOpenModal(true);
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
              owner: { display_name },
              question_id,
              title,
              answer_count,
              tags
            } = item;
            return (
              <tr key={question_id.toString()} className="table__tr">
                <td>
                  <Button className="button--author">{display_name}</Button>
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
                  <Link to={`/answers/${question_id}`}>{answer_count}</Link>
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
      {isOpenModal && <Modal modalClose={() => setIsOpenModal(false)} />}
    </>
  );
};
