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
    const jateTextDB = await openDB("jate", 1);
    const tx = jateTextDB.transaction("jate", "readwrite");
    const store = tx.objectStore("jate");
    const req = store.put({ id: id, value: content });
    const result = await req;
    console.log("Content saved to the database", result);
  } catch (error) {
    console.error("putDb not implemented", error);
  }
};

export const getDb = async () => {
  try {
    console.log("GET all content from database");
    const jateTextDB = await openDB("jate", 1);
    const tx = jateTextDB.transaction("jate", "readonly");
    const store = tx.objectStore("jate");
    const req = store.getAll();
    const result = await req;
    console.log("All content from Database", result);
    return result;
  } catch (error) {
    console.error("getDb not implemented", error);
  }
};

initdb();
