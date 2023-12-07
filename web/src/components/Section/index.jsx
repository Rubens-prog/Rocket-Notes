import * as S from "./styles";

export function Section(props) {
  const { title, children } = props;
  return (
    <S.Container>
      <h2>{title}</h2>
      {children}
    </S.Container>
  );
}
