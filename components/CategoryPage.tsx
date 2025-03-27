import React from "react";
import { Dimensions, ScrollView } from "react-native";
import { View } from "react-native";
import Categories from "./Categories";
import CategoriesCard3 from "./CategoriesCard3";
import CategorySectionsHeader from "./CategorySectionsHeader";
import ProductsHeader from "./ProductsHeader";
import { ThemedText } from "./ThemedText";

const { width } = Dimensions.get("window");

const CategoryPage = () => {
  return (
    <ScrollView
      style={{
        paddingHorizontal: 16,
        backgroundColor: "#fff",
        width: width,
      }}
    >
      <ProductsHeader title="Home" isNotFilter />;
      <ThemedText>Shop by category</ThemedText>
      <>
        <CategorySectionsHeader title="Inside" />
        <Categories noMargin>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              maxWidth: width - 32,
            }}
          >
            <CategoriesCard3 title="Chandeliers" />
            <CategoriesCard3 title="Chandeliers" />
            <CategoriesCard3 title="Chandeliers" />
            <CategoriesCard3 title="Chandeliers" />
            <CategoriesCard3 title="Chandeliers" />
            <CategoriesCard3 title="Chandeliers" />
          </View>
        </Categories>
      </>
      <>
        <CategorySectionsHeader title="Outside" />
        <Categories noMargin>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              maxWidth: width - 32,
            }}
          >
            <CategoriesCard3 title="Chandeliers" />
            <CategoriesCard3 title="Chandeliers" />
            <CategoriesCard3 title="Chandeliers" />
            <CategoriesCard3 title="Chandeliers" />
            <CategoriesCard3 title="Chandeliers" />
            <CategoriesCard3 title="Chandeliers" />
          </View>
        </Categories>

        <>
          <CategorySectionsHeader title="Ceiling" />
          <Categories>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                maxWidth: width - 32,
              }}
            >
              <CategoriesCard3 title="Chandeliers" />
              <CategoriesCard3 title="Chandeliers" />
              <CategoriesCard3 title="Chandeliers" />
              <CategoriesCard3 title="Chandeliers" />
              <CategoriesCard3 title="Chandeliers" />
              <CategoriesCard3 title="Chandeliers" />
            </View>
          </Categories>
        </>
      </>
    </ScrollView>
  );
};

export default CategoryPage;
