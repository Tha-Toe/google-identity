import "./App.css";
import { useScript } from "./hook/useScript";
import jwt_decode from "jwt-decode";
import { useRef, useState } from "react";
function App() {
  const googleButtonRef = useRef(null);
  const [user, setUser] = useState(null);

  const onGoogleSignIn = (user) => {
    let userCred = user.credential;
    let payload = jwt_decode(userCred);
    setUser(payload);
  };

  useScript("https://accounts.google.com/gsi/client", () => {
    window.google.accounts.id.initialize({
      client_id:
        "555618407648-lkittruvsnt5jr327s088990pgv3bi9t.apps.googleusercontent.com",
      callback: onGoogleSignIn,
      auto_select: false,
    });

    window.google.accounts.id.renderButton(googleButtonRef.current, {
      size: "medium",
    });
  });

  return (
    <div className="App">
      <h1>Google Identity Method</h1>
      {!user && <div ref={googleButtonRef}></div>}{" "}
      {user && (
        <div>
          <h1>{user.name}</h1>
          <img src={user.picture} />
          <p>{user.email}</p>
          <button
            style={{ marginTop: "50px", padding: "20px 40px" }}
            onClick={() => {
              setUser(null);
            }}
          >
            LogOut
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
