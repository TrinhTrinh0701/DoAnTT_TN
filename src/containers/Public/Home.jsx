import React, { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Navigation from "./Navigation";
import Search from "./Search";
import { Intro, Contact } from "../../components";
import { useSelector } from "react-redux";
import { path } from "../../ultils/constant";

const Home = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const location = useLocation();
  const navRef = useRef();
  useEffect(() => {
    const handleScroll = (e) => {
      if (window.pageYOffset >= 134) {
        navRef.current.style.cssText = `
      position:fixed;
      top:0;
      left:0;
      right:0;
      z-index:50;
      `;
      } else {
        navRef.current.style.cssText = `width:100%;`;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="flex flex-col items-center w-full h-full gap-6">
      <Header></Header>
      <div ref={navRef} className="w-full">
        <Navigation></Navigation>
      </div>
      {isLoggedIn &&
        location.pathname !== `/${path.CONTACT}` &&
        !location.pathname?.includes(path.DETALIL) && <Search />}
      <div className="flex flex-col items-start justify-start w-4/5 mt-3 lg:w-3/5">
        <Outlet />
      </div>
      <Intro />
      <Contact />
    </div>
  );
};

export default Home;
