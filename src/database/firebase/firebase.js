//firebase
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

//authorizeFields
import authorizeFields from "./authorizeFields";

//init
import { sourceCredentials, destinationCredentials } from "./credentials";
firebase.initializeApp(sourceCredentials);

//subscribe
/**
 * (Firebase) Subscribes user to firebase collection
 * @param collection - collection name
 * @param setCollection - set state for collection
 * @param authGroup - authorized user group
 * @return Function - unsubscribe function
 */
export const doSubscribe = async (collectionName, setCollection, authGroup) => {
    //console.log("collectionName", collectionName)
    const unsubscribe = await firebase
        .firestore()
        .collection(collectionName).orderBy("index")
        .onSnapshot((snapShot) => {
            const newCollection = snapShot.docs.map((document) => {
                let data = authorizeFields(collectionName, document.data(), authGroup);
                //let data = document.data();
                return {
                    id: document.id,
                    ...data
                }
            });
            setCollection(newCollection);
            //console.log("onSnapshot:", collectionName, newCollection);
        });
    //console.log("subscribed", collectionName);
    return unsubscribe;
}

//insert
/**
 * (Firebase) Insert document into collection
 * @param collection - collection name
 * @param document - new document to be inserted
 */
export const doInsert = (collectionName, document) => {
    delete document.id;
    firebase
        .firestore()
        .collection(collectionName)
        .doc()
        .set(document);
}

//update
/**
 * (Firebase) Update document for collection
 * @param collection - collection name
 * @param document - modified document to be updated
 */
export const doUpdate = (collectionName, document) => {
    firebase
        .firestore()
        .collection(collectionName)
        .doc(document.id)
        .update(document);
}

//delete
/**
 * (Firebase) Deletes document from collection
 * @param collection - collection name
 * @param document - document to be deleted
 */
export const doDelete = (collectionName, document) => {
    firebase
        .firestore()
        .collection(collectionName)
        .doc(document.id)
        .delete();
}

//permission
/**
 * (Firebase) Get user authGroup
 * @param setUser - set user authGroup
 * @param uid - unique user id
 */
export const doPermission = (setUser, uid) => {
    let permission = firebase
        .firestore()
        .collection("permission");
    /*let query = */permission.where("uid", "==", uid).get()
        .then(snapshot => {
            if (snapshot.empty) {
                //console.log("No matching documents.");
                setUser("guest");
            }
            else {
                //console.log("Found document.");
                let document;
                snapshot.forEach(snap => {
                    document = snap.data();
                });
                setUser(document.group);
            }
        })
        .catch(err => {
            //console.log("Error getting documents", err);
            setUser("guest");
        });

    return;
}

//status
/**
 * (Firebase) Eventlistener for auto user login or logout
 * @param setUser - set user authGroup
 */
export const doListen = (setUser) => {
    firebase
        .auth()
        .onAuthStateChanged(user => {
            if (user) {
                //console.log("listen - user logged in", user.uid)
                doPermission(setUser, user.uid);
            }
            else {
                //console.log("listen - user logged out")
                setUser("guest");
            }
        });
}

//login
/**
 * (Firebase) Perform manual user login
 * @param username - user email address
 * @param password - user password
 * @param onSuccess - callback function on success
 * @param onFail - callback function on fail
 */
export const doLogin = (username, password, onSuccess, onFail) => {
    firebase
        .auth()
        .signInWithEmailAndPassword(username, password)
        .then(user => {
            if (user) {
                //console.log("user logged in")
                window.document.location.reload();
                return user;
            }
            else {
                //console.log("user logged out")
                return user;
            }
        })
        .catch(err => {
            //console.log("error:", err);
            onFail(err.message);
        });
}

//logout
/**
 * (Firebase) Perform manual user logout
 */
export const doLogout = () => {
    firebase
        .auth()
        .signOut()
        .then(() => {
            window.document.location.reload();
        });
}

//upload
/**
 * (Firebase) Perform file upload to store
 * @param folder - store folder path
 * @param filename - store file name
 * @param file - file to upload
 * @param onSuccess - callback function on success
 */
