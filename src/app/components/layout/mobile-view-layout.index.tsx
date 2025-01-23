import { RefObject, useState } from "react";
import {
  Link,
  NavLink,
  NavLinkRenderProps,
  useNavigate,
} from "react-router-dom";
import { Logo } from "../logo-component";

export const MobileViewLayout = (props: {
  outletRef: RefObject<HTMLDivElement>;
}) => {
  window.onclick = (event: Event) => {
    if (props.outletRef?.current?.contains(event.target as HTMLElement)) {
      setIsBurgerHidden(true);
    }
  };
  const [isBurgerHidden, setIsBurgerHidden] = useState<boolean>(true);
  const activeLinkClass = `block py-2 px-3 text-white font-bold bg-blue-600 border-white`;
  const inactiveLinkClass = `block py-2 px-3 rounded text-gray-400 hover:bg-blue-700 hover:text-white`;
  function changeActivationStyle() {
    return ({ isActive }: NavLinkRenderProps) =>
      isActive ? activeLinkClass : inactiveLinkClass;
  }
  const navigate = useNavigate();
  return (
    <div id="mobileView">
      <nav className="w-full bg-blue-800 z-10 top-0 fixed">
        <div className="flex justify-between mx-auto">
          <div className="pt-2 w-full flex items-center">
            <Link to={"/league-table"} className="flex z-20 mr-1 mb-2">
              <div className="border-gray-50 border-4 rounded-full">
                <Logo />
              </div>
            </Link>
            <Link to={"/league-table"} className="pb-4 mr-2">
              <span className="self-center w-full text-4xl font-semibold whitespace-nowrap text-white">
                توسن کاپ
              </span>
            </Link>
          </div>
          <div className="flex items-center ml-1">
            <button
              type="button"
              className="p-1 text-sm text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700"
              onClick={() => setIsBurgerHidden(!isBurgerHidden)}
            >
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className={`w-full ${isBurgerHidden ? "hidden" : null}`}>
          <ul className="flex flex-col font-medium bg-blue-900">
            <li>
              <NavLink
                to={"/create-league"}
                className={changeActivationStyle()}
                aria-current="page"
                onClick={() => setIsBurgerHidden(true)}
              >
                ایجاد لیگ
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/league-table"
                className={changeActivationStyle()}
                onClick={() => setIsBurgerHidden(true)}
              >
                جدول
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/insert-results"
                className={changeActivationStyle()}
                onClick={() => setIsBurgerHidden(true)}
              >
                درج نتیجه
              </NavLink>
              <div
                className="block py-2 px-3 rounded text-gray-400 hover:bg-blue-700 hover:text-white"
                onClick={() => {
                  localStorage.removeItem("userState");
                  navigate("/login");
                }}
              >
                خروج
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};
