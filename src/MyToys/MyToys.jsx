import React, { useContext, useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import { AuthContext } from '../Components/Register/Provider/AuthProvider';
const MyToys = () => {
      const { user } = useContext(AuthContext);
      // console.log(user?.email);
      const [toys, setBooking] = useState([]);
      const [load, setLoad] = useState(true);
      const [value,setvalue]=useState(0);
      const [set,setD]=useState(true)
      // http://localhost:5001/bookings?email=ekramhossain117@gmail.com&&value=2
      const url = `https://server-fawn-chi.vercel.app/bookings?email=${user?.email}&&value=${value}`
      useEffect(() => {
            fetch(url)
                  .then(res => res.json())
                  .then(data => setBooking(data))
      }, [load,set])
      // console.log(toys)
      const handledelete = (id) => {
            console.log(id);
            const proceed = confirm("Are sure to delete");
            if (proceed) {
                  fetch(`https://server-fawn-chi.vercel.app/bookings/${id}`, {
                        method: 'DELETE'
                  })
                        .then(res => res.json())
                        .then(data => {
                              console.log(data);
                              if (data.deletedCount >= 1) {
                                    setLoad(!load)
                                    Swal.fire({
                                          title: 'Success!',
                                          text: 'Delete toy successfully',
                                          icon: 'success',
                                          confirmButtonText: 'OK'
                                    })

                              }
                        })
            }
      }
      const assend=()=>{
            setvalue(1)
            setD(!set)
            
      }
      const dessend=()=>{
            setvalue(2)
            setD(!set)
      }
console.log(value)
      const handleUpdate = (id) => {

            const proceed = confirm("Are sure to delete");
            if (proceed) {
                  fetch(`https://server-fawn-chi.vercel.app/bookings/${id}`, {
                        method: 'PATCH',
                        headers: {
                              'content-type': 'application/json'
                        },
                        body: JSON.stringify()
                  })
                        .then(res => res.json())
                        .then(data => {
                              console.log(data);
                              if (data.modifiedCount > 0) {
                                    setLoad(!load)
                                    Swal.fire({
                                          title: 'Success!',
                                          text: 'Updated toy successfully',
                                          icon: 'success',
                                          confirmButtonText: 'OK'
                                    })

                              }
                        })
            }
      }


      return (
            <>
                  <div className='lg:flex gap-2 m-3'>
                        <button onClick={assend} className="btn btn-primary">Assecending</button>
                        <button onClick={dessend}  className="btn btn-secondary">Dessecending</button>
                  </div>
                  <div className="w-full">
                        {/* <h1>{location.pathname}</h1> */}
                        <table className="table table-compact w-full">
                              <thead>
                                    <tr>
                                          <th></th>
                                          <th>Seller</th>
                                          <th>Toy Name</th>
                                          <th>Sub-Category</th>
                                          <th>Price</th>
                                          <th>Avialble Quantity</th>
                                          <th>Update</th>
                                          <th>Delete</th>
                                    </tr>
                              </thead>
                              <tbody>
                                    {toys?.map((toy, index) =>

                                          <tr>
                                                <th>{index + 1}</th>
                                                <td>{toy?.sellerName}</td>
                                                <td>{toy?.name}</td>
                                                <td>{toy?.subCategory}</td>
                                                <td>{toy?.price}</td>
                                                <td>{toy?.availableQuantity}</td>

                                                <td>

                                                      <Link to={`/updated/${toy._id}`}><button className="btn btn-outline btn-primary" >Update</button></Link>

                                                </td>
                                                <td>
                                                      <button className="btn btn-outline btn-secondary" onClick={() => handledelete(toy._id)}>Delete</button>
                                                </td>

                                          </tr>


                                    )}

                              </tbody>

                        </table>
                  </div>

            </>
      );
};

export default MyToys;