/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { database } from "../firebase";

const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

exports.getmatch = onRequest(async (request, response) => {
  const uid = request.uid;
  const match = get(ref(database, "users/" + uid)).then((snapshot) => {
    console.log(snapshot.val());
  });
  response.send("test");
});

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
