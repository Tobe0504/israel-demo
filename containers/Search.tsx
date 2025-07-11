import CustomButton from "@/components/CustomButton";
import Loader from "@/components/Loader";
import ProductsHeader from "@/components/ProductsHeader";
import { requestHandler } from "@/helpers/requestHandler";
import useError from "@/hooks/useError";
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

  // Hooks
  const { handleError } = useError();

  // Requests
  const handleSearchResults = () => {
    requestHandler({
      url: `api/product/getApprovedProductsViaSearch?iks=${search}&ims=${pageNumber}&isreturn=false`,
      method: "GET",
      state: requestState,
      setState: setRequestState,
      errorFunction(err) {
        handleError(err);
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
              <SearchProducts
                data={requestState}
                setPageNumber={setPageNumber}
              />
            </>
          )}
        </>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

export default Search;
