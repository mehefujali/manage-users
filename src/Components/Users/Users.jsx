import { useContext, useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import Swal from "sweetalert2";
import { SignalContext } from "../../context/SignalProvider";


const Users = () => {
      const {signal} = useContext(SignalContext)
      const [users, setUsers] = useState([])
      useEffect(() => {
            fetch('http://localhost:8080/users')
                  .then(res => res.json())
                  .then(data => setUsers(data))
      }, [signal])

      const handleDleteUser = id => {
            Swal.fire({
                  title: "Are you sure?",
                  text: "You won't delete this user ?",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#d33",
                  cancelButtonColor: "#3085d6",
                  confirmButtonText: "Yes, delete it!"
            }).then((result) => {
                  if (result.isConfirmed) {
                        fetch(`http://localhost:8080/users/${id}`, {
                              method: "DELETE"
                        })
                              .then(res => res.json())
                              .then(data => {
                                    if (data.deletedCount) {
                                          const filter = users.filter(user => user._id !== id)
                                          setUsers(filter)
                                          Swal.fire({
                                                title: "Deleted!",
                                                text: "User has been deleted.",
                                                icon: "success"
                                          });
                                    }


                              })
                  }
            });

      }
      return (
            <div className=" w-11/12 mx-auto">
                  <div className="overflow-x-auto text-black dark:text-white">
                        <table className="table">
                              {/* head */}
                              <thead>

                                    <tr className=" text-lg text-black dark:text-white">
                                          <th></th>

                                          <th>Name</th>
                                          <th>Email</th>
                                          <th>Gender</th>
                                          <th>Actions</th>
                                    </tr>
                              </thead>
                              <tbody>
                                    {/* row 1 */}
                                    {
                                          users.map(user => <tr key={user._id}>
                                                <td >

                                                </td>

                                                <td>
                                                      <div className="flex items-center gap-3">
                                                            <div className="avatar">
                                                                  <div className="mask rounded-full h-12 w-12">
                                                                        <img
                                                                              src={user?.photo}
                                                                              alt="Avatar Tailwind CSS Component" />
                                                                  </div>
                                                            </div>
                                                            <div>
                                                                  <div className="font-bold">{user.name}</div>
                                                                  <div className={`text-sm  ${user.status === "Inactive" ? "text-red-500" : "text-green-500"}`}>{user?.status}</div>
                                                            </div>
                                                      </div>
                                                </td>
                                                <td>
                                                      <p>{user?.email}</p>
                                                </td>
                                                <td>{user?.gnder}</td>
                                                <th>
                                                      <div className=" flex gap-2 ">
                                                            <button className="btn btn-sm btn-circle text-black dark:text-white border  shadow shadow-slate-300"><FaEdit></FaEdit></button>
                                                            <button onClick={() => handleDleteUser(user._id)} className="btn btn-sm text-red-500 btn-circle border  shadow shadow-slate-300"><MdDeleteOutline></MdDeleteOutline></button>
                                                      </div>
                                                </th>
                                          </tr>)
                                    }

                              </tbody>

                        </table>
                  </div>
            </div>
      );
};

export default Users;