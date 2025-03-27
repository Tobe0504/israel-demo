import countryCurrencies from "@/currencies";
import { getAsyncData } from "@/helpers/asyncStorageHandlers";
import { formatCurrency } from "@/helpers/formatAmount";
import { LOCAL_STORAGE_BASE_CURRENCY } from "@/utils/constants";

const usePrice = () => {
  // Utils
  const returnCurrencySymbol = (shortCode: string) => {
    return (
      Object.values(countryCurrencies).find((data) => {
        return data?.code.toLowerCase() === shortCode?.toLowerCase();
      })?.symbol || "USD"
    );
  };

  const returnExchangeRatedPrice = async (price: string | number) => {
    const numberPrice = Number(price);
    try {
      const exchangeRate = await getAsyncData(LOCAL_STORAGE_BASE_CURRENCY);
      const parsedExchangeRate = JSON.parse(exchangeRate as string);

      const exchangeRatePrice = `${returnCurrencySymbol(
        parsedExchangeRate?.Currency
      )}${formatCurrency(numberPrice * Number(parsedExchangeRate?.Value))}`;

      console.log(exchangeRatePrice, "Test");

      return exchangeRatePrice;
    } catch (error) {
      return price;
    }
  };

  return { returnExchangeRatedPrice, returnCurrencySymbol };
};

export default usePrice;
