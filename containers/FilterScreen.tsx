import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { requestHandler } from "@/helpers/requestHandler";
import { filterType, requestType } from "@/utils/types";
import useError from "@/hooks/useError";
import Loader from "@/components/Loader";
import CustomButton from "@/components/CustomButton";
import { AuthContext } from "@/context/AuthContext";

const { width } = Dimensions.get("window");

const FilterScreen: React.FC = () => {
  // States
  const [activeFilter, setActiveFilter] = useState<string | null>("space");
  const [designTypes, setDesigntypes] = useState<requestType>({
    isLoading: false,
    data: null,
    error: null,
  });
  const [spaceTypes, setSpacetypes] = useState<requestType>({
    isLoading: false,
    data: null,
    error: null,
  });
  const [productTypes, setProductTypes] = useState<requestType>({
    isLoading: false,
    data: null,
    error: null,
  });
  const [filterState, setFilterState] = useState<filterType>({
    ProductTypes: [],
    DesignTypes: [],
    SpaceType: [],
    ColorTypes: [],
    HeightTypes: [],
    MaximumPrice: 0,
    MinimumPrice: 0,
    SpaceID: 0,
    IsFeatured: false,
    Skip: 0,
  });

  // Context
  const { setProductsFilterData } = useContext(AuthContext);

  // Router
  const { categoryId } = useLocalSearchParams();

  const toggleFilter = (filter: string): void => {
    setActiveFilter(filter);
  };

  // Hooks
  const { handleError } = useError();

  // Requests
  const getDesigntypesHandler = () => {
    requestHandler({
      method: "GET",
      url: "/api/designType/getDesignTypes",
      state: designTypes,
      setState: setDesigntypes,
      errorFunction(err) {
        handleError(err);
      },
    });
  };

  const getSpacetypeHandler = () => {
    requestHandler({
      method: "GET",
      url: "/api/SpaceType/getSpaceTypes",
      state: spaceTypes,
      setState: setSpacetypes,
      errorFunction(err) {
        handleError(err);
      },
    });
  };

  const getProductTypeHandler = () => {
    requestHandler({
      method: "GET",
      url: "/api/productType/getProductTypes",
      state: productTypes,
      setState: setProductTypes,
      errorFunction(err) {
        handleError(err);
      },
    });
  };

  // Effects
  useEffect(() => {
    getDesigntypesHandler();
    getSpacetypeHandler();

    if (categoryId === "undefined") {
      getProductTypeHandler();
    }
  }, [categoryId]);

  useEffect(() => {
    if (filterState) {
      setProductsFilterData({
        ...filterState,
        SpaceType: filterState?.SpaceType?.join(),
        DesignTypes: filterState?.DesignTypes?.join(),
        ProductTypes: filterState?.ProductTypes?.join(),
        ColorTypes: filterState?.ColorTypes?.join(),
        HeightTypes: filterState?.HeightTypes?.join(),
      });
    }
  }, [filterState]);

  console.log(filterState, "Filter");

  const renderFilterContent = (): React.ReactNode => {
    if (activeFilter === "design") {
      return (
        <View>
          {designTypes?.isLoading ? (
            <Loader />
          ) : (
            <View>
              {designTypes?.data?.Result?.map((data: any) => {
                return (
                  <TouchableOpacity
                    style={[
                      styles.filterOption,
                      filterState?.DesignTypes?.includes(data?.Id) &&
                        styles.activeFilterOption,
                    ]}
                    onPress={() => {
                      setFilterState((prevState) => {
                        const updatedState = { ...prevState };

                        if (!updatedState.DesignTypes?.includes(data?.Id)) {
                          updatedState?.DesignTypes?.push(data?.Id);
                        } else {
                          const filtered = updatedState?.DesignTypes?.filter(
                            (id) => id !== data?.Id
                          );
                          updatedState.DesignTypes = filtered;
                        }
                        return updatedState;
                      });
                    }}
                  >
                    <Text style={styles.filterText}>{data?.Name}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </View>
      );
    } else if (activeFilter === "product") {
      return (
        <View>
          {productTypes?.isLoading ? (
            <Loader />
          ) : (
            <View>
              {productTypes?.data?.Result?.map((data: any) => {
                return (
                  <TouchableOpacity
                    style={[
                      styles.filterOption,
                      filterState?.ProductTypes?.includes(data?.Id) &&
                        styles.activeFilterOption,
                    ]}
                    onPress={() => {
                      setFilterState((prevState) => {
                        const updatedState = { ...prevState };

                        if (!updatedState.ProductTypes?.includes(data?.Id)) {
                          updatedState?.ProductTypes?.push(data?.Id);
                        } else {
                          const filtered = updatedState?.ProductTypes?.filter(
                            (id) => id !== data?.Id
                          );
                          updatedState.ProductTypes = filtered;
                        }
                        return updatedState;
                      });
                    }}
                  >
                    <Text style={styles.filterText}>{data?.Name}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </View>
      );
    }
    return (
      <View>
        {spaceTypes?.isLoading ? (
          <Loader />
        ) : (
          <View>
            {spaceTypes?.data?.Result?.map((data: any) => {
              return (
                <TouchableOpacity
                  style={[
                    styles.filterOption,
                    filterState?.SpaceType?.includes(data?.Id) &&
                      styles.activeFilterOption,
                  ]}
                  onPress={() => {
                    setFilterState((prevState) => {
                      const updatedState = { ...prevState };

                      if (!updatedState.SpaceType?.includes(data?.Id)) {
                        updatedState?.SpaceType?.push(data?.Id);
                      } else {
                        const filtered = updatedState?.SpaceType?.filter(
                          (id) => id !== data?.Id
                        );
                        updatedState.SpaceType = filtered;
                      }
                      return updatedState;
                    });
                  }}
                >
                  <Text style={styles.filterText}>{data?.Space}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.leftPanel}>
          <TouchableOpacity
            style={[
              styles.filterOption,
              activeFilter === "space" && styles.activeFilterOption,
            ]}
            onPress={() => toggleFilter("space")}
          >
            <Text style={styles.filterText}>Space</Text>
            <Ionicons name="chevron-forward" size={20} color="#000" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterOption,
              activeFilter === "design" && styles.activeFilterOption,
            ]}
            onPress={() => toggleFilter("design")}
          >
            <Text style={styles.filterText}>Design Type</Text>
            <Ionicons name="chevron-forward" size={20} color="#000" />
          </TouchableOpacity>

          {categoryId === "undefined" && (
            <TouchableOpacity
              style={[
                styles.filterOption,
                activeFilter === "product" && styles.activeFilterOption,
              ]}
              onPress={() => toggleFilter("product")}
            >
              <Text style={styles.filterText}>Product Type</Text>
              <Ionicons name="chevron-forward" size={20} color="#000" />
            </TouchableOpacity>
          )}

          <View style={styles.verticalLine} />
        </View>

        <ScrollView style={styles.rightPanel}>
          {renderFilterContent()}
        </ScrollView>
      </View>

      <View style={styles.footer}>
        <CustomButton
          text="Cancel"
          type="white"
          style={{ flex: 1 }}
          onPress={() => {
            router.back();
          }}
        />
        <CustomButton
          text="Apply"
          type="secondary"
          style={{ flex: 1 }}
          onPress={() => {
            router.push(`/category-details/${categoryId}/filter/products`);
          }}
          disabled={
            categoryId === "undefined"
              ? filterState?.DesignTypes?.length < 1 &&
                filterState?.SpaceType?.length < 1 &&
                filterState?.ProductTypes?.length < 1
              : filterState?.DesignTypes?.length < 1 &&
                filterState?.SpaceType?.length < 1
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    flexDirection: "row",
  },
  leftPanel: {
    width: "40%",
    borderRightWidth: 1,
    borderRightColor: "#E0E0E0",
    position: "relative",
  },
  rightPanel: {
    width: "60%",
  },
  verticalLine: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    width: 1,
    backgroundColor: "#E0E0E0",
  },
  clearFilter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    fontWeight: "bold",
  },
  clearButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  clearText: {
    color: "#000",
    marginRight: 5,
    fontSize: 14,
  },
  filterOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#828282",
  },
  activeFilterOption: {
    backgroundColor: "#F5F5F5",
  },
  filterText: {
    fontSize: 16,
  },

  priceLabels: {
    gap: 10,
    marginTop: 200,
    flexDirection: "row",
    marginHorizontal: "auto",
  },
  priceTagText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "medium",
  },
  sliderContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  footer: {
    padding: 15,
    backgroundColor: "#FFCA05",
    flexDirection: "row",
    gap: 16,
  },
  applyButton: {
    paddingVertical: 15,
    alignItems: "center",
    backgroundColor: "#000",
    borderRadius: 5,
  },
  applyButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default FilterScreen;
