import React, { Component } from "react";

import { Card } from 'react-bootstrap';

import { Link } from "react-router-dom";

import api from "../../services/api";


const home = () => {
  document.location.href="/"
}

class SignUp extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    error: ""
  };
  

  handleSignUp = async e => {
    e.preventDefault();
    const { username, email, password } = this.state;

    if(username !== document.getElementById("passwordc").value)
    {
      this.setState({ error: "A senha digita no confirma senha Diferente !" });
      return null
    }

      
    if (!username || !email || !password) {
      this.setState({ error: "Preencha todos os dados para se cadastrar" });
    } else {
      try {
        await api.post("/users", { username, email, password });
        this.props.history.push("/");
      } catch (err) {
        console.log(err);
        this.setState({ error: "Ocorreu um erro ao tentar registrar o usuario !" });
      }
    }
  };
  

  render() {
    return (
   <div className="container">
     
    <form onSubmit={this.handleSignUp}>
       
      <div className="card border-info" style={{width: '50%', margin: '0 auto', marginTop: "100px"}}>

             <div className="card-header">
                  <h4> Cadastrar usuario</h4>
             </div>
             
             <div className="card-body">

                  {this.state.error && <div className="alert alert-danger" style={{border: '2px solid red'}} role="alert">{this.state.error}</div>}

                   <div className="form-Group">
                       <label>Nome Usuario</label>
                       <input type="text" className="form-control" name="user"  placeholder="Informe o nome do usuario"  onChange={e => this.setState({ username: e.target.value })}/>
                   </div>
                   <div className="form-Group">
                       <label>E-mail</label>
                       <input type="email" className="form-control" name="email"  placeholder="Informe o e-mail"  onChange={e => this.setState({ email: e.target.value })}/>
                   </div>

                   <div className="row">
                     <div className="col-md 6">
                         <label>Senha</label>
                         <input type="password" className="form-control" name="password"  placeholder="Informe a senha"  onChange={e => this.setState({ password: e.target.value })}/>
                     </div>
                     <div className="col-md 6">
                         <label>Confirma Senha</label>
                         <input type="password" className="form-control" id="passwordc" name="passwordc"  placeholder="Confirme a senha" />
                     </div>
                      
                   </div>

                   <div className="row">
                        <div className="col-md 6">
                            <button className="btn btn-primary" style={{width: 150, marginTop: 10}} type="submit">Cadastrar usuario</button>
                        </div>
                        <div className="col-md 6" style={{textAlign: "right"}}>
                            <button className="btn btn-danger" style={{width: 150, marginTop: 10}} onClick={home}>Cancelar</button>
                        </div>
                      
                   </div>

                  

                  
             </div>
      </div>
  
  </form>


  </div>

  
     );
    
  }
}

export default SignUp;