import Categories from "@/components/Categories";
import CategoriesCard from "@/components/CategoriesCard";
import CategoriesCard2 from "@/components/CategoriesCard2";
import CategoriesCard3 from "@/components/CategoriesCard3";
import CustomButton from "@/components/CustomButton";
import { setAllModalsFalse, setModalTrue } from "@/helpers/modalHandlers";
import { modalGenericType } from "@/utils/types";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Dimensions, Keyboard, Modal, ScrollView, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import DashboardHeader from "./DashboardHeader";
import DashboardSearch from "./DashboardSearch";
import ModalBody from "../components/ModalBody";
import PromoModalBody from "./PromoModalBody";
import DiscountModalBody from "./DiscountModalBody";
import DashboardProductsType from "./DashboardProductsType";
import { LOCAL_STORAGE_AUTH_NEW_USER } from "@/utils/constants";
import { getAsyncData } from "@/helpers/asyncStorageHandlers";
import Header from "./Header";

export const unstable_settings = {
  header: () => <Header />,
};

const DashBoard = () => {
  // Router
  const router = useRouter();

  // States
  const [modals, setModals] = useState<modalGenericType>({
    promo: false,
    discount: false,
  });

  // Effetcts
  useEffect(() => {
    const displayModal = async () => {
      try {
        const data = await getAsyncData(LOCAL_STORAGE_AUTH_NEW_USER);
        if (!data || data !== "false") {
          setModalTrue(setModals, "discount");
        } else {
          setAllModalsFalse(setModals);
        }
      } catch (error) {
        setAllModalsFalse(setModals);
      }
    };

    displayModal();
  }, []);

  return (
    <ScrollView
      style={{
        paddingHorizontal: 16,
        backgroundColor: "#fff",
      }}
    >
      {/* Modals */}
      <Modal
        visible={modals?.promo}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setAllModalsFalse(setModals)}
      >
        <ModalBody onClose={() => setAllModalsFalse(setModals)}>
          <PromoModalBody onClose={() => setAllModalsFalse(setModals)} />
        </ModalBody>
      </Modal>

      <Modal
        visible={modals?.discount}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setAllModalsFalse(setModals)}
      >
        <ModalBody onClose={() => setAllModalsFalse(setModals)}>
          <DiscountModalBody onClose={() => setAllModalsFalse(setModals)} />
        </ModalBody>
      </Modal>

      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <>
          <DashboardSearch />
          <DashboardHeader />
          {/* <Categories
            title="Select Your Space"
            caption="Select the type of apartment you want to light up."
            url="/dashboard"
          >
            <CategoriesCard
              type="category"
              title="Home"
              style={{ width: 118 }}
            />
            <CategoriesCard
              type="category"
              title="Home"
              style={{ width: 118 }}
            />
            <CategoriesCard
              type="category"
              title="Home"
              style={{ width: 118 }}
            />
            <CategoriesCard
              type="category"
              title="Home"
              style={{ width: 118 }}
            />
          </Categories>

          <Categories title="Featured Products" url="/featured-products">
            <CategoriesCard
              title="Standing Lamp"
              type="product"
              price={45000}
              discount={10}
            />
            <CategoriesCard
              title="Wooden Chandelier"
              type="product"
              price={45000}
            />
            <CategoriesCard
              title="Standing Lamp"
              type="product"
              price={45000}
              discount={10}
            />
          </Categories>

          <Categories title="Featured Categories">
            <CategoriesCard2
              title="Chandeliers"
              onPress={() => router.push("/category/chandeliers")}
            />
            <CategoriesCard2
              title="Chandeliers 2"
              onPress={() => router.push("/category/chandeliers")}
            />
            <CategoriesCard2
              title="Chandeliers 3"
              onPress={() => router.push("/category/chandeliers")}
            />
          </Categories>

          <Categories title="Popular Categories" isNotScroll>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                maxWidth: width - 32,
              }}
            >
              <CategoriesCard3
                title="Chandeliers"
                onPress={() => router.push("/category/chandeliers")}
              />
              <CategoriesCard3
                title="Home"
                onPress={() => router.push("/category/chandeliers")}
              />
              <CategoriesCard3
                title="Test"
                onPress={() => router.push("/category/chandeliers")}
              />
            </View>
          </Categories> */}

          <DashboardProductsType />

          <CustomButton
            text="View All Products"
            type="secondary"
            style={{ marginBottom: 30 }}
            onPress={() => router.push("/all-products")}
          />
        </>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

export default DashBoard;
