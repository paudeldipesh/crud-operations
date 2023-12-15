import { useEffect, useState } from "react";
import { showUser } from "../features/users/usersSlice";
import { UserData } from "../components";
import { Modal } from "../components";
import { useAppDispatch, useAppSelector } from "../hooks";

export const Read = () => {
  const dispatch = useAppDispatch();
  const { users, isLoading, search } = useAppSelector(
    (state) => state.usersState
  );
  const [showModal, setShowModal] = useState<boolean>(false);
  const [checkId, setCheckId] = useState<string>("");
  const [radioData, setRadioData] = useState<string>("");

  useEffect(() => {
    dispatch(showUser());
  }, [dispatch]);

  if (isLoading) {
    return (
      <main className="min-h-[90vh] flex justify-center items-center">
        <h2 className="text-5xl">Loading...</h2>
      </main>
    );
  }

  return (
    <main className="min-h-[90vh] flex justify-center items-center">
      {showModal && <Modal setShowModal={setShowModal} checkId={checkId} />}
      <div>
        <h1 className="text-center text-red-900 font-bold text-3xl mb-4 mt-4">
          {users.length === 0 ? "No Data Found!" : "User Data!"}
        </h1>
        {users && (
          <>
            <div className="text-center flex justify-center space-x-4">
              <div className="flex gap-x-1">
                <input
                  type="radio"
                  id="all"
                  name="gender"
                  checked={radioData === ""}
                  onChange={() => setRadioData("")}
                  className="cursor-pointer"
                />
                <label htmlFor="all" className="cursor-pointer">
                  All
                </label>
              </div>
              <div className="flex gap-x-1">
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="Male"
                  checked={radioData === "Male"}
                  onChange={(e) => setRadioData(e.target.value)}
                  className="cursor-pointer"
                />
                <label htmlFor="male" className="cursor-pointer">
                  Male
                </label>
              </div>
              <div className="flex gap-x-1">
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="Female"
                  checked={radioData === "Female"}
                  onChange={(e) => setRadioData(e.target.value)}
                  className="cursor-pointer"
                />
                <label htmlFor="female" className="cursor-pointer">
                  Female
                </label>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 m-4 md:gap-4">
              {users
                .filter((user) => {
                  if (search.length === 0) {
                    return user;
                  } else {
                    return user
                      .name!.toLowerCase()
                      .includes(search.toLowerCase());
                  }
                })
                .filter((user) => {
                  if (radioData === "Male") {
                    return user.gender === radioData;
                  } else if (radioData === "Female") {
                    return user.gender === radioData;
                  } else {
                    return user;
                  }
                })
                .map((user) => (
                  <UserData
                    key={user.id}
                    user={user}
                    setCheckId={setCheckId}
                    setShowModal={setShowModal}
                  />
                ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
};
