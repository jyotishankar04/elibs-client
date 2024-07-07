import { NavLink, Outlet } from "react-router-dom";

function SettingsLayout() {
  return (
    <div className=" sm:container flex flex-col items-center  sm:flex-row  sm:mx-auto w-full sm:p-10 p-2">
      <div
        className="sm:w-3/12 flex
       flex-row items-start sm:flex-col gap-4 p-4"
      >
        <NavLink
          to={"general"}
          className={({ isActive }) =>
            `${
              isActive
                ? "font-semibold bg-orange-500 text-white"
                : " bg-gray-200 text-gray-700"
            } px-4 py-2 rounded-md`
          }
        >
          General
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `${
              isActive
                ? "font-semibold bg-orange-500 text-white"
                : " bg-gray-200 text-gray-700"
            } px-4 py-2 rounded-md`
          }
          to={"security"}
        >
          Security
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `${
              isActive
                ? "font-semibold bg-orange-500 text-white"
                : " bg-gray-200 text-gray-700"
            } px-4 py-2 rounded-md`
          }
          to={"support"}
        >
          Support
        </NavLink>
      </div>
      <div className=" sm:mt-4 p-2 sm:p-4 border w-full rounded-lg">
        <Outlet />
      </div>
    </div>
  );
}

export default SettingsLayout;
