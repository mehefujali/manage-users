import { useContext, useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import Swal from "sweetalert2";
import { SignalContext } from "../../context/SignalProvider";


const Users = () => {
      const { signal, setSignal } = useContext(SignalContext)
      const [users, setUsers] = useState([])
      const {searchUser} = useContext(SignalContext)
     
      useEffect(() => {
            fetch(`https://user-management-server-pied.vercel.app/users?search=${searchUser}`)
                  .then(res => res.json())
                  .then(data => setUsers(data))
      }, [signal,searchUser])

      const handleDleteUser = id => {
            Swal.fire({
                  title: "Are you sure?",
                  text: "You won't delete this user ?",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#d33",
                  cancelButtonColor: "#3B82F6",
                  confirmButtonText: "Yes, delete it!"
            }).then((result) => {
                  if (result.isConfirmed) {
                        fetch(`https://user-management-server-pied.vercel.app/users/${id}`, {
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


      const handleUpdateUser = async (id) => {
            const res = await fetch(`https://user-management-server-pied.vercel.app/user/${id}`);
            const data = await res.json();
            const { value: formValues } = await Swal.fire({
                  title: "Update  User",
                  html: `
                <form id="add-user-form" class=" bg-base-100 flex flex-col gap-3 p-6 border border-black dark:border-white rounded-lg shadow-lg">
                  <input value="${data.name}" required type="text" name="name" placeholder="Enter Full Name" class="input focus:outline-none border-black dark:border-white" />
                  <input value="${data.email}" required type="text" name="email" placeholder="Enter Email" class="input focus:outline-none border-black dark:border-white" />
                  <input value="${data.photo}" required type="text" name="photo" placeholder="Enter Photo URL" class="input focus:outline-none border-black dark:border-white" />
                  <div class="flex gap-4 text-black dark:text-white">
                    <label class="flex gap-2">
                      Male
                      <input ${data.gnder === "Male" && "checked"}  required value="Male" class="checkbox" type="radio" name="gnder" />
                    </label>
                    <label class="flex gap-2">
                      Female
                      <input ${data.gnder === "Female" && "checked"} required value="Female" class="checkbox" type="radio" name="gnder" />
                    </label>
                  </div>
                  <div class="flex gap-4 text-black dark:text-white">
                    <label class="flex gap-2">
                      Active
                      <input ${data.status === "Active" && "checked"} required value="Active" class="checkbox" type="radio" name="status" />
                    </label>
                    <label class="flex gap-2">
                      Inactive
                      <input ${data.status === "Inactive" && "checked"} required value="Inactive" class="checkbox" type="radio" name="status" />
                    </label>
                  </div>
                </form>
              `,
                  showCancelButton: true,
                  confirmButtonText: "Update user",
                  confirmButtonColor: "#3B82F6",

                  focusConfirm: false,
                  preConfirm: () => {
                        const form = document.getElementById("add-user-form");
                        const formData = new FormData(form);

                        const user = {
                              name: formData.get("name"),
                              email: formData.get("email"),
                              photo: formData.get("photo"),
                              gnder: formData.get("gnder"),
                              status: formData.get("status"),
                        };

                        if (!user.name || !user.email || !user.gender || !user.status) {
                              Swal.showValidationMessage("Please fill out all fields!");
                        }

                        fetch(`https://user-management-server-pied.vercel.app/updateusers/${id}`, {
                              method: "PUT",
                              headers: {
                                    "Content-Type": "application/json"
                              },
                              body: JSON.stringify(user)
                        })
                              .then(res => res.json())
                              .then(data => {
                                    console.log(data);

                                    if (data.modifiedCount) {

                                          Swal.fire({
                                                icon: "success",
                                                title: "User Updated Successfully",
                                                html: `
                                    
                                  `,
                                          });
                                    }

                              })

                  },
            });

            setSignal(Math.random())
      };

      return (
            <div className=" w-11/12 mx-auto" >
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
                                                            <button onClick={() => handleUpdateUser(user._id)} className="btn btn-sm btn-circle text-black dark:text-white border  shadow shadow-slate-300"><FaEdit></FaEdit></button>
                                                            <button onClick={() => handleDleteUser(user._id)} className="btn btn-sm text-red-500 btn-circle border  shadow shadow-slate-300"><MdDeleteOutline></MdDeleteOutline></button>
                                                      </div>
                                                </th>
                                          </tr>)
                                    }

                              </tbody>

                        </table>
                  </div>
            </div >
      );
};

export default Users;