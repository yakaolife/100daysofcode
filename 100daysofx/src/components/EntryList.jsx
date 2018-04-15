import React from 'react';
import List from './List';
import Entry from './Entry';

const EntryList = ({list, onDelete}) => {
    const lists = list.map(l => <Entry key={l.id} onDelete={onDelete} {...l}/>);
    return (<List list={lists} name="entry-list"/>);
}

export default EntryList;