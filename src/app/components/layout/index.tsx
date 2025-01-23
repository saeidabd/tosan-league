import { MobileViewLayout } from "./mobile-view-layout.index";
import { DesktopViewLayout } from "./desktop-view-layout";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

export default function Layout() {
  const outletRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userState") ?? "{}");
    if (!user.username) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="w-full bg-gray-100 min-w-80" style={{ height: "100vh" }}>
      <div className="">
        <DesktopViewLayout outletRef={outletRef}/>
      </div>
      <div className="md:hidden z-20">
        <MobileViewLayout outletRef={outletRef} />
      </div>
      <div id="outlet" className="relative w-full top-20" ref={outletRef}>
        <Outlet />
      </div>
    </div>
  );
}
