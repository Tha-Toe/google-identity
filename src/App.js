import "./App.css";
import { useRef, useState, useEffect } from "react";
import { GoogleLogin, GoogleLogout } from "@leecheuk/react-google-login";
import { gapi } from "gapi-script";
import { UserAuth } from "./context/AuthContext";
import { AuthContextProvider } from "./context/AuthContext";
import { useNavigate } from "react-router-dom";

const clientId =
  "555618407648-lkittruvsnt5jr327s088990pgv3bi9t.apps.googleusercontent.com";
function App() {
  const googleButtonRef = useRef(null);

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
    console.log("success:", res);
    setUser(res.profileObj);
    setAccessToken(res.accessToken);
    setIdToken(res.tokenId);
  };
  const onFailure = (err) => {
    console.log("failed:", err);
  };

  const {
    logOut,
    user,
    setUser,
    appleSignIns,
    idToken,
    setIdToken,
    loginByGoogle,
    accessToken,
    setAccessToken,
    setLoginByGoogle,
  } = UserAuth();
  const handleAppleLogin = async () => {
    try {
      await appleSignIns();
    } catch (error) {
      console.log(error);
    }
  };
  const navigate = useNavigate();
  const goSignInPage = () => {
    navigate("/login", { replace: true });
  };

  return (
    <div className="App">
      <h1>Google Identity Method</h1>
      {!user && (
        <>
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
          <button className="apple-button" onClick={handleAppleLogin}>
            Log in with apple
          </button>
          <button className="apple-button" onClick={goSignInPage}>
            Signin with email
          </button>
        </>
      )}{" "}
      {user && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1>
            {user.name}
            {user.displayName}
          </h1>
          <img src={user.imageUrl} />
          <p>{user.email}</p>
          {accessToken && (
            <div style={{ maxWidth: "100vw" }}>
              Access Token - {accessToken}
            </div>
          )}
          {idToken && (
            <div style={{ maxWidth: "100vw" }}>idToken - {idToken}</div>
          )}
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
