(function(){
  const firebaseConfig = {
    apiKey: "AIzaSyDvOaZAYHA2OeLfclc1mDY9O6d96AlJ_YE",
    authDomain: "zeroeka-81e07.firebaseapp.com",
    projectId: "zeroeka-81e07",
    storageBucket: "zeroeka-81e07.firebasestorage.app",
    messagingSenderId: "73293690559",
    appId: "1:73293690559:web:b963b77c1c69264823f80a",
    measurementId: "G-7G3BDK35WS"
  };
  try {
    if (!window.firebase) {
      console.error('Firebase SDK not loaded');
      return;
    }
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  } catch (e) {
    console.error('Firebase init failed', e);
  }

  const successBox = document.getElementById('successMessage');
  const errorBox = document.getElementById('errorMessage');
  function show(msg, el){ if(!el) return; el.style.display='block'; el.textContent = msg; setTimeout(()=>{el.style.display='none'}, 5000); }

  const btn = document.getElementById('google-btn');
  if (btn) {
    btn.addEventListener('click', () => {
      try {
        chrome.runtime.sendMessage({ type: 'start-google-login' }, async (resp) => {
          if (resp && resp.id_token) {
            try {
              const cred = firebase.auth.GoogleAuthProvider.credential(resp.id_token);
              const userCred = await firebase.auth().signInWithCredential(cred);
              const user = userCred.user;
              const token = await user.getIdToken();
              chrome.storage.local.set({ firebaseUser: { uid: user.uid, email: user.email }, firebaseIdToken: token }, () => {
                show('Signed in. Redirecting…', successBox);
                setTimeout(()=>{ window.location.href = 'https://chatgpt.com/'; }, 600);
              });
            } catch (e) {
              console.error(e);
              show('Firebase sign-in failed: ' + (e && e.message ? e.message : 'Unknown error'), errorBox);
            }
          } else {
            show('Google login canceled or failed.', errorBox);
          }
        });
      } catch (e) {
        console.error('launchWebAuthFlow error', e);
        show('Unable to start Google Sign-In: ' + (e && e.message ? e.message : 'Unknown error'), errorBox);
      }
    });
  }

  try {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setTimeout(()=>{ window.location.href = 'https://chatgpt.com/'; }, 200);
      }
    });
  } catch (e) {}
})();

