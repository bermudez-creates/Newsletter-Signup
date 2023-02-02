//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const htpps = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html");
});


app.post("/", (req, res) => {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;
  
    const data = {
        members : [
            {
                email_address : email,
                status : "subscribed",
                merge_fields : {
                    FNAME : firstName,
                    LNAME : lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);
    const url = "https://us21.api.mailchimp.com/3.0/lists/9d4c23d233"
    const options = {
        method: "POST",
        auth: "steezy:9b1c6ae2722f87218757f28c4b379632-us21"
    }

const request = htpps.request(url, options, function(response) {

    if (response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html");
        }
        else { 
            res.sendFile(__dirname + "/failure.html");
        }

    response.on("data", function(data) {
        console.log(JSON.parse(data));
    });
  
    });

    request.write(jsonData);
    request.end();
});

app.post("/failure", function(req, res)  {
    res.redirect("/");
});



app.listen(process.env.PORT || 3000, function(res,req) {
    console.log("Server running");
});

// 9b1c6ae2722f87218757f28c4b379632-us21
// 9d4c23d233