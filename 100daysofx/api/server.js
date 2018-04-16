const express = require("express");
const bodyParser = require("body-parser");
const moment = require("moment");
const sqlite = require("sqlite3").verbose();
const db = new sqlite.Database("100daysofx.db");

db.serialize(() => {
    db.run(
        "CREATE TABLE IF NOT EXISTS entry(\
            id INTEGER PRIMARY KEY,\
            title TEXT NOT NULL,\
            content TEXT NOT NULL,\
            date TEXT NOT NULL)"
        );
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT || 5000;

// Helper function
const prepareCB = (name, error) => {
    if (error) {
        console.log(`Error preparing ${name}: ${error}`);
        response.status(500).send("Error: ", error);
    } else {
        console.log(`Preparing ${name} success`);
    }
};

// const returnCB = (command, response, error, rows) => {
//     if (error) {
//         response.status(500).send("Error: ", error);
//     } else if (rows) {
//         response.send(rows);
//     } else {

//     }
// }

app.get('/api/entries', (request, response) => {
    console.log("/entries");
    db.all("SELECT * FROM entry", (error, rows) => {
        if (error) {
            response.status(500).send("Error: ", error);
        } else {
            response.send(rows);
        }
    });
});


app.post('/api/new_entry', (request, response) => {
    console.log("/new_entry");
    console.log("Request body", request.body);
    const currentDate = moment().format("MM/DD/YYYY");
    db.prepare("INSERT INTO entry VALUES(NULL,?, ?, ?)", [request.body.title, request.body.content, currentDate], prepareCB)
    .run([], (error, row) => {
        console.log("server run db");
        if (error) {
            console.log("Error running /new_entry: ", error);
            response.status(500).send("Error: ", error);
        } else {
            // TODO send back what we just created?
            console.log("good?");
            response.send(JSON.stringify({
                status: "success",
            }));
        }
    });
});

app.delete('/api/delete_entry/:id', (request, response) => {
    console.log("SERVER: /delete_entry with id:", request.params.id);
    // console.log(request);
    db.prepare("DELETE FROM entry where id=?", [request.params.id], prepareCB)
    .run([], (error, row) => {
        if (error) {
            console.log("Error running /delete_entry: ", error);
            response.status(500).send("Error: ", error);
        } else {
            response.send(JSON.stringify({
                status: "success",
            }));
        }
    })
});

app.patch('/api/update_entry/:id', (request, response) => {
    console.log("SERVER: /update_entry with id:", request.params.id);
    db.prepare("UPDATE entry SET title=?, content=? WHERE id=?", 
        [request.body.title, request.body.content, request.body.id], prepareCB)
    .run([], (error, row) => {
        if (error) {
            console.log("Error running /update_entry: ", error);
            response.status(500).send("Error: ", error);
        } else {
            response.send(JSON.stringify({
                status: "success",
            }));
        }
    });
});

app.listen(port, () => console.log("Listening in port ", port));
