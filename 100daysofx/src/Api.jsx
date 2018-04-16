
const getEntries = () => {
    return fetch("/api/entries", {
        method: "GET",
    });
}

const newEntry = (entry) => {
    return fetch("/api/new_entry", {
        method: "POST",
        body: JSON.stringify(entry),
        headers: {
            "content-type": "application/json",
            "Accept" : "application/json",
        }
    });
}

const updateEntry = (entry) => {
    return fetch("/api/update_entry", {
        method: "PATCH",
        body: JSON.stringify(entry),
        headers: {
            "content-type" : "application/json"
        }
    });
}

const deleteEntry = (id) => {
    return fetch(`/api/delete_entry/${id}`, {
        method: "DELETE"
    });
}

export default{
    getEntries,
    newEntry,
    updateEntry,
    deleteEntry
};

