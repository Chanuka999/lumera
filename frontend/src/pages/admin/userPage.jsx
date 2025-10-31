import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CiCirclePlus } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";

function UserBlockConfirm(props) {
  const email = props.email;
  const close = props.close;
  const refresh = props.refresh;

  function blockUser() {
    const token = localStorage.getItem("token");
    // axios
    //   .delete(import.meta.env.VITE_API_URL + "/api/products/" + productId, {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   })
    //   .then((response) => {
    //     console.log(response.data);
    //     close();
    //     toast.success("Product delete successfully");
    //     refresh();
    //   })
    //   .catch(() => {
    //     toast.error("Failed to delete product");
    //   });
  }

  return (
    <div className="fixed left-0 top-0 w-full h-screen bg-[#00000050] z-[100] flex justify-center items-center">
      <div className="w-[500px] h-[200px] bg-primary relative flex flex-col justify-center items-center gap-[40px]">
        <button
          onClick={close}
          className="absolute right-[-20px] top-[-20px] w-[40px] h-[40px] bg-red-600 rounded-full text-white flex justify-center items-center font-bold border border-red-600 hover:bg-white hover:text-red-600"
        >
          X
        </button>
        <p className="text-xl font-semibold">
          Are you sure you want to block the user with email : {email}?
        </p>
        <div className="flex gap-[40px]">
          <button
            onClick={close}
            className="w-[100px] bg-blue-600 p-[5px] text-white hover:bg-accent"
          >
            Cancel
          </button>
          <button
            onClick={blockUser}
            className="w-[100px] bg-red-600 p-[5px] text-white hover:bg-accent"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [isBlockConfirmVisible, setIsBlockConfirmVisible] = useState(false);
  const [userToBlock, setUserToBlock] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) {
      axios
        .get(import.meta.env.VITE_API_URL + "/api/users/all-users")
        .then((response) => {
          console.log(response.data);
          // API returns { data: products }
          setUsers(response.data?.data || []);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error(err);
          // ensure loader stops on error
          setUsers([]);
          setIsLoading(false);
        });
    }
  }, [isLoading]);

  return (
    <div className="w-full h-full p-6 bg-primary min-h-screen">
      {isBlockConfirmVisible && (
        <UserBlockConfirm
          refresh={() => {
            setIsLoading(true);
          }}
          email={userToBlock.email}
          close={() => {
            setIsBlockConfirmVisible(false);
          }}
        />
      )}

      <Link
        to="/admin/add-product"
        className="fixed right-[50px] bottom-[50px] text-5xl hover:text-accent"
      >
        <CiCirclePlus />
      </Link>

      <h1 className="text-2xl font-bold text-secondary mb-6">
        Product Management
      </h1>

      <div className="overflow-x-auto shadow-md rounded-2xl bg-white">
        {isLoading ? (
          <Loader />
        ) : (
          <table className="w-full text-center border-collapse">
            <thead className="bg-secondary text-white">
              <tr>
                <th className="py-3 px-4">Image</th>
                <th className="py-3 px-4">First Name</th>
                <th className="py-3 px-4">Last Name</th>
                <th className="py-3 px-4">Role</th>

                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((item, index) => (
                <tr
                  key={item.productID}
                  className={`border-b hover:bg-primary transition-colors ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="py-3 px-4">
                    {Array.isArray(item.images) && item.images.length > 0 ? (
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg shadow-sm"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-100 rounded-lg shadow-sm flex items-center justify-center text-xs text-gray-500">
                        No image
                      </div>
                    )}
                  </td>
                  <td className="py-3 px-4 font-medium text-secondary">
                    {item.productId}
                  </td>
                  <td className="py-3 px-4">{item.name}</td>
                  <td className="py-3 px-4 text-green-600 font-semibold">
                    ${item.price}
                  </td>
                  <td className="py-3 px-4 line-through text-gray-500">
                    ${item.labelPrice}
                  </td>
                  <td className="py-3 px-4 text-gray-500">{item.stock}</td>
                  <td className="py-3 px-4">{item.category}</td>
                  <td className="py-3 px-4">
                    <div className="flex flex-row gap-4 justify-center items-center">
                      <button
                        className="p-2 rounded-full hover:bg-red-100 transition"
                        onClick={() => {
                          // ensure we pass the correct productId field from the API
                          setProductToDelete(
                            item.productId || item.productID || item._id
                          );
                          setIsDeleteConfirmVisible(true);
                        }}
                      >
                        <FaRegTrashCan className="text-red-500 hover:text-red-700 text-lg" />
                      </button>
                      <button className="p-2 rounded-full hover:bg-accent/20 transition">
                        <FaRegEdit
                          className="text-accent hover:text-orange-700 text-lg"
                          onClick={() => {
                            navigate("/admin/update-product", {
                              state: item,
                            });
                          }}
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
