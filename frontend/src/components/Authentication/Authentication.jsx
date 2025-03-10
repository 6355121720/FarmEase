// import {useState, useEffect} from 'react'
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom'
// import {useSelector, useDispatch} from 'react-redux'
// import {login, logout} from '../../features/loginSlicer.js'
// import {Loader2} from 'lucide-react'

// const Authentication = () => {
//     const [slider, changeSlider] = useState('signin')
//     const [regForm, setRegForm] = useState({username: '',email: '', isFarmer: false, password: ''})
//     const [logForm, setLogForm] = useState({username: '', password: ''})
//     const [file, setFile] = useState(null)
//     const navigate = useNavigate()
//     const dispatch = useDispatch()
//     const [loading, setLoading] = useState(false)

//     const handleFileChange = (e) => {
//         const file = e.target.files[0]
//         setFile(file)
//     }

//     const handleRegChange = (e) => {
//         const {name, value} = e.target
//         setRegForm({...regForm, [name]:value})
//     }

//     const handleLogChange = (e) => {
//         const {name, value} = e.target
//         setLogForm({...logForm, [name]:value})
//     }

//     const registerHandler = async (e) => {
//         e.preventDefault()
//         setLoading(true)
//         const formdata = new FormData()
//         Object.entries(regForm).forEach(([key, value]) => {
//             formdata.append(key, value)
//         })
//         if(file){
//             formdata.append("avatar", file)
//         }

//         await axios.post(`${import.meta.env.VITE_BACKEND_API}/user/create`, formdata, {
//             headers: {
//                 'Content-Type': 'multipart/form-data',
//             },
//             withCredentials: true
//         })
//         .then((res) => {
//             if(res.status<400){
//                 console.log('successfully registered')
//                 console.log(res.data.data)
//                 dispatch(login(res.data.data))
//                 navigate('/')
//             }
//             else{
//                 console.log('fail to register')
//             }
//         })
//         .catch((err) => {
//             console.log('error while registering user', err)
//         })
//         .finally(() => {
//             setLoading(false)
//         })

//     }
//     const loginHandler = async (e) => {
//         setLoading(true)
//         const loginData = {}
//         Object.entries(logForm).forEach(([key, value]) => {
//             loginData[key] = value
//         })
//         e.preventDefault()
//         await axios.post(`${import.meta.env.VITE_BACKEND_API}/user/login`,loginData,{
//             withCredentials: true
//         })
//         .then((res) =>  {
//             if(res.status<400){
//                 console.log('successfully logged in')
//                 console.log(res.data.data)
//                 dispatch(login(res.data.data))
//                 navigate('/')
//             }
//             else {
//                 console.log('fail to login')
//             }
//         })
//         .catch((err) => {
//             console.log("failed to login with axios", err.message)
//         })
//         .finally(() => {
//             setLoading(false)
//         })

//     }
//     useEffect(() => {
//         const signin = document.getElementById('signin')
//         const signup = document.getElementById('signup')
//         const scroller  = document.getElementById('scroller')
//         if(slider==='signin'){
//             signin.style.borderBottomWidth = '2px'
//             signup.style.borderBottomWidth = '0px'
//             scroller.style.transform = 'translateX(0%)'
//         }
//         else{
//             signin.style.borderBottomWidth = '0px'
//             signup.style.borderBottomWidth = '2px'
//             scroller.style.transform = 'translateX(-100%)'
//         }
//     }, [slider])
//     return (
//         <>
//             {loading && (
//                     <>
//                     <div className="z-[100] opacity-10 top-0 left-0 min-h-[100vh] min-w-[100vw] fixed bg-black" />
//                     <Loader2 className="z-[100] opacity top-[45vh] left-[45vw] min-h-[10vh] min-w-[10vw] fixed flex justify-center w-10 opacity-100 h-10 animate-spin text-gray-800 " />
//                     </>
//             )}
//             <div className = 'w-full h-[170vh] flex justify-center items-center'>
//                 <div className = ' bg-emerald-50 overflow-hidden w-[40%] h-[70%] flex flex-col justify-center items-center rounded-xl border-gray-300 border-2'>
//                     <div className = ' bg-emerald-100 border-b-2 border-b-gray-300 font-semibold text-lg px-28 pt-4 w-full h-[20%] flex justify-around items-center'>
//                         <div id='signin' onClick={() => {changeSlider('signin')}} className='border-b-red-800 flex-1 cursor-pointer flex justify-center items-center transition duration-400'>
//                             Sign In
//                         </div>
//                         <div id='signup' onClick={() => {changeSlider('signup')}} className='border-b-red-800 flex-1 cursor-pointer flex justify-center items-center transition duration-400'>
//                             Sign up
//                         </div>
//                     </div>
//                     <div id='scroller' className = ' transition-transform duration-700 ease-in-out w-full h-[80%] flex overflow-visible'>

