// // import {React,useState} from 'react'
// // import { jwtDecode } from 'jwt-decode';
// // const PasswordChange = () => {
// //     const[password,setPassword]=useState();
// //     const cookie=document.cookie;
// //     console.log(cookie)
// //     const decoded=jwtDecode(cookie);
// //     console.log(decoded)
// //     var email=decoded.email;
// //     var id=decoded._id;
// //     console.log(id)
// //     console.log(email)
// //     const change=()=>{
// //         axios.post('${import.meta.env.VITE_BACKEND_DOMAIN}/changepassword',{email,password,id})
// //             .then(function (response) {
// //                 // handle success
// //                 console.log(response);
// //             })
// //             .catch(function (error) {
// //                 // handle error
// //                 console.log(error);
// //             })
// //     }

// //   return (
// //     <div>
       
// //       <input
// //       type="password"
// //       value={password}
// //       onChange={(e)=>setPassword(e.target.value)}
// //       />

// //       Type your passsword here
// //       <button onClick={change}></button>
// //     </div>
// //   )
// // }

// // export default PasswordChange


// import React, { useState } from 'react';
// import axios from 'axios';
// import jwtDecode from 'jwt-decode';

// const PasswordChange = () => {
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const [success, setSuccess] = useState('');

//     const changePassword = async () => {
//         if (password.length < 6) {
//             setError('Password must be at least 6 characters long.');
//             return;
//         }
//         try {
//             const cookie = document.cookie;
//             const decoded = jwtDecode(cookie);
//             const email = decoded.email;
//             const id = decoded._id;

//             const response = await axios.post('${import.meta.env.VITE_BACKEND_DOMAIN}/changepassword', { email, password, id });
//             setSuccess('Password changed successfully.');
//             setError('');
//         } catch (error) {
//             setError('An error occurred while changing the password.');
//             setSuccess('');
//             console.log(error);
//         }
//     };

//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//             <div className="bg-white p-6 rounded shadow-md w-80">
//                 <h2 className="text-2xl font-bold mb-4">Change Password</h2>
//                 <input
//                     type="password"
//                     placeholder="Type your new password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="w-full p-2 mb-4 border rounded"
//                 />
//                 {error && <div className="text-red-500 mb-4">{error}</div>}
//                 {success && <div className="text-green-500 mb-4">{success}</div>}
//                 <button
//                     onClick={changePassword}
//                     className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
//                 >
//                     Change Password
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default PasswordChange;

import React, { useState } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const PasswordChange = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const changePassword = async () => {
        if (password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }
        try {
            const cookie = document.cookie;
            const decoded = jwtDecode(cookie);
            const email = decoded.email;
            const id = decoded._id;

            const response = await axios.put(`${import.meta.env.VITE_BACKEND_DOMAIN}/changepassword`, {password, id });
            setSuccess('Password changed successfully.');
            setError('');
        } catch (error) {
            setError('An error occurred while changing the password.');
            setSuccess('');
            console.log(error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded shadow-md w-80">
                <h2 className="text-2xl font-bold mb-4">Change Password</h2>
                <input
                    type="password"
                    placeholder="Type your new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 mb-4 border rounded"
                />
                {error && <div className="text-red-500 mb-4">{error}</div>}
                {success && <div className="text-green-500 mb-4">{success}</div>}
                <button
                    onClick={changePassword}
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
                >
                    Change Password
                </button>
            </div>
        </div>
    );
};

export default PasswordChange;

