import React, { useContext } from "react";
import { View, Text, ActivityIndicator } from "react-native";

// import Dashboard from "../pages/Dashboard";
import AuthRoutes from "./auth.routes";
import AppRoutes from "./app.routes";

import { AuthContext } from "../contexts/AuthContext";

function Routes(){
    const {isAuthenticated, loading} = useContext(AuthContext)
    
    
    if(loading){
        return(
            <View style={{ 
                    flex:1, 
                    backgroundColor: '#1d1d2e', 
                    justifyContent: 'center', 
                    alignItems: 'center' 
                    }}
                >
                <ActivityIndicator size={60} color="#f5f7fb"/>
                <Text style={{ color: '#f5f7fb'}}>Carregando...</Text>
            </View>
        )
    }

    return(
        isAuthenticated ? <AppRoutes/> : <AuthRoutes/>
    )
}

export default Routes;