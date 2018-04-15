import React from 'react';

const List = ({list, name}) => {
    return (
        <div className={name}>
            {list}
        </div>
    );
}

export default List;