import React, { useCallback, useContext, useEffect, useState } from "react";
import { AppContext } from "../services/AppContext";

export const UserInfo: React.FC = () => {
  const { userState, setUserState } = useContext(AppContext);

  const [initialized, setInitialized] = useState(false);
  const [signedIn, setSignedIn] = useState(userState.userLoggedIn);

  // @ts-ignore
  const isSignedIn = (): boolean => initialized && window.gapi.auth2.getAuthInstance().isSignedIn.get();

  const updateSignedIn = () => {
    let si = isSignedIn();

    if (si && !signedIn) {
      // @ts-ignore
      let gUser = window.gapi.auth2.getAuthInstance().currentUser.get();
      let currentToken = gUser.getAuthResponse().id_token;
      setUserState({
        userLoggedIn: true,
        token: currentToken,
      });
    }

    setSignedIn(si);
  };

  function onSignIn(googleUser: any) {
    var profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log("Name: " + profile.getName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail()); // This is null if the 'email' scope is not present.
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("id_token: " + id_token);
    setUserState({
      userLoggedIn: true,
      token: id_token,
    });

    console.log("cool!");
    updateSignedIn();
  }

  const onFailedSignIn = (error: any) => {
    console.log("failed to log in user");
    console.log(error);
  };

  const onSignoutClicked = () => {
    console.log("signing out...");
    // @ts-ignore
    var auth2 = window.gapi?.auth2?.getAuthInstance();
    console.log(auth2?.isSignedIn.get());
    auth2?.signOut().then(function () {
      console.log("User signed out.");
      setUserState({
        userLoggedIn: false,
        token: "",
      });
      updateSignedIn();
    });
  };

  const TryInitGoogleSignIn = () => {
    // @ts-ignore
    let gapi = window.gapi;
    if (!gapi) {
      setTimeout(() => {
        console.log("Retrying Google signin");
        TryInitGoogleSignIn();
      }, 1000);
    } else {
      InitGoogleSignIn();
    }
  };

  const InitGoogleSignIn = () => {
    console.log("Google signin");

    // @ts-ignore
    let gapi = window.gapi;
    gapi.load("auth2", function () {
      gapi.auth2.init({}).then(function () {
        let auth2 = gapi.auth2.getAuthInstance();
        console.log(auth2.isSignedIn.get());

        gapi.signin2.render("g-signin2", {
          scope: "https://www.googleapis.com/auth/plus.login",
          width: 200,
          height: 50,
          longtitle: true,
          theme: "dark",
          onsuccess: onSignIn,
          onfailure: onFailedSignIn,
        });

        setInitialized(true);
        updateSignedIn();
      });
    });
  };

  const MemoizedTryInitGoogleSignIn = useCallback(TryInitGoogleSignIn, [TryInitGoogleSignIn, InitGoogleSignIn]);

  useEffect(() => {
    if (!userState.userLoggedIn) {
      MemoizedTryInitGoogleSignIn();
    }
  }, [MemoizedTryInitGoogleSignIn, userState.userLoggedIn]);

  const renderSignedOut = () => <div id="g-signin2" className="g-signin2"></div>;

  const renderSignedIn = () => (
    <>
      <button onClick={onSignoutClicked}>Sign me out</button>
    </>
  );

  return (
    <div className="UserInfo">
      <div>User</div>
      {initialized ? signedIn ? renderSignedIn() : renderSignedOut() : <div>initializing...</div>}
    </div>
  );
};
