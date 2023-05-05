import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";
import { auth } from "../firebase";
import 'firebase/compat/auth';


import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
//import { file } from '@babel/types';

const Chats = () => {
  const history = useHistory();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  console.log("Fetched user", user);

  const handleLogout = async () => {
    await auth.signOut();

    history.push("/");
  };

  const getFile = async (url) => {
    const response = await fetch(url);
    const data = await response.blob();

    return new File([data], "userPhoto.jpg", { type: "image/jpeg" });
  };

  useEffect(() => {
    if (!user) {
      history.push("/");

      return;
    }

    const loadData = async () => {
      try {
        let res = await axios.get("https://api.chatengine.io/users/me", {
          headers: {
            "project-id": "932e7784-6fa8-4f67-93d3-acf6a2abc406",
            "user-name": user.email,
            "user-secret": user.uid,
          },
        });
        setLoading(false);
        console.log("Response", res);
      } catch (error) {
        let formdata = new FormData();
        formdata.append("email", user.email);
        formdata.append("username", user.email);
        formdata.append("secret", user.uid);

        await getFile(user.photoURL).then(async (avatar) => {
          formdata.append("avatar", avatar, avatar.name);

          await axios
            .post("https://api.chatengine.io/users/", formdata, {
              headers: {
                "private-key": "bb643254-53f1-47b0-8a61-b72e3d60fa0a",
              },
            })
            .then(() => {
              setLoading(false);
              console.log("success here");
            })
            .catch((error) => console.log(error));
        });
        console.log(error);
      }
    };

    loadData();
  }, [user, history]);

  if (!user || loading) return "Loading...";

  return (
    <div className="chats-page">
      <div className="nav-bar">
        <div className="logo-tab">SoftuniChat</div>
        <div onClick={handleLogout} className="logout-tab">
          Logout
        </div>
      </div>
      <ChatEngine
        height="calc(100vh - 66px)"
        projectID="932e7784-6fa8-4f67-93d3-acf6a2abc406"
        userName={user.email}
        userSecret={user.uid}
      />
    </div>
  );
};
export default Chats;