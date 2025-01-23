import { Logo } from "../logo-component";
import background1 from "../../../assets/images/background1.png";
import background2 from "../../../assets/images/background2.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  let backgroundList = [background1, background2];
  const navigate = useNavigate();
  const [backgroundIndex, setBackgroundIndex] = useState<number>(0);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userState") ?? "{}");
    if (user.username) {
      navigate("/league-table");
    }
  }, []);
  useEffect(() => {
    const intervalId = setInterval(() => {
      let newIndex =
        backgroundIndex == backgroundList.length - 1 ? 0 : backgroundIndex + 1;
      setBackgroundIndex(newIndex);
    }, 10000);

    return () => {
      clearInterval(intervalId);
    };
  }, [backgroundIndex]);

  const submitHandler = (e: any) => {
    e.preventDefault();
    localStorage.setItem("userState", JSON.stringify({ username, password }));
    navigate("/create-league");
  };

  return (
    <div className="w-full h-full flex justify-center">
      <div
        className="flex w-full h-full items-center justify-center md:justify-normal transition-all duration-1000 ease-in-out"
        style={{
          backgroundImage: `url(${backgroundList[backgroundIndex]})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex flex-col">
          <div className="flex justify-center items-center">
            <h2 className="text-center text-3xl text-white p-1">توسن کاپ</h2>
            <Logo></Logo>
          </div>
          <form
            className="py-10 px-4 shadow-xl border border-gray-300 m-4"
            style={{
              backdropFilter: "blur(10px)",
              backgroundColor: "#5362a40f",
            }}
            onSubmit={submitHandler}
          >
            <h2 className="font-bold text-2xl mb-4 text-center">
              لطفا به حساب خود وارد شود
            </h2>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-xm text-black font-bold"
              >
                نام کاربری
              </label>
              <input
                type="text"
                name="email"
                id="email"
                style={{ direction: "ltr" }}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full px-4 py-2 text-left"
                placeholder="username@tosan.com"
                required={true}
                onChange={(e: any) => {
                  setUsername(e.target.value);
                }}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-xm text-black font-bold"
              >
                رمز عبور
              </label>
              <input
                style={{ direction: "ltr" }}
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full px-4 py-2 text-left"
                required={true}
                onChange={(e: any) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg my-2 px-24 py-2 text-center"
              onSubmit={submitHandler}
            >
              وارد شوید
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
