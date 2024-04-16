import React from "react";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
const navigation = [{ name: "Marketplace", to: "/" }];
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { Logout } from "../store/userSlice";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const loggedIn = useSelector((store) => store?.user?.isLoggedIn);
  const userCart = useSelector((store) => store?.user?.user?.cart);
  const numberOfItems = userCart?.length || 0;
  const dispatch = useDispatch();

  const LogoutHandler = () => {
    dispatch(Logout());
    Cookies.remove("access_token");
  };
  return (
    <header className="absolute inset-x-0 top-0 z-50 max-w-7xl mx-auto">
      <nav
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt=""
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12 ">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.to}
              className=" font-normal leading-6 text-md text-gray-800            >
              tracking-wider"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {loggedIn && (
            <>
              <Link
                to="/cart"
                className="text-sm mr-4 text-whit px-6 py-2 relative"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
                <div className="w-5 h-5 grid place-items-center rounded-full bg-red-400 text-white text-sm absolute top-0 right-3">
                  {numberOfItems}
                </div>
              </Link>
              <button
                onClick={() => {
                  LogoutHandler();
                }}
                className="text-sm font-semibold leading-6 mr-4 text-white bg-gray-700 px-6 py-2 rounded-full "
              >
                Logout
              </button>
            </>
          )}
          {!loggedIn && (
            <>
              <Link
                to="/signup"
                className="text-sm font-semibold leading-6 mr-4 text-white bg-gray-700 px-6 py-2 rounded-full "
              >
                Sign up
              </Link>
              <Link
                to="/login"
                className="text-sm font-semibold leading-6 text-gray-900 border border-black rounded-full px-6 py-2"
              >
                Log in <span aria-hidden="true">&rarr;</span>
              </Link>
            </>
          )}
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.to}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7  text-gray-900 cursor-pointer"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                {loggedIn && (
                  <>
                    <Link to="/cart" className="text-sm block ml-3 px-6 py-2 ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                        />
                      </svg>
                    </Link>
                    <button
                      onClick={() => {
                        LogoutHandler();
                      }}
                      className="text-sm inline-block font-semibold leading-6 mr-4 my-6 text-white bg-purple-400 px-6 py-2 rounded-full"
                    >
                      Logout
                    </button>
                  </>
                )}
                {!loggedIn && (
                  <>
                    <Link
                      to="/signup"
                      className="text-sm inline-block font-semibold leading-6 mr-4 my-6 text-white bg-purple-400 px-6 py-2 rounded-full"
                    >
                      Sign up
                    </Link>
                    <Link
                      to="/login"
                      className=" block rounded-lg py-2.5  text-base font-semibold leading-7 px-6 text-gray-900"
                    >
                      Log in<span aria-hidden="true">&rarr;</span>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
};

export default Header;
