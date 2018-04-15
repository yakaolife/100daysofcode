import React from 'react';

const Entry = ({id, title, date, content, onDelete}) => {
    return (
        <div className="entry">
            <div className="entry-body">
                {date}
                <h1>{title}</h1>
                <p>{content}</p>
                <button onClick={(e) => onDelete(id)}>Delete</button>
            </div>
        </div>);
}
export default Entry;
