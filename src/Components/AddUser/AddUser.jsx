import { Link } from "react-router-dom";
import { IoMdPersonAdd } from "react-icons/io";
import 'animate.css';
import { useContext, useState } from "react";
import { ImCross } from "react-icons/im";
import Swal from "sweetalert2";
import { SignalContext } from "../../context/SignalProvider";

const AddUser = () => {
      const {setSignal} = useContext(SignalContext)
      const [addForm, setAddForm] = useState(false)
      const handleAdduser = (e) => {
            e.preventDefault()
            const form = e.target
            const name = form.name.value
            const email = form.email.value
            const photo = form.photo.value
            const gnder = form.gnder.value
            const status = form.status.value
            const newUser = {
                  name,
                  email,
                  photo,
                  gnder,
                  status,

            }

            fetch('http://localhost:8080/users', {
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json"
                  },
                  body: JSON.stringify(newUser)
              })
              .then(res => res.json()) 
              .then(data => {
                  if(data.insertedId){
                        Swal.fire({
                              position: "center",
                              icon: "success",
                              title: "User added ",
                              showConfirmButton: false,
                              timer: 1500
                            });
                  }
              }) 
              .catch(err => console.error("Error:", err));
            setAddForm(false)
            setSignal(Math.random())

      }
      return (
            <div className=" w-11/12 mx-auto">
                  <Link onClick={() => setAddForm(!addForm)} className="animate__animated animate__pulse btn bg-blue-500 text-white  hover:bg-blue-500"> Add new user {addForm ? <ImCross className=""></ImCross> : <IoMdPersonAdd className=" text-xl" />}</Link>

                  <div className=" mt-10">
                        {
                              addForm && <form onSubmit={handleAdduser} action="" className="animate__animated animate__flipInX bg-base-100 absolute z-50  flex flex-col gap-3 md:w-96 p-6 border border-black dark:border-white rounded-lg shadow-lg">
                                    <input required type="text" name="name" placeholder="Enter Full name" className="input focus:outline-none border-black dark:border-white" />
                                    <input required type="text" name="email" placeholder="Enter Email" className="input focus:outline-none border-black dark:border-white" />
                                    <input required type="text" name="photo" placeholder="Enter Photo URL" className="input focus:outline-none border-black dark:border-white" />
                                    <div className=" flex gap-4 text-black dark:text-white">
                                          <label htmlFor="" className=" flex gap-2">
                                                Male
                                                <input required value="Male" className=" checkbox" type="radio" name="gnder" id="" /></label>
                                          <label className=" flex gap-2" htmlFor="">
                                                Female
                                                <input required value="Female" className=" checkbox" type="radio" name="gnder" id="" /></label>
                                    </div>
                                    <div className=" flex gap-4 text-black dark:text-white">
                                          <label htmlFor="" className=" flex gap-2">
                                                Active
                                                <input required value="Active" className=" checkbox" type="radio" name="status" id="" /></label>
                                          <label  className=" flex gap-2" htmlFor="">
                                                Inactive
                                                <input required  value="Inactive" className=" checkbox" type="radio" name="status" id="" /></label>
                                    </div>
                                    <button className=" btn bg-blue-500 text-white">Add user</button>

                              </form>
                        }
                  </div>
            </div>
      );
};

export default AddUser;