//                         <div className="min-w-[100%] p-6 pt-12">
//                             <form onSubmit = {loginHandler} className = 'flex flex-col gap-6'>
//                             <div className="mb-4">
//                                 <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username or email address *</label>
//                                 <input value={logForm.username} onChange={handleLogChange} name='username' type="text" id="username" className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" placeholder="Enter your username or email"/>
//                             </div>
//                             <div className="mb-4">
//                                 <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password *</label>
//                                 <input  value={logForm.password} onChange={handleLogChange} name='password' type="password" id="password" className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" placeholder="Enter your password"/>
//                             </div>
//                             <button type="submit" className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
//                                 LOG IN
//                             </button>
//                             <p className=" cursor-pointer mt-4 text-sm text-red-500">Lost your password?</p>
//                             </form>
//                         </div>


//                         <div className="min-w-[100%] p-6 pt-2">
//                             <form onSubmit = {registerHandler} className = 'pt-4 flex flex-col gap-1'>
//                             <div className="mb-4">
//                                 <label htmlFor="username1" className="block text-sm font-medium text-gray-700">Username*</label>
//                                 <input  value={regForm.username} onChange={handleRegChange} required name='username' type="text" id="username1" className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" placeholder="Enter your username"/>
//                             </div>
//                             <div className="mb-4">
//                                 <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address *</label>
//                                 <input value={regForm.email} onChange={handleRegChange} required name='email' type="text" id="email" className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" placeholder="Enter your email"/>
//                             </div>
//                             <div className="mb-4">
//                                 <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">Profile Picture (optional)</label>
//                                 <input onChange={handleFileChange} name='avatar' type="file" id="avatar" className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"/>
//                             </div>
//                             <div className="mb-4">
//                                 <p className = 'text-sm font-medium text-gray-700'>Role</p>
//                                 <input onChange={handleRegChange} name='isFarmer' value={true} type="radio" id="farmer" className="border"/>
//                                 <label htmlFor="farmer" className="text-sm font-medium text-gray-700 pl-2 pr-12">Farmer</label>
//                                 <input onChange={handleRegChange} name='isFarmer' value={false} defaultChecked type="radio" id="consumer" className="border"/>
//                                 <label htmlFor="consumer" className="text-sm font-medium text-gray-700 pl-2">Consumer</label>
//                             </div>
//                             <div className="mb-4">
//                                 <label htmlFor="password1" className="block text-sm font-medium text-gray-700">Password *</label>
//                                 <input value={regForm.password} onChange={handleRegChange} required name='password' type="password" id="password1" className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" placeholder="Enter your password"/>
//                             </div>
//                             <button type="submit" className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
//                                 Register
//                             </button>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default Authentication
"use client"

import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { login } from "../../features/loginSlicer.js"
import { Loader2, User, Mail, Lock, Image } from "lucide-react"

