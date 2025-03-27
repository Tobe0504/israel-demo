import React from "react";
import { Drawer } from "expo-router/drawer";
import CustomDrawer from "@/containers/CustomDrawer";
import Header from "@/containers/Header";
import AuthContextProvider from "@/context/AuthContext";
import AuthHeader from "@/containers/AuthHeader";
import ActiveUserHeader from "@/containers/ActiveUserHeader";

const Layout = () => {
  return (
    <AuthContextProvider>
      <Drawer
        initialRouteName="dashboard"
        drawerContent={(props) => <CustomDrawer {...props} />}
        screenOptions={({ route }) => ({
          header: () => {
            if (route.name === "dashboard") {
              return <Header />;
            } else if (route.name === "sign-in") {
              return <AuthHeader />;
            } else if (
              route.name === "my-account" ||
              route.name === "my-list" ||
              route.name === "shipping-options"
            ) {
              return (
                <ActiveUserHeader
                  title={
                    route?.name === "my-list"
                      ? "My List"
                      : route?.name === "shipping-options"
                      ? "Shipping Options"
                      : "My Account"
                  }
                />
              );
            }
            return <Header />;
          },
        })}
      />
    </AuthContextProvider>
  );
};

export default Layout;
