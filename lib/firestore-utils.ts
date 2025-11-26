import { db } from "./firebase";
import { 
  collection, 
  addDoc,
  setDoc,
  getDocs, 
  getDoc, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
  Timestamp,
  DocumentData,
  QueryConstraint,
  Unsubscribe
} from "firebase/firestore";

/**
 * Add a document to a collection with auto-generated ID
 * @param collectionName - Name of the collection
 * @param data - Data to add
 * @returns Document ID
 */
export async function addDocument(collectionName: string, data: any) {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    console.log("Document written with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding document:", error);
    throw error;
  }
}

/**
 * Set a document with a specific ID (creates or overwrites)
 * @param collectionName - Name of the collection
 * @param documentId - ID of the document
 * @param data - Data to set
 * @param merge - If true, merge with existing data instead of overwriting
 */
export async function setDocument(
  collectionName: string, 
  documentId: string, 
  data: any,
  merge: boolean = false
) {
  try {
    const docRef = doc(db, collectionName, documentId);
    await setDoc(docRef, data, { merge });
    console.log("Document set successfully with ID:", documentId);
    return documentId;
  } catch (error) {
    console.error("Error setting document:", error);
    throw error;
  }
}

/**
 * Get all documents from a collection
 * @param collectionName - Name of the collection
 * @returns Array of documents with their IDs
 */
export async function getAllDocuments(collectionName: string) {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const documents: Array<{ id: string; data: DocumentData }> = [];
    
    querySnapshot.forEach((doc) => {
      documents.push({
        id: doc.id,
        data: doc.data()
      });
    });
    
    return documents;
  } catch (error) {
    console.error("Error getting documents:", error);
    throw error;
  }
}

/**
 * Get a single document by ID
 * @param collectionName - Name of the collection
 * @param documentId - ID of the document
 * @returns Document data or null if not found
 */
export async function getDocument(collectionName: string, documentId: string) {
  try {
    const docRef = doc(db, collectionName, documentId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        data: docSnap.data()
      };
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error getting document:", error);
    throw error;
  }
}

/**
 * Update a document
 * @param collectionName - Name of the collection
 * @param documentId - ID of the document
 * @param data - Data to update
 */
export async function updateDocument(collectionName: string, documentId: string, data: any) {
  try {
    const docRef = doc(db, collectionName, documentId);
    await updateDoc(docRef, data);
    console.log("Document updated successfully");
  } catch (error) {
    console.error("Error updating document:", error);
    throw error;
  }
}

/**
 * Delete a document
 * @param collectionName - Name of the collection
 * @param documentId - ID of the document
 */
export async function deleteDocument(collectionName: string, documentId: string) {
  try {
    const docRef = doc(db, collectionName, documentId);
    await deleteDoc(docRef);
    console.log("Document deleted successfully");
  } catch (error) {
    console.error("Error deleting document:", error);
    throw error;
  }
}

/**
 * Query documents with conditions
 * @param collectionName - Name of the collection
 * @param constraints - Array of query constraints
 * @returns Array of matching documents
 */
export async function queryDocuments(collectionName: string, ...constraints: QueryConstraint[]) {
  try {
    const q = query(collection(db, collectionName), ...constraints);
    const querySnapshot = await getDocs(q);
    const documents: Array<{ id: string; data: DocumentData }> = [];
    
    querySnapshot.forEach((doc) => {
      documents.push({
        id: doc.id,
        data: doc.data()
      });
    });
    
    return documents;
  } catch (error) {
    console.error("Error querying documents:", error);
    throw error;
  }
}

/**
 * Listen to a single document in real-time
 * @param collectionName - Name of the collection
 * @param documentId - ID of the document
 * @param callback - Function to call when document changes
 * @returns Unsubscribe function
 */
export function subscribeToDocument(
  collectionName: string,
  documentId: string,
  callback: (data: { id: string; data: DocumentData } | null) => void
): Unsubscribe {
  const docRef = doc(db, collectionName, documentId);
  
  return onSnapshot(
    docRef,
    (docSnap) => {
      if (docSnap.exists()) {
        callback({
          id: docSnap.id,
          data: docSnap.data()
        });
      } else {
        callback(null);
      }
    },
    (error) => {
      console.error("Error in document snapshot:", error);
    }
  );
}

/**
 * Listen to a collection in real-time
 * @param collectionName - Name of the collection
 * @param callback - Function to call when collection changes
 * @param constraints - Optional query constraints
 * @returns Unsubscribe function
 */
export function subscribeToCollection(
  collectionName: string,
  callback: (documents: Array<{ id: string; data: DocumentData }>) => void,
  ...constraints: QueryConstraint[]
): Unsubscribe {
  const q = constraints.length > 0 
    ? query(collection(db, collectionName), ...constraints)
    : collection(db, collectionName);
  
  return onSnapshot(
    q,
    (querySnapshot) => {
      const documents: Array<{ id: string; data: DocumentData }> = [];
      querySnapshot.forEach((doc) => {
        documents.push({
          id: doc.id,
          data: doc.data()
        });
      });
      callback(documents);
    },
    (error) => {
      console.error("Error in collection snapshot:", error);
    }
  );
}

// Export Firestore functions for direct use
export { 
  db, 
  collection, 
  addDoc,
  setDoc,
  getDocs, 
  getDoc, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  onSnapshot,
  serverTimestamp,
  Timestamp
};

