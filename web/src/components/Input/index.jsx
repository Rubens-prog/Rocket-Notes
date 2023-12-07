import { Container } from "./styles";

export function Input(props) {
  const { icon: Icon, ...rest } = props;
  return (
    <Container>
      {Icon && <Icon size={20} />}
      <input {...rest} />
    </Container>
  );
}
