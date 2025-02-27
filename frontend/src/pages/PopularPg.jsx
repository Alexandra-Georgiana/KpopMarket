import { POPULAR } from "../assets/data";
import ShopPageTemplate from "../comonents/ShopPageTemplate";

const PopularPg = () => {
  return <ShopPageTemplate items={POPULAR} title="Popular Products" />;
};

export default PopularPg;
