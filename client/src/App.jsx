import { BrowserRouter, Routes, Route , Outlet } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import SignUp from './pages/SignUp';
import Header from './components/Header';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute';
import CreatePost from './pages/CreatePost';
import UpdatePost from './pages/UpdatePost';
import PostPage from './pages/PostPage';
import ScrollToTop from './components/ScrollToTop';
import Search from './pages/Search';
import PortfolioPage from './pages/portfolio';
import Skills from './components/Skills';
import Education from './components/Education';
import ExperiencePage from './pages/Experiencepage';
import ProjectPage from './pages/Projectpage';
import NotFound from './pages/pageunderconstruction';
import AddEducation from './pages/addeducation';
const Layout = () => {
  return (
    <>
      <Header />
      <Outlet /> 
      <Footer />
    </>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Routes with Header and Footer */}
        <Route element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/search' element={<Search />} />
          <Route element={<PrivateRoute />}>
            <Route path='/dashboard' element={<Dashboard />} />
          </Route>
          <Route element={<OnlyAdminPrivateRoute />}>
            <Route path='/create-post' element={<CreatePost />} />
            <Route path='/update-post/:postId' element={<UpdatePost />} />  
            <Route path='/add-education' element={<AddEducation />} />
            
          </Route>
          <Route path='/projects' element={<Projects />} />
          <Route path='/post/:postSlug' element={<PostPage />} />
        </Route>

       
        <Route path='/portfolio' element={<PortfolioPage />} />
        <Route path='portfolio/skills' element={ <Skills/> }/>
        <Route path='portfolio/eduction' element={ <Education /> }/>
        <Route path='portfolio/experience' element={ <ExperiencePage/>} />
        <Route path='portfolio/projects' element={<ProjectPage/>}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}