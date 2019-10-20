import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../Button";
import Notification from "../Notification";

import "./styles.css";

export default () => {
  const { loading, error, result = [] } = useSelector(state => state.search);
  return (
    <>
      <div className="search-result">
        <h2>Search results</h2>
        {loading ? (
          <Notification name="Loading ..." className="notification--loading" />
        ) : (
          <div className="search-result__table">
            <table className="table">
              <thead>
                <tr className="table__tr">
                  <th className="tablet__th">Author</th>
                  <th className="tablet__th">Theme</th>
                  <th className="tablet__th">Number of responses</th>
                  <th className="tablet__th">Tags</th>
                </tr>
              </thead>
              <tbody>
                {result.map(item => {
                  const {
                    owner: { display_name },
                    question_id,
                    title,
                    answer_count,
                    tags
                  } = item;
                  return (
                    <tr key={question_id.toString()} className="table__tr">
                      <td className="table__td">
                        <Button className="button--author">
                          {display_name}
                        </Button>{" "}
                      </td>
                      <td className="table__td">
                        <Link to={`/answers/${question_id}`}>{title}</Link>
                      </td>
                      <td className="table__td">
                        <Link to={`/answers/${question_id}`}>
                          {answer_count}
                        </Link>
                      </td>
                      <td className="table__td">
                        {tags
                          .map(tag => (
                            <Button key={tag} className="button--tag">
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
          </div>
        )}

        {error ? (
          <Notification
            name="Oops, something went wrong!"
            linkName="Please try again"
            linkTo="/"
            className="notification--error"
          />
        ) : (
          !loading &&
          result.length === 0 && (
            <Notification
              name="No results were found for your request!"
              linkName="Please try again"
              linkTo="/"
              className="notification--notice"
            />
          )
        )}
      </div>
    </>
  );
};
