import React from "react";
import { Link } from "react-router-dom";
const Table = ({ Event, Start, End, Duration, Id, Link }) => {
  return (
    <div>
      <div className="datatable-container">
        <table className="datatable">
          <thead>
            <tr>
              <th>Event</th>
              <th>Start</th>
              <th>End</th>
              <th>Duration</th>
              <th>id</th>
              <th>Link</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>{Event}</td>
              <td>{Start}</td>
              <td>{End}</td>
              <td>{Duration}</td>
              <td>{Id}</td>
              <td>{Link}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
