import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, googleProvider } from "./firebase";

export const signInWithGoogle = async () => {
  try {
    return signInWithPopup(auth, googleProvider);
  } catch (error) {
    console.error(error);
  }
};

export const doCreateUserWithEmailAndPassword = async (email, password) => {
  try {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    return { user: user, error: null };
  } catch (error) {
    let errorMessage = "An error occurred. Please try again later.";
    if (error.code === "auth/email-already-in-use") {
      errorMessage =
        "The email address is already in use by another account. Please choose a different email address.";
    }
    if (error.code === "auth/invalid-email") {
      errorMessage = "Invalid Email.";
    }
    return { user: null, error: errorMessage };
  }
};

export const doSignInWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return { user: userCredential.user, error: null };
  } catch (error) {
    let errorMessage = "An error occurred. Please try again later.";
    if (error.code === "auth/invalid-credential") {
      errorMessage = "Invalid email or password. Please try again.";
    } else if (error.code === "auth/too-many-requests") {
      errorMessage = "Login attempts exceeded. Please try again later.";
    }
    return { user: null, error: errorMessage };
  }
};
export const resetPassword = async (email) => {
  if (email.trim().length === 0)
    return alert("Registered email required for password reset.");
  try {
    await sendPasswordResetEmail(auth, email);
    return { user: true, error: null };
  } catch (error) {
    return { user: null, error: "An error occurred. Please try again later." };
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error(error);
  }
};
