import * as functions from "firebase-functions";
import * as firebase from "firebase-admin";

const db = firebase.firestore();
export const tiggerOnCreate = functions
  .region('asia-southeast2')
  .firestore
  .document('personals/{docId}')
  .onCreate(async (snap, context) => {
    const newValue = snap.data();
    let gender;

    if (newValue.prefix === 'Mr') {
      gender = 'Male'
    } else {
      gender = 'Female'
    }

    const data = {
      'prefix': newValue.prefix,
      'name': newValue.firstName,
      'last_name': newValue.lastName,
      'gender': gender,
      'birth_date': newValue.birthDate,
    };

    await db.collection("register_data").add(data);
  });