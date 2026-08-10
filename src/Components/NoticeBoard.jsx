import React from "react";
import "../StyleSheets/NoticeBoard.css";

const NoticeBoard = ({  }) => {
  const notices =
      [
      "Placement drive: Company A on 2026-08-15.",
      "Resume submission deadline: 2026-08-10.",
      "Workshop on interview skills: 2026-08-12.",
      "owkeknfnfnfn hhfhf vvvv  ghghghjg   jghjghg "
    ];
 const noticesList = [...notices, ...notices]
  return (
    <aside className="notice-board" aria-label="Notice Board">
      <h2>Notice Board</h2>
      <div className="notice-board-content">
        <ul>
          {noticesList.map((notice, index) => (
            <li key={index}>{notice}</li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default NoticeBoard;