import { 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  doc, 
  onSnapshot,
  query,
  orderBy 
} from "firebase/firestore";
import { db } from "./config";

// --- PRODUCT SERVICES ---
export const getProducts = (callback) => {
  const q = query(collection(db, "products"), orderBy("title"));
  return onSnapshot(q, (snapshot) => {
    const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(products);
  });
};

export const addProduct = async (product) => {
  return await addDoc(collection(db, "products"), product);
};

export const updateProduct = async (id, data) => {
  const docRef = doc(db, "products", id);
  return await updateDoc(docRef, data);
};

export const deleteProduct = async (id) => {
  return await deleteDoc(doc(db, "products", id));
};

// --- TESTIMONIAL SERVICES ---
export const getTestimonials = (callback) => {
  const q = query(collection(db, "testimonials"), orderBy("timestamp", "desc"));
  return onSnapshot(q, (snapshot) => {
    const reviews = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(reviews);
  });
};

export const addTestimonial = async (review) => {
  return await addDoc(collection(db, "testimonials"), {
    ...review,
    timestamp: new Date().toISOString(),
    status: 'Pending' // Initial status for moderation
  });
};

// --- BOOKING SERVICES ---
export const getBookings = (callback) => {
  const q = query(collection(db, "reservations"), orderBy("dateTime", "desc"));
  return onSnapshot(q, (snapshot) => {
    const bookings = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(bookings);
  });
};

export const addBooking = async (booking) => {
  return await addDoc(collection(db, "reservations"), {
    ...booking,
    status: 'Syncing',
    createdAt: new Date().toISOString()
  });
};