const Authentication = () => {
  const [activeTab, setActiveTab] = useState("signin")
  const [regForm, setRegForm] = useState({ username: "", email: "", isFarmer: false, password: "" })
  const [logForm, setLogForm] = useState({ username: "", password: "" })
  const [file, setFile] = useState(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setFile(file)
  }

  const handleRegChange = (e) => {
    const { name, value } = e.target
    setRegForm({ ...regForm, [name]: value })
  }

  const handleLogChange = (e) => {
    const { name, value } = e.target
    setLogForm({ ...logForm, [name]: value })
  }

  const registerHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    const formdata = new FormData()
    Object.entries(regForm).forEach(([key, value]) => {
      formdata.append(key, value)
    })
    if (file) {
      formdata.append("avatar", file)
    }

    await axios
      .post(`${import.meta.env.VITE_BACKEND_API}/user/create`, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then((res) => {
        if (res.status < 400) {
          console.log("successfully registered")
          console.log(res.data.data)
          dispatch(login(res.data.data))
          navigate("/")
        } else {
          console.log("fail to register")
        }
      })
      .catch((err) => {
        console.log("error while registering user", err)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const loginHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    const loginData = {}
    Object.entries(logForm).forEach(([key, value]) => {
      loginData[key] = value
    })

    await axios
      .post(`${import.meta.env.VITE_BACKEND_API}/user/login`, loginData, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status < 400) {
          console.log("successfully logged in")
          console.log(res.data.data)
          dispatch(login(res.data.data))
          navigate("/")
        } else {
          console.log("fail to login")
        }
      })
      .catch((err) => {
        console.log("failed to login with axios", err.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white flex items-center justify-center p-4">
      {loading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col items-center">
            <Loader2 className="h-10 w-10 text-emerald-600 animate-spin mb-4" />
            <p className="text-gray-700 font-medium">Please wait...</p>
          </div>
        </div>
      )}

      <div className="w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab("signin")}
            className={`flex-1 py-4 text-center font-medium text-sm sm:text-base transition-colors duration-300 ${
              activeTab === "signin"
                ? "text-emerald-600 border-b-2 border-emerald-600"
                : "text-gray-500 hover:text-emerald-500"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setActiveTab("signup")}
            className={`flex-1 py-4 text-center font-medium text-sm sm:text-base transition-colors duration-300 ${
              activeTab === "signup"
                ? "text-emerald-600 border-b-2 border-emerald-600"
                : "text-gray-500 hover:text-emerald-500"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form Container */}
        <div className="p-6">
          {/* Sign In Form */}
          {activeTab === "signin" && (
            <form onSubmit={loginHandler} className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                  Username or Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    value={logForm.username}
                    onChange={handleLogChange}
                    className="pl-10 w-full py-2 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    placeholder="Enter your username or email"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={logForm.password}
                    onChange={handleLogChange}
                    className="pl-10 w-full py-2 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end">
                <button type="button" className="text-sm text-emerald-600 hover:text-emerald-800 font-medium">
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors shadow-md"
              >
                Sign In
              </button>
            </form>
          )}

          {/* Sign Up Form */}
          {activeTab === "signup" && (
            <form onSubmit={registerHandler} className="space-y-5">
              <div>
                <label htmlFor="username1" className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="username1"
                    name="username"
                    type="text"
                    required
                    value={regForm.username}
                    onChange={handleRegChange}
                    className="pl-10 w-full py-2 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    placeholder="Enter your username"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={regForm.email}
                    onChange={handleRegChange}
                    className="pl-10 w-full py-2 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="avatar" className="block text-sm font-medium text-gray-700 mb-1">
                  Profile Picture (optional)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Image className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="avatar"
                    name="avatar"
                    type="file"
                    onChange={handleFileChange}
                    className="pl-10 w-full py-2 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                <div className="flex space-x-6">
                  <div className="flex items-center">
                    <input
                      id="farmer"
                      name="isFarmer"
                      type="radio"
                      value={true}
                      onChange={handleRegChange}
                      className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300"
                    />
                    <label htmlFor="farmer" className="ml-2 block text-sm text-gray-700">
                      Farmer
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="consumer"
                      name="isFarmer"
                      type="radio"
                      value={false}
                      defaultChecked
                      onChange={handleRegChange}
                      className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300"
                    />
                    <label htmlFor="consumer" className="ml-2 block text-sm text-gray-700">
                      Consumer
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="password1" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password1"
                    name="password"
                    type="password"
                    required
                    value={regForm.password}
                    onChange={handleRegChange}
                    className="pl-10 w-full py-2 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors shadow-md"
              >
                Register
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default Authentication

