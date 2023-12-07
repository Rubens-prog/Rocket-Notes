import { Container } from "./styles";

export function Tag(props) {
  const { title, ...rest } = props;
  return (
    <>
      <Container {...rest}>{title}</Container>
    </>
  );
}
