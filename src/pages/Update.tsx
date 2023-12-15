import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { updateUser } from "../features/users/usersSlice";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../hooks";
import { User } from "../models/user";

export const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { users, isLoading } = useAppSelector((state) => state.usersState);

  const [dataToBeUpdated, setDataToBeUpdated] = useState<User>({
    name: "",
    email: "",
    age: "",
    gender: "",
  });

  useEffect(() => {
    const [user] = users.filter((curr) => curr.id === id);
    setDataToBeUpdated(user);
  }, [id, users]);

  function newData(e: ChangeEvent<HTMLInputElement>) {
    setDataToBeUpdated({ ...dataToBeUpdated, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(updateUser(dataToBeUpdated));
    navigate("/read");
  }

  if (isLoading) {
    return (
      <main className="h-[90vh] flex justify-center items-center">
        <h2 className="text-5xl">Loading...</h2>
      </main>
    );
  }

  return (
    <main className="min-h-[90vh] flex justify-center items-center">
      <form onSubmit={handleSubmit}>
        <h1 className="text-center text-red-900 font-bold text-3xl mb-4">
          Edit The Data!
        </h1>
        <div className="mx-auto p-8 bg-slate-400 shadow shadow-orange-700 rounded-lg">
          <div className="mb-3 text-center">
            <label className="text-xl" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={dataToBeUpdated.name && dataToBeUpdated.name}
              onChange={newData}
              autoComplete="off"
              className="py-1 px-2 outline-none text-center rounded-md block mx-auto"
            />
          </div>

          <div className="mb-3 text-center">
            <label className="text-xl" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={dataToBeUpdated.email && dataToBeUpdated.email}
              onChange={newData}
              autoComplete="off"
              className="py-1 px-2 outline-none text-center rounded-md block mx-auto"
            />
          </div>

          <div className="mb-3 text-center">
            <label className="text-xl" htmlFor="age">
              Age
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={dataToBeUpdated.age && dataToBeUpdated.age}
              onChange={newData}
              autoComplete="off"
              className="py-1 px-2 outline-none text-center rounded-md block mx-auto"
            />
          </div>

          <div className="mb-3 text-center flex justify-center space-x-5">
            <div>
              <input
                type="radio"
                id="male"
                name="gender"
                value="Male"
                onChange={newData}
                checked={
                  !!dataToBeUpdated.gender && dataToBeUpdated.gender === "Male"
                }
              />
              <label htmlFor="male">Male</label>
            </div>
            <div>
              <input
                type="radio"
                id="female"
                name="gender"
                value="Female"
                onChange={newData}
                checked={
                  !!dataToBeUpdated.gender &&
                  dataToBeUpdated.gender === "Female"
                }
              />
              <label htmlFor="female">Female</label>
            </div>
          </div>

          <button
            type="submit"
            className="py-1 px-4 rounded-lg bg-orange-600 text-lg text-white mx-auto block"
          >
            Submit
          </button>
        </div>
      </form>
    </main>
  );
};
