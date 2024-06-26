
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp.jsx'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute.jsx'
import CreatePost from './pages/CreatePost.jsx'
import UpdatePost from './pages/UpdatePost.jsx'
import PostPage from './pages/PostPage.jsx'
import Search from './pages/Search.jsx'
import { ToastContainer } from 'react-toastify'
import { useEffect } from 'react'




export default function App() {
  return (
    <>


      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route element={<PrivateRoute />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route element={<OnlyAdminPrivateRoute />} />
          <Route path='/create-post' element={<CreatePost />} />
          <Route path="/projects" element={<Projects />} />
          <Route path='/update-post/:postId' element={<UpdatePost />} />
          <Route path='/post/:postSlug' element={<PostPage />} />
          <Route path='/search' element={<Search />} />

        </Routes>
        <Footer />
      </BrowserRouter>
      <ToastContainer />

    </>

  )
}

