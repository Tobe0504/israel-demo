import ActiveUserProductListings from "@/components/ActiveUserProductListings";
import Loader from "@/components/Loader";
import { AuthContext } from "@/context/AuthContext";
import { requestHandler } from "@/helpers/requestHandler";
import useError from "@/hooks/useError";
import { requestType } from "@/utils/types";
import React, { useContext, useEffect, useState } from "react";
import { ScrollView, View } from "react-native";

const MyList = () => {
  // States
  const [requestState, setRequestState] = useState<requestType>({
    isLoading: false,
    data: null,
    error: null,
  });

  const [deleteRequestState, setDeleteRequestState] = useState<requestType>({
    isLoading: false,
    data: null,
    error: null,
  });

  // COntext
  const { user } = useContext(AuthContext);

  // Hooks
  const { handleError } = useError();

  // Requests
  const handleUserList = (load?: boolean) => {
    requestHandler({
      url: `api/list/getUserListProducts?iks=${user?.Id}`,
      method: "GET",
      load,
      state: requestState,
      setState: setRequestState,
      errorFunction(err) {
        console.log(err?.response?.data, 10000);
        handleError(err);
      },
      successFunction(res) {
        console.log(res?.data?.Result, "Chec");
      },
    });
  };

  const deleteListItemHandler = (id: number) => {
    requestHandler({
      url: `api/list/removeUserListProduct`,
      data: {
        UserId: user?.Id,
        ProductId: id,
      },
      method: "POST",
      state: deleteRequestState,
      setState: setDeleteRequestState,
      errorFunction(err) {
        console.log(err?.response?.data, 10000);
        handleError(err);
      },
      successFunction(res) {
        handleUserList(false);
      },
    });
  };

  //   Effects
  useEffect(() => {
    if (user) {
      handleUserList(true);
    }
  }, [user]);

  if (requestState?.isLoading) {
    return <Loader />;
  }

  return (
    <ScrollView style={{ backgroundColor: "#fff" }}>
      <ActiveUserProductListings
        data={requestState?.data?.Result}
        onDelete={deleteListItemHandler}
        loading={deleteRequestState?.isLoading}
      />
    </ScrollView>
  );
};

export default MyList;
