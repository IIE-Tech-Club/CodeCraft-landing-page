import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  GoogleAuthProvider, 
  signInWithPopup, 
  sendPasswordResetEmail,
  onAuthStateChanged
} from "firebase/auth";
import { auth } from "../firebase/firebase";

export const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("User created:", user);
    return { user };
  } catch (error) {
    console.error(error.message);
    return { error: error.message };
  }
};

export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("Logged in:", user);
    return { user };
  } catch (error) {
    console.error(error.message);
    return { error: error.message };
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    console.log("Logged out");
    window.location.href = "/";
  } catch (error) {
    console.error(error.message);
  }
};

export const googleLogin = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log("Google user:", user);
    return { user };
  } catch (error) {
    console.error(error.message);
    return { error: error.message };
  }
};

export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    console.log("Password reset email sent");
    return { success: true };
  } catch (error) {
    console.error(error.message);
    return { error: error.message };
  }
};

export const subscribeToAuthChanges = (callback) => {
  return onAuthStateChanged(auth, callback);
};
