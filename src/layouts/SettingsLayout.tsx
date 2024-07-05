import { NavLink, Outlet } from "react-router-dom";

function SettingsLayout() {
  return (
    <div className="container flex  mx-auto w-full p-10">
      <div
        className="w-3/12 flex
       flex-col gap-4 p-4"
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
      <div className="mt-4 p-4 border w-full rounded-lg">
        <Outlet />
      </div>
    </div>
  );
}

export default SettingsLayout;
