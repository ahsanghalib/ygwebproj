import React, { Suspense, useEffect } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import Layout from "./containers/Layout";
import Scrollbars from "react-custom-scrollbars";
import { BounceLoader } from "react-spinners";
import PageModal from "./components/PageModal/PageModal";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { AppStateType, DefaultToEmail } from "./types";
import CSSTransition from "react-transition-group/CSSTransition";
import axios from "axios";
import { getHomePageDataAction } from "./store/Actions";

const Career = React.lazy(() => import("./containers/Career/Career"));
const Contact = React.lazy(() => import("./containers/Contact/Contact"));
const WebPortal = React.lazy(() => import("./containers/WebPortal/WebPortals"));
const NotFound = React.lazy(() => import("./containers/NotFound/NotFound"));
const HomePage = React.lazy(() => import("./containers/Home/HomePage"));

function App() {
  const { pathname } = useLocation();
  const store = useSelector(
    (state: AppStateType) => state.mainStore,
    shallowEqual
  );
  const dispatch = useDispatch();

  const scrollRef = React.useRef<Scrollbars>(null);

  // front loading screen
  // const fakeTimer = () => {
  //     return new Promise(resolve => setTimeout(resolve, 2000))
  // }
  //
  // useEffect(() => {
  //
  //     fakeTimer().then(() => {
  //         const ele = document.getElementById('ipl-progress-indicator')
  //         if (ele) {
  //             ele.classList.add('available')
  //             setTimeout(() => {
  //                 ele.outerHTML = ''
  //             }, 2000)
  //         }
  //     })
  //
  // })

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollToTop();
  }, [pathname]);

  // hack for view height property.
  useEffect(() => {
    const heightSet = () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    window.addEventListener("resize", heightSet);
    heightSet();

    // runs on component unmount
    return () => {
      window.removeEventListener("resize", heightSet);
    };
  }, []);

  useEffect(() => {
    axios
      .get(
        "https://raw.githubusercontent.com/ahsanghalib/ygwebassets/master/data.json"
      )
      .then((res) =>
        dispatch(
          getHomePageDataAction(
            res.data.businessData ? res.data.businessData : [],
            res.data.managementData ? res.data.managementData : [],
            res.data.valuesData ? res.data.valuesData : [],
            res.data.historyData
              ? res.data.historyData
              : { data: "", title: "" },
            res.data.backend ? res.data.backend : "firebase",
            res.data.toEmailList ? res.data.toEmailList : DefaultToEmail
          )
        )
      )
      .catch((err) => console.log(err));
  }, [dispatch]);

  let routes = (
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/career" exact component={Career} />
      <Route path="/contact" exact component={Contact} />
      <Route path="/portals" exact component={WebPortal} />
      <Route path="/*" component={NotFound} />
    </Switch>
  );

  return (
    <Scrollbars style={{ height: "100vh" }} ref={scrollRef}>
      <Suspense
        fallback={
          <div
            style={{
              height: "100vh",
              width: "100%",
              margin: "0 auto",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div>
              <BounceLoader color={"#F5A623"} loading={true} size={40} />
            </div>
            <div style={{ marginTop: "15px" }}>Loading...</div>
          </div>
        }
      >
        <Layout
          showHeader={true}
          showFooter={pathname !== "/portals"}
          showFooterMap={pathname === "/contact"}
        >
          {routes}
        </Layout>

        <CSSTransition
          in={store.showPageModal}
          timeout={300}
          classNames={"full_screen"}
          unmountOnExit={true}
        >
          <PageModal />
        </CSSTransition>

        {/*{store.pageModal ? (*/}
        {/*    <PageModal/>*/}
        {/*) : null}*/}

        {/*<PageModal/>*/}
      </Suspense>
    </Scrollbars>
  );
}

export default App;
