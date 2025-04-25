import { WebView } from "react-native-webview";

const InterswitchPayment = () => {
  const paymentUrl =
    "https://sandbox.interswitchng.com/webpay/pay?reference=YOUR_REF&amount=100000&currency=566&merchant_code=MERCHANT_CODE&redirect_url=https://yourdomain.com/return";

  return (
    <WebView
      source={{ uri: paymentUrl }}
      onNavigationStateChange={(event) => {
        if (event.url.includes("return")) {
          // Handle successful or failed transaction

          console.log("COmpleted");
        }
      }}
    />
  );
};

export default InterswitchPayment;
