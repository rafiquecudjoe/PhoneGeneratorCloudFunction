const express = require("express");
const admin = require("firebase-admin");

// const accountSid = "AC0d8955873324a1520e5d41c29032e7d1";
// const authToken = "382f6bb4260a7ae2ddd809731bcb8e8f";
// const client = require("twilio")(accountSid, authToken);

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://phonegenerator-3ba72-default-rtdb.firebaseio.com/",
});

const Router = express();

const database = admin.database();
const userRef1 = database.ref("/unusedNumbers");
const userRef2 = database.ref("/nonWorkingNumbers");
const userRef3 = database.ref("/workingNumbers");

Router.post("/api/add-NonWorkingNumber", async (req, res) => {
  
  if (req.body === undefined ||  Object.keys(req.body).length === 0) {
    return res.status(200).json({
      message: "Bad Request",

    });
  }


  const hy = Object.keys(req.body);

  const hg = hy.toString();

  userRef1.child(hg).remove();

  const newdata = Object?.values(req.body);

  const number = newdata[0].phoneNumber;

  const id = userRef2.push().key;
  await userRef2.child(id).set({
    phoneNumber: number,
    unused: true,
  });

  return res.status(200).json({
    message: "success",

  });
});

Router.post("/api/add-WorkingNumber", async (req, res) => {


  if (req.body === undefined || Object.keys(req.body).length === 0 ) {
    return res.status(200).json({
      message: "Bad Request",

    });
  }
  const hy = Object.keys(req.body);

  const hg = hy.toString();

  userRef1.child(hg).remove();

  const newdata = Object?.values(req.body);

  const number = newdata[0].phoneNumber;

  const id = userRef3.push().key;
  await userRef3.child(id).set({
    phoneNumber: number,
    unused: true,
  });

  return res.status(200).json({
    message: "success",

  });
});

Router.get("/api/get-phoneNumber", (req, res) => {
  let data;
  userRef1.orderByKey().limitToFirst(1).on("value", (snapshot) => {
    data = (snapshot.val());
  });

  res.status(200).json({
    message: "success",
    data,
  });
});

Router.post("/api/add-phoneNumbers", async (req, res) => {
  try {
    const phoneNumbers = req.body;

    /* eslint-disable-next-line */
    for (const value of phoneNumbers) {
      //             try {
      //                  response = await client.messages.create({
      //      body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
      //      from: '+19108125708',
      //      to: value
      //    })

      //             } catch (error) {
      //                 console.log(error)
      //             }

      const id = userRef1.push().key;
      userRef1.child(id).set({
        phoneNumber: value,
        unused: true,
      });
    }
  } catch (error) {
    console.log(error);
  }

  return res.status(200).json({
    message: "Phone Numbers added Successfully",
  });
});

module.exports = Router;
