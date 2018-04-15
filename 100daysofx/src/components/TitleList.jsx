import React from 'react';
import List from './List';

const TitleList = ({list}) => {
    const lists = list.map(l => <li key={l.id}>{l.title}</li>);
    return (<List list={lists} name="title-list"/>);
}

export default TitleList;