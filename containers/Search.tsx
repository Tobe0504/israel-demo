import CustomButton from "@/components/CustomButton";
import Loader from "@/components/Loader";
import ProductsHeader from "@/components/ProductsHeader";
import { requestHandler } from "@/helpers/requestHandler";
import { requestType } from "@/utils/types";
import { isLoading } from "expo-font";
import { useGlobalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Keyboard, ScrollView } from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import DashboardSearch from "./DashboardSearch";
import SearchHeader from "./SearchHeader";
import SearchProducts from "./SearchProducts";

const Search = () => {
  // Router
  const { search } = useGlobalSearchParams();

  // States
  const [requestState, setRequestState] = useState<requestType>({
    isLoading: false,
    data: null,
    error: null,
  });
  const [pageNumber, setPageNumber] = useState(1);

  // Requests
  const handleSearchResults = () => {
    requestHandler({
      url: `api/product/getApprovedProductsViaSearch?iks=${search}&ims=${pageNumber}&isreturn=false`,
      method: "GET",
      state: requestState,
      setState: setRequestState,
      errorFunction(err) {
        console.error(err, "Check");
      },
      successFunction(res) {
        console.log(res, "Check");
      },
    });
  };

  // Effects
  useEffect(() => {
    if (search) {
      handleSearchResults();
    }
  }, [search, pageNumber]);

  return (
    <ScrollView
      style={{
        paddingHorizontal: 16,
        backgroundColor: "#fff",
      }}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <>
          <DashboardSearch />
          <ProductsHeader
            title="Search results for"
            caption={search as string}
          />

          {requestState?.isLoading ? (
            <Loader />
          ) : (
            <>
              <SearchProducts data={requestState?.data?.Result} />
              <CustomButton
                text="Load more"
                type="null"
                style={{ marginVertical: 16 }}
                loading={requestState?.isLoading}
                onPress={() => {
                  if (!requestState?.data?.Result?.length) {
                    setPageNumber(1);
                  } else {
                    setPageNumber((prevState) => prevState + 1);
                  }
                }}
              />
            </>
          )}
        </>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

export default Search;
