import Constants from "expo-constants";

const { googge_web_client, google_ios_client_id }: any =
  Constants?.expoConfig?.extra;

const googleConfig = {
  google_ios_client_id,
  googge_web_client,
};

export default googleConfig;
