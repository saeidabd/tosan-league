import {
  Link,
  NavLink,
  NavLinkRenderProps,
  useNavigate,
} from "react-router-dom";
import { Logo } from "../logo-component";
import { RefObject, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

export const DesktopViewLayout = (props: {
  outletRef: RefObject<HTMLDivElement>;
}) => {
  const [isMiniProfileHidden, setIsMiniProfileHidden] = useState<boolean>(true);
  const navElementRef = useRef<HTMLDivElement>(null);
  const logoElementRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const activeLinkClass = `block py-2 px-3 text-white font-bold bg-blue-800 border-b-4 border-white`;
  const inactiveLinkClass = `block py-2 px-3 rounded text-gray-400 hover:bg-blue-800 hover:text-white`;
  function changeActivationStyle() {
    return ({ isActive }: NavLinkRenderProps) =>
      isActive ? activeLinkClass : inactiveLinkClass;
  }

  window.onclick = (event: Event) => {
    if (
      props.outletRef?.current?.contains(event.target as HTMLElement) ||
      (navElementRef?.current?.contains(event.target as HTMLElement) &&
        !logoElementRef?.current?.contains(event.target as HTMLElement))
    ) {
      setIsMiniProfileHidden(true);
    }
  };
  return (
    <div id="desktopView">
      <div
        className={`w-32 h-20 fixed bg-gray-50 z-40 top-20 left-0 flex flex-col justify-between border-gray-700 rounded border m-1 shadow ${
          isMiniProfileHidden ? "hidden" : ""
        }`}
      >
        <div className="w-full hover:bg-gray-200 h-full p-1 px-2 cursor-pointer">
          <FontAwesomeIcon icon={faUser} />
          <span className="text-xl text-right pr-1">سعید عبدالهی</span>
        </div>
        <button
          className="w-full hover:bg-gray-200 h-full p-1 px-2 text-right"
          onClick={() => {
            localStorage.removeItem("userState");
            navigate("/login");
          }}
        >
          <FontAwesomeIcon icon={faRightFromBracket} />
          <span className="text-right text-xl pr-1">خروج</span>
        </button>
      </div>
      <nav className="w-full bg-blue-800 z-10 top-0 fixed" ref={navElementRef}>
        <div className="flex justify-between mx-auto">
          <div className="w-full flex flex-col-reverse">
            <ul className="flex flex-row font-medium pr-2 ">
              <li>
                <NavLink
                  to={"/create-league"}
                  className={changeActivationStyle()}
                  aria-current="page"
                >
                  ایجاد لیگ
                </NavLink>
              </li>
              <li>
                <NavLink to="/league-table" className={changeActivationStyle()}>
                  جدول
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/insert-results"
                  className={changeActivationStyle()}
                >
                  درج نتیجه
                </NavLink>
              </li>
            </ul>
          </div>
          <Link to={"/league-table"} className="flex justify-center pb-4">
            <span className="self-center w-full text-4xl font-semibold whitespace-nowrap text-white">
              توسن کاپ
            </span>
          </Link>
          <div className="flex flex-row-reverse pt-2 w-full">
            <div
              className="border-gray-50 border-4 ml-2 mb-2 bg-white z-20 rounded-full cursor-pointer"
              onClick={() => setIsMiniProfileHidden(!isMiniProfileHidden)}
              ref={logoElementRef}
            >
              <Logo />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};
