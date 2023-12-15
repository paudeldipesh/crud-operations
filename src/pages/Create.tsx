import { ChangeEvent, FormEvent, useState } from "react";
import { createUser } from "../features/users/usersSlice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks";

export const Create = () => {
  const [users, setUsers] = useState({});
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  function getUserData(e: ChangeEvent<HTMLInputElement>) {
    setUsers({ ...users, [e.target.name]: e.target.value });
  }

  interface CreateUserType {
    name: string;
    email: string;
    age: string;
    gender: string;
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(createUser(users as CreateUserType));
    navigate("/read");
  }

  return (
    <main className="h-[90vh] flex justify-center items-center">
      <form onSubmit={handleSubmit}>
        <h1 className="text-center text-red-900 font-bold text-3xl mb-4">
          Fill The Form!
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
              onChange={getUserData}
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
              onChange={getUserData}
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
              onChange={getUserData}
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
                onChange={getUserData}
              />
              <label htmlFor="male">Male</label>
            </div>
            <div>
              <input
                type="radio"
                id="female"
                name="gender"
                value="Female"
                onChange={getUserData}
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
