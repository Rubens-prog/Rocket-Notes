import { Container } from "./styles";

export function Textarea(props) {
  const { value, ...rest } = props;
  return <Container {...rest}>{value}</Container>;
}
