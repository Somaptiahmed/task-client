// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import "./index.css";
// import {
//   createBrowserRouter,
//   RouterProvider,
// } from "react-router-dom";
// import Home from "./Pages/Home";
// import ToDoList from "./Components/ToDoList";
// import InProgressList from "./Components/InProgressList";
// import DoneList from "./Components/DoneList";
// import TaskBoard from "./Components/TaskBoard";
// import AuthLayout from "./Layout/AuthLayout";


// const router = createBrowserRouter([

//     path: '/',
//     element: <AuthLayout />,
//     children: [
//       { path: '/toDo', element: <ToDoList /> },
//       { path: '/inProgress', element: <InProgressList /> },
//       { path: '/done', element: <DoneList /> },
//       { path: '/', element: <TaskBoard /> },
//     ],
//     {
//         path: "/",
//         element: <Home />,
        
//       },
 
//   {
//     path: "/toDo",
//     element: <ToDoList />,
    
//   },
//   {
//     path: "/inProgress",
//     element: <InProgressList />,
    
//   },
//   {
//     path: "/done",
//     element: <DoneList />,
    
//   },
//   {
//     path: "/task",
//     element: <TaskBoard />,
    
//   },
  
 
// ]);

// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//    <RouterProvider router={router} />
//   </StrictMode>
// );


import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./Pages/Home";
import ToDoList from "./Components/ToDoList";
import InProgressList from "./Components/InProgressList";
import DoneList from "./Components/DoneList";
import TaskBoard from "./Components/TaskBoard";
import AuthLayout from "./Layout/AuthLayout";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import AuthProvider from "./Provider/AuthProvider";
import { ToastContainer } from "react-toastify";

const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthLayout />, 
    children: [
      { path: '/', element: <Home /> },
      { path: '/toDo', element: <ToDoList /> },
      { path: '/inProgress', element: <InProgressList /> },
      { path: '/done', element: <DoneList /> },
      { path: '/task', element: <TaskBoard /> },
    ],
  },
  {
    path: '/login',
    element: <Login></Login>
  },
  {
    path: '/signUp',
    element: <SignUp></SignUp>
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
    <RouterProvider router={router} />
    <ToastContainer />
    </AuthProvider>
  </StrictMode>
);
