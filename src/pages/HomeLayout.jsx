import React from "react";
import { Outlet, useNavigation } from "react-router-dom";
import Navbar from "../component/Navbar";

const HomeLayout = () => {
  const navigation = useNavigation();

  /* 
   useNavigation da state durumu "idle" veya "loading" oluyor 
   sayfalar arası geçiş yaparken pürürsüz bir geçiş için useNavigation u kullanıyoruz
    */
  //  console.log(navigation);
  const isPageLoading = navigation.state === "loading";

  const value = "some value";
  return (
    <>
      <Navbar />

      {/* outletin uzerindeki componentler sayfada sabit olarak duracak */}
      <section className="page">
        {isPageLoading ? (
          <div className="loading" style={{ margin: "0 auto" }}></div>
        ) : (
          <Outlet context={{ value }} />
          /* 
          Contextin içindeki degeri outlet deki herhangi bir compenentden "useOutletContext" ile alabiliriz
          */
        )}
      </section>

      {/* outletin altındaki componentler sayfada sabit olarak duracak */}

      {/* <footer>footer</footer> */}
    </>
  );
};

export default HomeLayout;
