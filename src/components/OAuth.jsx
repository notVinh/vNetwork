import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { loginGoogleUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth(app);
  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      let userCredentials = {
        name: resultsFromGoogle.user.displayName,
        email: resultsFromGoogle.user.email,
        googlePhotoUrl: resultsFromGoogle.user.photoURL,
      };
      dispatch(loginGoogleUser(userCredentials)).then((result) => {
        // console.log(result);
        navigate("/");
      });
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="mt-2" onClick={handleGoogleClick}>
      <img src="/assets/icons/google.svg" alt="" />
    </div>
  );
};

export default OAuth;
