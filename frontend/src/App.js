import { useEffect } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signin from "./pages/Signin";
import userStore from './store/user-store';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import MyReports from "./pages/MyReports";
import NewReport from "./pages/NewReport";
import TextInput from "./components/TextInput";
import ImageInput from "./components/ImageInput";
import Result from "./components/Result";
import TemplateInput from "./components/TemplateInput";
import EditReport from "./pages/EditReport";
function App() {
  const initiallizer = userStore((state) => state.initiallizer);

  useEffect(() => {
    initiallizer();
  },[initiallizer]);
  return (
    <div className="w-full h-full flex items-center justify-center font-mono">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/register" element={<Signin/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/reports" element={<MyReports/>}/>
          <Route path="/new-report" element={<NewReport/>}>
            <Route path="template" element={<TemplateInput/>}/>
            <Route path="text" element={<TextInput/>}/>
            <Route path="image" element={<ImageInput/>}/>
            <Route path="result" element={<Result/>}/>
          </Route>
          <Route path='/edit-report/:id' element={<EditReport/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
