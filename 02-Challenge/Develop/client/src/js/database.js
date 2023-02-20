import { openDB } from 'idb';

const DB_NAME = 'jate';
const DB_VERSION = 1;
const OBJECT_STORE_NAME = 'jate';

const initdb = async () => {
  await openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(OBJECT_STORE_NAME)) {
        db.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'id', autoIncrement: true });
        console.log('jate database created');
      } else {
        console.log('jate database already exists');
      }
    },
  });
};
//Todo add addcontent do database function
const addContentToDatabase = async (content) => {
  const db = await openDB(DB_NAME, DB_VERSION);
  const tx = db.transaction(OBJECT_STORE_NAME, 'readwrite');
  const store = tx.objectStore(OBJECT_STORE_NAME);
  await store.add(content);
  await tx.complete;

  console.log(`Added content to ${OBJECT_STORE_NAME} object store:`, content);
};
//Todo add getvontent do database function
const getAllContentFromDatabase = async () => {
  const db = await openDB(DB_NAME, DB_VERSION);
  const tx = db.transaction(OBJECT_STORE_NAME, 'readonly');
  const store = tx.objectStore(OBJECT_STORE_NAME);
  const content = await store.getAll();
  await tx.complete;

  console.log(`Retrieved all content from ${OBJECT_STORE_NAME} object store:`, content);
  return content;
};

export const putDb = addContentToDatabase;
export const getDb = getAllContentFromDatabase;

initdb();
