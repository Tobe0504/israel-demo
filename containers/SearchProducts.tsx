import ProductsListings from "@/components/ProductsListings";
import { requestType } from "@/utils/types";
import { Dispatch, SetStateAction } from "react";

type SearchProductsTypes = {
  data: requestType;
  setPageNumber: Dispatch<SetStateAction<number>>;
};

const SearchProducts = ({ data, setPageNumber }: SearchProductsTypes) => {
  return (
    <>
      <ProductsListings
        data={data?.data?.Result}
        setPageNumber={setPageNumber}
        loading={data?.isLoading}
      />
    </>
  );
};

export default SearchProducts;
