import React from "react";
import classes from "./HomePage.module.scss";
import HomeHero from "../../components/HomeHero/HomeHero";
import ScrollDown from "../../components/ScrollDown/ScrollDown";

const ProductSlider = React.lazy(
  () => import("../../components/ProductSlider/ProductSlider")
);
const History = React.lazy(() => import("../../components/History/History"));
const Management = React.lazy(
  () => import("../../components/Management/Management")
);
const Values = React.lazy(() => import("../../components/Values/Values"));
const BusinessList = React.lazy(
  () => import("../../components/Business/BusinessList")
);

function HomePage() {
  return (
    <div>
      <HomeHero />
      <ScrollDown />

      <div className={classes.Business}>
        <div className={classes.Overlay}>
          <div className={classes.Container}>
            <h2 className={classes.Title}>Our Businesses</h2>
            <BusinessList />
          </div>
          <div className={classes.Products}>
            <h2 className={classes.Title}>Products</h2>
            <ProductSlider />
          </div>
        </div>
      </div>

      <div className={classes.Values}>
        <div className={classes.Overlay}>
          <div className={classes.Container}>
            <h2 className={classes.Title}>
              Success of Yaqoob Group is build on number of Core Values
            </h2>
            <Values />
          </div>
        </div>
      </div>

      <div className={classes.Management}>
        <div className={classes.Overlay}>
          <div className={classes.Container}>
            <h2 className={classes.Title}>Management</h2>
            <Management />
          </div>
        </div>
      </div>

      <div className={classes.History}>
        <div className={classes.Overlay}>
          <div className={classes.Container}>
            <History />
          </div>
        </div>
      </div>

      <div className={classes.LastLine}>
        <div className={classes.Overlay}>
          <div className={classes.Container}>
            <div className={classes.Content}>
              <div className={classes.Title}>
                It's all about creating a working environment that encourages
                people to add their skills, and where they're provided with
                everything they need to achieve their potential.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
