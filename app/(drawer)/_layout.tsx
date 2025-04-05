import React from "react";
import { Drawer } from "expo-router/drawer";
import CustomDrawer from "@/containers/CustomDrawer";
import Header from "@/containers/Header";
import AuthContextProvider from "@/context/AuthContext";
import AuthHeader from "@/containers/AuthHeader";
import ActiveUserHeader from "@/containers/ActiveUserHeader";

const DrawerLayout = () => {
  return (
    <AuthContextProvider>
      <Drawer
        initialRouteName="dashboard"
        drawerContent={(props) => <CustomDrawer {...props} />}
        screenOptions={({ route }) => ({
          header: () => {
            if (route.name === "sign-in") {
              return <AuthHeader />;
            } else if (
              route.name === "my-account" ||
              route.name === "shipping-options"
            ) {
              return (
                <ActiveUserHeader
                  title={
                    route?.name === "shipping-options"
                      ? "Shipping Options"
                      : "My Account"
                  }
                />
              );
            } else return <Header />;
          },
        })}
      />
    </AuthContextProvider>
  );
};

export default DrawerLayout;
