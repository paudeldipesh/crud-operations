import { deleteUser } from "../features/users/usersSlice";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../hooks";
import { User } from "../models/user";

interface UserDataProps {
  user: User;
  setCheckId: (id: string) => void;
  setShowModal: (value: boolean) => void;
}

export const UserData = ({ user, setShowModal, setCheckId }: UserDataProps) => {
  const dispatch = useAppDispatch();

  function handleOperations() {
    setCheckId(user.id!);
    setShowModal(true);
  }

  return (
    <div className="bg-gray-300 p-4 rounded-md border-2 border-black flex flex-col">
      <div>
        <span className="font-bold text-orange-600 text-xl">Name: </span>
        <span className="text-slate-600 font-semibold text-lg">
          {user.name}
        </span>
      </div>
      <div>
        <span className="font-bold text-orange-600 text-xl">Email: </span>
        <span className="text-slate-600 font-semibold text-lg">
          {user.email}
        </span>
      </div>
      <div>
        <span className="font-bold text-orange-600 text-xl">Gender: </span>
        <span className="text-slate-600 font-semibold text-lg">
          {user.gender}
        </span>
      </div>
      <div className="flex justify-evenly flex-wrap mt-4">
        <button
          onClick={handleOperations}
          className="py-px px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-lg text-white"
          type="button"
        >
          View
        </button>
        <Link
          to={`/edit/${user.id}`}
          className="py-px px-3 rounded-lg bg-green-600 hover:bg-green-700 text-lg text-white"
        >
          Edit
        </Link>
        <button
          onClick={() => dispatch(deleteUser(user.id!))}
          className="py-px px-3 rounded-lg bg-red-600 hover:bg-red-700 text-lg text-white"
          type="button"
        >
          Delete
        </button>
      </div>
    </div>
  );
};
