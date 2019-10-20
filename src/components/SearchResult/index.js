import React from "react";
import { useSelector } from "react-redux";
import Button from "../Button";

import "./styles.css";

export default () => {
  const { loading, result } = useSelector(state => state.search);
  return (
    <>
      <div className="search-result">
        {loading ? (
          <span className="preloader">Loading...</span>
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
                      <td className="table__td">{title}</td>
                      <td className="table__td">{answer_count}</td>
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
      </div>
    </>
  );
};
