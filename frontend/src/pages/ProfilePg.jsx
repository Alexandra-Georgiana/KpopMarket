import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

const ProfilePg = () => {
    const [userDetails, setUserDetails] = useState(null)
    const fetchUserData = async () => {
        auth.onAuthStateChanged(async (user) => {
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
           if (docSnap.exists()) {
                setUserDetails(docSnap.data());
            }
        });
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    async function logOut() {
        try{
            await signOut(auth);
            window.location.href = "/login";
        }catch(error){
            console.log(error);
        }
    }

  return (
    <div className="max_pad_container flexCenter flex-col pt-32 mb-12 mt-20">
        {userDetails ? (
           <>
                <h3 className="text-2xl font-bold mb-4">🐼🐻🐻‍❄️ Wellcome!!! {userDetails.username} 🐼🐻🐻‍❄️</h3>
                <div className="gap-4 mt-7 bg-[#ffffff77] rounded-xl px-20 py-6">
                    <p>Username: {userDetails.username} </p>
                    <p>Email: {userDetails.email} </p>
                    <p>We hope you'll enjoy our site!🥰</p>
                </div>
                <button className={`my-4 bg-pink-500 text-white py-2 px-40 rounded-xl transition hover:bg-pink-600 `} onClick={logOut} >Log Out</button>
            </> 
        ) : (
            <p>Loading...</p>
        )}
    </div>
  )
}

export default ProfilePg