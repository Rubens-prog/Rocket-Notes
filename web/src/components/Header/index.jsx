import { RiShutDownLine } from "react-icons/ri";
import { Container, Profile, Logout } from "./styles";
import { useAuth } from "../../hooks/auth";
import { api } from "../../services/api";
import avatarDefault from "../../assets/profile.svg";
import { useNavigate } from "react-router-dom";

export function Header() {
  const { signOut, user } = useAuth();

  const navigate = useNavigate();

  const avatarURL = user.avatar
    ? `${api.defaults.baseURL}/files/${user.avatar}`
    : avatarDefault;

  function handleSignOut() {
    navigate("/");
    signOut();
  }

  return (
    <>
      <Container>
        <Profile to="/profile">
          <img src={avatarURL} alt={`Foto de ${user.name}`} />
          <div>
            <span>Bem Vindo</span>
            <strong>{user.name}</strong>
          </div>
        </Profile>
        <Logout onClick={handleSignOut}>
          <RiShutDownLine />
        </Logout>
      </Container>
    </>
  );
}
