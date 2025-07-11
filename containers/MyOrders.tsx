import ActiveUserProductListings from "@/components/ActiveUserProductListings";
import Loader from "@/components/Loader";
import { AuthContext } from "@/context/AuthContext";
import { requestHandler } from "@/helpers/requestHandler";
import useError from "@/hooks/useError";
import { requestType } from "@/utils/types";
import React, { useContext, useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { logger } from "react-native-logs";

const MyOrders = () => {
  // States
  const [requestState, setRequestState] = useState<requestType>({
    isLoading: false,
    data: null,
    error: null,
  });

  // COntext
  const { user } = useContext(AuthContext);

  // UTils
  const log = logger.createLogger();

  // Hooks
  const { handleError } = useError();

  // Requests
  const handleUserOrders = (load?: boolean) => {
    requestHandler({
      url: `api/order/getUserOrders?iks=${user?.Id}`,
      method: "GET",
      load,
      state: requestState,
      setState: setRequestState,
      successFunction(res) {},
      errorFunction(err) {
        handleError(err);
      },
    });
  };

  log.debug(requestState?.data?.Result[0]?.ProductOrders["0"]?.Product);

  //   Effects
  useEffect(() => {
    if (user) {
      handleUserOrders(true);
    }
  }, [user]);

  if (requestState?.isLoading) {
    return <Loader />;
  }

  return (
    <ScrollView style={{ backgroundColor: "#fff" }}>
      <ActiveUserProductListings
        data={requestState?.data?.Result?.map(
          (data: any) => data?.ProductOrders["0"]?.Product
        )}
      />
    </ScrollView>
  );
};

export default MyOrders;
