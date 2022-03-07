const express = require("express");
const admin = require("firebase-admin");

const accountSid =process.env.TWILIO_ACCOUNT_SID;
const authToken  =process.env.TWILIO_TOKEN
const client = require("twilio")(accountSid, authToken);

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
  //try {
  
  const phoneNumbers = req.body;
  
client.messages
.create({body: 'Hi there', from: '+15017122661', to: '+15558675310'})
.then(message => console.log(message.sid)); 

   await Promise.all(
     phoneNumbers.map(async (item) => {
        
     await  client.messages
.create({body: 'Hi there', from: '+19108125708', to: item})
       .then(message =>   
        
       { const id = userRef1.push().key;
      userRef1.child(id).set({
        phoneNumber: item,
        unused: true,
      });}
      
      
      )
       .catch(error => console.log(error))
   
       
    
      }),
    );


  return res.status(200).json({
    message: "Phone Numbers added Successfully",
  }); 
});

module.exports = Router;