export const doUpload = (folder, filename, file, onSuccess) => {
    const uploadProgress = firebase
        .storage()
        .ref(`${folder}/${filename}`)
        .put(file);


    uploadProgress.on("state_changed",
        (progress) => console.log("progress", progress),
        (error) => console.log("error", error),
        (complete) => {
            console.log("upload complete", complete)
            firebase
                .storage()
                .ref(folder)
                .child(filename)
                .getDownloadURL()
                .then(url => onSuccess ? onSuccess(url) : false)
                .catch((error) => console.log("error", error));
        }
    );
}

//drop
/**
 * (Firebase) Perform file delete from store
 * @param folder - store folder path
 * @param filename - store file name
 * @param onSuccess - callback function on success
 */
export const doDrop = (folder, filename, onSuccess) => {
    const file = firebase
        .storage()
        .ref(`${folder}/${filename}`);

    file.delete()
        .then((props) => onSuccess ? onSuccess(true) : false)
        .catch((error) => {
            console.log("error", error);
            if (onSuccess) {
                onSuccess(true);
            }
        });
}

//export
/**
 * (Firebase) Perform database duplication
 */
export const doExport = () => {
    const sourceAdmin = firebase.initializeApp(sourceCredentials, "export");
    const dumped = {};

    /* this schema is how your DB is organized in a tree structure. You don"t have to care about the Documents
      but you do need to inform the name of your collections and any subcollections, in this
      case we have two collections called users and groups, the all have their documents, but 
      the collection users has its own subcollections, friends and groups, which again have their
      own subcollection, messages.

      const schema = {
          users: {
              friends: {
                  messages: {},
              },
              groups: {
                  messages: {},
              },
          },
          groups: {},
      };
    */

    const schema = {
        biography: {},
        education: {},
        employment: {},
        hobby: {},
        permission: {},
        portfolio: {},
        //request: {}
    };

    const db = sourceAdmin.firestore();
    const dump = (dbRef, aux, curr) => {
        return Promise.all(Object.keys(aux).map((collection) => {
            return dbRef.collection(collection).get()
                .then((data) => {
                    let promises = [];
                    data.forEach((doc) => {
                        const data = doc.data();
                        if (!curr[collection]) {
                            curr[collection] = {
                                data: {},
                                type: "collection",
                            };
                            curr[collection].data[doc.id] = {
                                data,
                                type: "document",
                            }
                        } 
                        else {
                            curr[collection].data[doc.id] = data;
                        }
                        promises.push(dump(dbRef.collection(collection).doc(doc.id), aux[collection], curr[collection].data[doc.id]));
                    })
                    return Promise.all(promises);
                });
        })).then(() => {
            return curr;
        })
    };

    const aux = { ...schema };
    const answer = {};
    dump(db, aux, answer).then((answer) => {
        console.log(JSON.stringify(answer, null, 4));
    });
}

//duplicate
/**
 * (Firebase) Perform database duplication
 */
export const doDuplicate = () => {

    const sourceAdmin = firebase.initializeApp(sourceCredentials, "source");
    const destinationAdmin = firebase.initializeApp(destinationCredentials, "destination");

    /* this schema is how your DB is organized in a tree structure. You don"t have to care about the Documents
      but you do need to inform the name of your collections and any subcollections, in this
      case we have two collections called users and groups, the all have their documents, but 
      the collection users has its own subcollections, friends and groups, which again have their
      own subcollection, messages.

      const schema = {
          users: {
              friends: {
                  messages: {},
              },
              groups: {
                  messages: {},
              },
          },
          groups: {},
      };
    */

    const schema = {
        biography: {},
        education: {},
        employment: {},
        hobby: {},
        permission: {},
        portfolio: {},
        //request: {}
    };

    const source = sourceAdmin.firestore();
    const destination = destinationAdmin.firestore();
    const aux = { ...schema };

    const copy = (sourceDBrep, destinationDBref, aux) => {
        return Promise.all(Object.keys(aux).map((collection) => {
            return sourceDBrep.collection(collection).get()
                .then((data) => {
                    let promises = [];
                    data.forEach((doc) => {
                        const data = doc.data();
                        promises.push(
                            destinationDBref.collection(collection).doc(doc.id).set(data).then((data) => {
                                return copy(
                                    sourceDBrep.collection(collection).doc(doc.id),
                                    destinationDBref.collection(collection).doc(doc.id),
                                    aux[collection]
                                );
                            })
                        );
                    });
                    return Promise.all(promises);
                });
        }));
    };

    copy(source, destination, aux).then(() => {
        console.log("copied");
    });
}