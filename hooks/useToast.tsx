import Toast from "react-native-toast-message";

const useToast = () => {
  const showToast = async (
    header: string,
    message: string,
    type: "success" | "error"
  ) => {
    Toast.show({
      type: type,
      text1: header || type === "error" ? "Error" : "Success",
      text2: message,
      visibilityTime: 5000,
    });
  };

  return { showToast };
};

export default useToast;
