import { LATEST } from "../assets/data";
import ShopPageTemplate from "../comonents/ShopPageTemplate";

const LatestPg = () => {
  return <ShopPageTemplate items={LATEST} title="Latest Products" />;
};

export default LatestPg;
