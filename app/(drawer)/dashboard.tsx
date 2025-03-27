import DashBoard from "@/containers/DashBoard";
import Header from "@/containers/Header";

export const unstable_settings = {
  header: () => <Header />,
};

const dashboard = () => {
  return <DashBoard />;
};

export default dashboard;
