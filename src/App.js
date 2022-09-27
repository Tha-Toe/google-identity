import "./App.css";
import { useRef, useState, useEffect } from "react";
import { GoogleLogin, GoogleLogout } from "@leecheuk/react-google-login";
import { gapi } from "gapi-script";

const clientId =
  "555618407648-lkittruvsnt5jr327s088990pgv3bi9t.apps.googleusercontent.com";
function App() {
  const googleButtonRef = useRef(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
  });

  const onSuccess = (res) => {
    console.log("success:", res.profileObj);
    setUser(res.profileObj);
  };
  const onFailure = (err) => {
    console.log("failed:", err);
  };

  const logOut = () => {
    setUser(null);
  };
  return (
    <div className="App">
      <h1>Google Identity Method</h1>
      {!user && (
        <div className="google-container">
          <div style={{ opacity: "0", zIndex: "10" }}>
            <GoogleLogin
              clientId={clientId}
              buttonText="Sign in with Google"
              onSuccess={onSuccess}
              onFailure={onFailure}
              cookiePolicy={"single_host_origin"}
              isSignedIn={true}
            />
          </div>
          <div className="google-button">Log in with google</div>
        </div>
      )}{" "}
      {user && (
        <div>
          <h1>{user.name}</h1>
          <img src={user.imageUrl} />
          <p>{user.email}</p>

          <div className="google-container">
            <div style={{ opacity: "0", zIndex: "10" }}>
              <GoogleLogout
                clientId={clientId}
                buttonText="Log out"
                onLogoutSuccess={logOut}
              />
            </div>
            <div className="google-button">Log out</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
