import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import Logo from "../../assets/login.png";
import api from "../../services/api";
import { login, logout, Authenticated } from "../../services/auth";

const sair = () => {
  logout();
  alert("Você realizou Logout !")
}


class Login extends Component {
  state = {
    UserName: "",
    password: "",
    error: "",
  };

  handleSignIn = async e => {
    e.preventDefault();
    const { UserName, password } = this.state;
    if (!UserName || !password) {
      this.setState({ error: "Preencha e-mail e senha para continuar!" });
    } else {
      try {
        const response = await api.post("/login", { UserName, password });
        login(response.data.token);
        this.props.history.push("/app");
      } catch (err) {
        this.setState({
          error:
            "Houve um problema com o login, verifique suas credenciais. de Acesso !"
        });
      }
    }
  };

  

  render() {
    return (
   <div className="container">
      <div style={{width: '20%', margin: '0 auto'}}>
           <img src={Logo} alt="Imagem logo" />
      </div>

{Authenticated() == null ?

    <form onSubmit={this.handleSignIn}>
       
      <div className="card border-info" style={{width: '40%', margin: '0 auto'}}>

             <div className="card-header">
                  <h4> Login</h4>
             </div>
             
             <div className="card-body">

                  {Authenticated() !== null && <div className="alert alert-danger" style={{border: '2px solid red'}} role="alert">teste login aut</div>}

                  {this.state.error && <div className="alert alert-danger" style={{border: '2px solid red'}} role="alert">{this.state.error}</div>}

                   <div className="form-Group">
                       <label>E-mail</label>
                       <input type="email" className="form-control" name="email"  placeholder="Informe o e-mail"  onChange={e => this.setState({ UserName: e.target.value })}/>
                   </div>

                  
                   <div className="form-Group">
                       <label>Senha</label>
                       <input type="password" className="form-control" name="password"  placeholder="Informe a senha"  onChange={e => this.setState({ password: e.target.value })}/>
                   </div>

                   <div className="row">
                        <div className="col-md 6">
                            <button className="btn btn-primary" style={{width: 150, marginTop: 10}} type="submit">Login</button>
                        </div>
                        <div className="col-md 6" style={{textAlign: "right"}}>
                            <button className="btn btn-danger" style={{width: 150, marginTop: 10}} onClick={sair}>Cancelar</button>
                        </div>
                      
                   </div>
             </div>
      </div>
  
  </form>

    
 :   <>
     <h1 style={{textAlign: "center"}}>Você esta Logando no Sistema.</h1>
     <h3>Para Sair clique no botão abaixo</h3>
     <button className="btn btn-danger" onClick={sair}>Realizar Logout</button>
     </>} 

 
  </div>
  );
    
  }
}

export default withRouter(Login);