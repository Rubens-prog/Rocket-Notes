import { Container } from "./styles";

export function Button(props) {
  const { text, loading = false, variant, active = "false", ...rest } = props;

  return (
    <>
      <Container
        disabled={loading}
        $active={active.toString()}
        $variant={variant}
        type="button"
        {...rest}
      >
        {loading ? "Carregando..." : text}
      </Container>
    </>
  );
}
