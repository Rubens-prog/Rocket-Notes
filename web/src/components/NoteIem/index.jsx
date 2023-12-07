import { FiPlus, FiX } from "react-icons/fi";
import { Container } from "./styles";

export function NoteIem(props) {
  const { isNew, value, onClick, ...rest } = props;
  return (
    <Container isNew={isNew}>
      <input type="text" value={value} readOnly={!isNew} {...rest} />
      <button
        type="button"
        onClick={onClick}
        className={isNew ? "button-add" : "button-delete"}
      >
        {isNew ? <FiPlus /> : <FiX />}
      </button>
    </Container>
  );
}
