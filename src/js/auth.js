import { auth } from './firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

// Toggle between login and register forms
window.toggleForms = function() {
    document.getElementById('loginForm').classList.toggle('hidden');
    document.getElementById('registerForm').classList.toggle('hidden');
    clearMessages();
};

// Clear messages
function clearMessages() {
    document.getElementById('loginError').classList.remove('show');
    document.getElementById('registerError').classList.remove('show');
    document.getElementById('loginSuccess').classList.remove('show');
    document.getElementById('registerSuccess').classList.remove('show');
}

// Show error message
function showError(elementId, message) {
    const errorDiv = document.getElementById(elementId);
    errorDiv.textContent = message;
    errorDiv.classList.add('show');
}

// Show success message
function showSuccess(elementId, message) {
    const successDiv = document.getElementById(elementId);
    successDiv.textContent = message;
    successDiv.classList.add('show');
}

// Login form submission
document.getElementById('loginFormElement').addEventListener('submit', async (e) => {
    e.preventDefault();
    clearMessages();

    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;

    if (!email || !password) {
        showError('loginError', 'Please fill in all fields.');
        return;
    }

    const loginBtn = document.getElementById('loginBtn');
    const loginBtnText = document.getElementById('loginBtnText');
    const spinner = loginBtn.querySelector('.spinner');

    loginBtn.disabled = true;
    loginBtnText.style.display = 'none';
    spinner.style.display = 'inline-block';

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        showSuccess('loginSuccess', 'Login successful! Redirecting...');
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1500);
    } catch (error) {
        let errorMessage = 'Login failed. Please check your credentials.';
        if (error.code === 'auth/user-not-found') {
            errorMessage = 'No account found with this email.';
        } else if (error.code === 'auth/wrong-password') {
            errorMessage = 'Incorrect password.';
        } else if (error.code === 'auth/invalid-email') {
            errorMessage = 'Invalid email address.';
        }
        showError('loginError', errorMessage);
    } finally {
        loginBtn.disabled = false;
        loginBtnText.style.display = 'inline';
        spinner.style.display = 'none';
    }
});

// Register form submission
document.getElementById('registerFormElement').addEventListener('submit', async (e) => {
    e.preventDefault();
    clearMessages();

    const name = document.getElementById('registerName').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirm').value;

    if (!name || !email || !password || !confirmPassword) {
        showError('registerError', 'Please fill in all fields.');
        return;
    }

    if (password !== confirmPassword) {
        showError('registerError', 'Passwords do not match.');
        return;
    }

    if (password.length < 6) {
        showError('registerError', 'Password must be at least 6 characters long.');
        return;
    }

    const registerBtn = document.getElementById('registerBtn');
    const registerBtnText = document.getElementById('registerBtnText');
    const spinner = registerBtn.querySelector('.spinner');

    registerBtn.disabled = true;
    registerBtnText.style.display = 'none';
    spinner.style.display = 'inline-block';

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        
        // Update user profile with display name and redirect to dashboard
        try {
            const { updateProfile } = await import("https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js");
            await updateProfile(userCredential.user, { displayName: name });
        } catch (err) {
            // if updateProfile isn't available, ignore (best-effort)
            console.warn('Could not set display name:', err);
        }

        showSuccess('registerSuccess', 'Account created successfully! Redirecting...');
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1200);
    } catch (error) {
        let errorMessage = 'Registration failed. Please try again.';
        if (error.code === 'auth/email-already-in-use') {
            errorMessage = 'This email is already registered. Try logging in instead.';
        } else if (error.code === 'auth/weak-password') {
            errorMessage = 'Password is too weak. Use at least 6 characters.';
        } else if (error.code === 'auth/invalid-email') {
            errorMessage = 'Invalid email address.';
        }
        showError('registerError', errorMessage);
    } finally {
        registerBtn.disabled = false;
        registerBtnText.style.display = 'inline';
        spinner.style.display = 'none';
    }
});

// Check authentication state
onAuthStateChanged(auth, (user) => {
    if (user && window.location.pathname.includes('login.html')) {
        // User is logged in and on login page, redirect to dashboard
        window.location.href = 'dashboard.html';
    } else if (!user && window.location.pathname.includes('dashboard.html')) {
        // User is not logged in and trying to access dashboard, redirect to login
        window.location.href = 'login.html';
    }
});

// Sign out function
window.signOutUser = async function() {
    try {
        await signOut(auth);
        window.location.href = 'login.html';
    } catch (error) {
        console.error('Sign out failed:', error);
    }
};
