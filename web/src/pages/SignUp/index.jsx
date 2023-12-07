import { FiUser, FiMail, FiLock } from "react-icons/fi";
import { Container, Form, Background } from "./styles";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { api } from "../../services/api";

const loginPayload = {
  name: "",
  email: "",
  password: "",
};

export function SignUp() {
  const [login, setLogin] = useState(loginPayload);

  const navigate = useNavigate();

  function handleSignUp(data) {
    const { name, email, password } = data;

    if (!name || !email || !password) {
      return alert("Preencha todos os campos!");
    }
    api.post("/users", data).then(() => {
      alert("Usuário cadastrado com sucesso!");
      navigate("/");
    });
  }

  return (
    <Container>
      <Background />

      <Form>
        <h1>Rocket Notes</h1>
        <p>Aplicação para salvar e gerenciar links úteis.</p>
        <h2>Crie sua conta</h2>

        <Input
          type="text"
          placeholder="Nome"
          icon={FiUser}
          onChange={(e) => setLogin({ ...login, name: e.target.value })}
        />
        <Input
          type="text"
          placeholder="E-mail"
          icon={FiMail}
          onChange={(e) => setLogin({ ...login, email: e.target.value })}
        />
        <Input
          type="password"
          placeholder="E-mail"
          icon={FiLock}
          onChange={(e) => setLogin({ ...login, password: e.target.value })}
        />

        <Button text="Entrar" onClick={() => handleSignUp(login)} />

        <Link to="/">Voltar para o login</Link>
      </Form>
    </Container>
  );
}
