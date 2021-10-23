import React from "react";
import { AuthProvider } from "./authProvider";
import RootNavigator from "./rootNavigation";

const Providers=()=>{
    return(
        <AuthProvider>
            <RootNavigator/>
        </AuthProvider>
    )
}

export default Providers;