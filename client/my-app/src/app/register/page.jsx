import "../styleguide.css"
import "../global.css"
import "./style.css"
import NavNavMenu from "../components/NavNavMenu/NavNavMenu"
import { RegisterForm } from "../components/Register"

export default function Register() {
    return (<div className="background">
    <RegisterForm></RegisterForm>
    </div>)
    
    
  }