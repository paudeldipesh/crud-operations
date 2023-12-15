import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { dataToBeSearched, showUser } from "../features/users/usersSlice";
import { useAppDispatch, useAppSelector } from "../hooks";

export const Navbar = () => {
  const dispatch = useAppDispatch();
  const [searchData, setSearchData] = useState("");
  const location = useLocation();

  useEffect(() => {
    dispatch(showUser());
    dispatch(dataToBeSearched(searchData));
  }, [dispatch, searchData]);

  const { users } = useAppSelector((state) => state.usersState);
  const activeMenuItem = "text-2xl text-orange-500 bg-black rounded px-2 py-1";
  const inActiveMenuItem = "text-2xl text-white px-2 py-1";

  return (
    <header className="bg-slate-600 sticky top-0">
      <div className="py-4 px-8 md:px-2 max-w-7xl mx-auto">
        <div className="flex flex-col md:h-10 gap-y-2 md:gap-y-0 md:flex-row justify-between items-center">
          <Link to="/" className="text-2xl text-orange-100 cursor-pointer">
            CRUD Redux Toolkit (
            <span className="text-white">{users.length}</span>)
          </Link>
          <div className="flex space-x-3">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? activeMenuItem : inActiveMenuItem
              }
            >
              Create Post
            </NavLink>
            <NavLink
              to="/read"
              className={({ isActive }) =>
                isActive ? activeMenuItem : inActiveMenuItem
              }
            >
              User Data
            </NavLink>
          </div>
          <div>
            <input
              className="py-1 px-2 outline-none rounded-md w-52"
              type="search"
              placeholder="Search..."
              value={searchData}
              onChange={(e) => setSearchData(e.target.value)}
              readOnly={location.pathname !== "/read"}
            />
          </div>
        </div>
      </div>
    </header>
  );
};
