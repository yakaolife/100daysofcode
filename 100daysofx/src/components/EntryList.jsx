import React from 'react';
import List from './List';
import EntryForm from './EntryForm';

const EntryList = ({list, onDelete, onSubmit}) => {
    const lists = list.map(l => <EntryForm key={l.id} onDelete={onDelete} onSubmit={onSubmit} entry={l}/>);
    return (<List list={lists} name="entry-list"/>);
}

export default EntryList;