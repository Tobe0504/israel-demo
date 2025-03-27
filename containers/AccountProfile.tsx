import { ThemedText } from "@/components/ThemedText";
import { AuthContext } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useContext } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";

const AccountProfile = () => {
  // Context
  const { user } = useContext(AuthContext);

  //   Router
  const router = useRouter();

  return (
    <ScrollView style={{ paddingVertical: 20, paddingHorizontal: 16 }}>
      <View
        style={{ padding: 16, backgroundColor: "#C4C4C433", borderRadius: 5 }}
      >
        <View
          style={{ borderBottomWidth: 1, paddingBottom: 8, marginBottom: 18 }}
        >
          <ThemedText style={{ fontSize: 12, marginBottom: 8 }}>
            Full Name
          </ThemedText>
          <ThemedText style={{ fontSize: 14 }}>{user?.Name}</ThemedText>
        </View>

        <View
          style={{ borderBottomWidth: 1, paddingBottom: 8, marginBottom: 18 }}
        >
          <ThemedText style={{ fontSize: 12, marginBottom: 8 }}>
            Address
          </ThemedText>
          <ThemedText style={{ fontSize: 14 }}>
            {user?.Address || "N/A"}
          </ThemedText>
        </View>

        <View
          style={{ borderBottomWidth: 1, paddingBottom: 8, marginBottom: 18 }}
        >
          <ThemedText style={{ fontSize: 12, marginBottom: 8 }}>
            Phone Number
          </ThemedText>
          <ThemedText style={{ fontSize: 14 }}>
            {user?.PhoneNumber || "N/A"}
          </ThemedText>
        </View>

        <View
          style={{ borderBottomWidth: 1, paddingBottom: 8, marginBottom: 18 }}
        >
          <ThemedText style={{ fontSize: 12, marginBottom: 8 }}>
            Email Address
          </ThemedText>
          <ThemedText style={{ fontSize: 14 }}>
            {user?.Email || "N/A"}
          </ThemedText>
        </View>
      </View>

      <View style={{ marginTop: 34 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 36,
          }}
        >
          <ThemedText style={{ fontFamily: "PoppinsMedium", fontSize: 14 }}>
            Cart
          </ThemedText>
          <TouchableOpacity>
            <Ionicons
              name="chevron-forward-outline"
              size={20}
              onPress={() => {
                router.push("/cart");
              }}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 36,
          }}
        >
          <ThemedText style={{ fontFamily: "PoppinsMedium", fontSize: 14 }}>
            My List
          </ThemedText>
          <TouchableOpacity>
            <Ionicons
              name="chevron-forward-outline"
              size={20}
              onPress={() => {
                router.push("/my-list");
              }}
            />
          </TouchableOpacity>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 36,
          }}
        >
          <ThemedText style={{ fontFamily: "PoppinsMedium", fontSize: 14 }}>
            My Orders
          </ThemedText>
          <Ionicons name="chevron-forward-outline" size={20} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AccountProfile;
