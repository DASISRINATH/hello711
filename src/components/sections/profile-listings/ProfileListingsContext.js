import React, { createContext, useState, useEffect } from "react";
//import API_URL from "./../baseAxios";

export const ProfileListingsContext = createContext({})

export default function userItemsContext({ children }) {
	const [isLoggedIn, setIsLoggedIn] = useState(false)

    const [userItemstest, setUserItemstest] = useState('Testing context')


	//useEffect(() => {
    //    checkLogin()
	//},[]);

	return (
		<ProfileListingsContext.Provider
			value={{
				userItemstest,
                setUserItemstest,
			}}
		>
			{children}
		</ProfileListingsContext.Provider>
	)
}