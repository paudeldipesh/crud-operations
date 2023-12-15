import { useAppSelector } from "../hooks";

interface ModalProps {
  checkId: string;
  setShowModal: (value: boolean) => void;
}

export const Modal = ({ setShowModal, checkId }: ModalProps) => {
  const { users } = useAppSelector((state) => state.usersState);
  const [user] = users.filter((user) => user.id === checkId);
  const { name, email, age, gender } = user;

  return (
    <div className="fixed bg-black opacity-[95%] inset-0 flex justify-center items-center z-20">
      <div className="bg-white shadow-md p-2 rounded-lg h-80 w-80 relative flex justify-center items-center">
        <button
          onClick={() => setShowModal(false)}
          className="text-red-500 hover:text-red-900 text-3xl absolute font-bold top-0 right-3"
          type="button"
        >
          &times;
        </button>
        <div className="bg-green-300 p-4 rounded-md border-2 border-black flex flex-col">
          <div>
            <span className="font-bold text-orange-800 text-xl">Name: </span>
            <span className="text-slate-900 font-semibold text-lg">{name}</span>
          </div>
          <div>
            <span className="font-bold text-orange-800 text-xl">Email: </span>
            <span className="text-slate-900 font-semibold text-lg">
              {email}
            </span>
          </div>
          <div>
            <span className="font-bold text-orange-800 text-xl">Age: </span>
            <span className="text-slate-900 font-semibold text-lg">{age}</span>
          </div>
          <div>
            <span className="font-bold text-orange-800 text-xl">Gender: </span>
            <span className="text-slate-900 font-semibold text-lg">
              {gender}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
