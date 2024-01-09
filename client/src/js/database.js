import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

export const putDb = async (id, content) => {
  try {
    console.log("ADD to the Database");
    let jateTextDB = await openDB("jate", 1);
    let tx = jateTextDB.transaction("jate", "readwrite");
    let store = tx.objectStore("jate");
    let req = store.put({ id: id, text: content });
    let result = await req;
    console.log("Content saved to the database", result);
  } catch (error) {
    console.error("putDb not implemented", error);
  }
};

export const getDb = async () => {
  try {
    console.log("GET all content from database");
    let jateTextDB = await openDB("jate", 1);
    let tx = jateTextDB.transaction("jate", "readonly");
    let store = tx.objectStore("jate");
    let req = store.getAll();
    let result = await req;
    console.log("All content from Database", result);
    return result;
  } catch (error) {
    console.error("getDb not implemented", error);
  }
};

initdb();
