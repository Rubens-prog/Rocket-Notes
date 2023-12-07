import { useNavigate } from "react-router-dom";
import { Container, Form } from "./styles";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { Textarea } from "../../components/Textarea";
import { Section } from "../../components/Section";
import { NoteIem } from "../../components/NoteIem";
import { Button } from "../../components/Button";
import { useState } from "react";
import { api } from "../../services/api";

export function New() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [links, setLinks] = useState([]);
  const [newLink, setNewLink] = useState("");

  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");

  const navigate = useNavigate();

  function handleAddLink() {
    if (!newLink) {
      return;
    }

    setLinks((prevState) => [...prevState, newLink]);
    setNewLink("");
  }

  function handleRemoveLink(linkToRemove) {
    const filterLinks = links.filter((link) => link !== linkToRemove);

    setLinks(filterLinks);
  }

  function handleAddTag() {
    if (!newTag) {
      return;
    }
    setTags((prevState) => [...prevState, newTag]);
    setNewTag("");
  }

  function handleRemoveTag(tagToRemove) {
    const filterTags = tags.filter((tag) => tag !== tagToRemove);

    setTags(filterTags);
  }

  async function handleAddNewNote() {
    if (newLink) {
      return alert("Adicione ou limpe o campo de links");
    }

    if (newTag) {
      return alert("Adicione ou limpe o campo de tags");
    }

    if (!title) {
      return alert("O campo título é obrigatório");
    }

    try {
      await api.post("/notes", {
        title,
        description,
        tags,
        links,
      });

      alert("Nota cadastrada com sucesso!");

      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  }

  function handleBack() {
    navigate(-1);
  }

  return (
    <Container>
      <Header />
      <main>
        <Form>
          <header>
            <h1>Criar Nota</h1>

            <Button text="voltar" variant="textButton" onClick={handleBack} />
          </header>

          <Input
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            placeholder="Observações"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Section title="Links úteis">
            {links.map((link, index) => (
              <NoteIem
                key={index}
                value={link}
                onClick={() => {
                  handleRemoveLink(link);
                }}
              />
            ))}
            <NoteIem
              isNew
              placeholder="Novo link"
              value={newLink}
              onChange={(e) => setNewLink(e.target.value)}
              onClick={handleAddLink}
            />
          </Section>

          <Section title="Marcadores">
            <div className="tags">
              {tags.map((tag, index) => (
                <NoteIem
                  key={index}
                  value={tag}
                  onClick={() => {
                    handleRemoveTag(tag);
                  }}
                />
              ))}
              <NoteIem
                isNew
                placeholder="Nova tag"
                onChange={(e) => setNewTag(e.target.value)}
                value={newTag}
                onClick={handleAddTag}
              />
            </div>
          </Section>

          <Button text="Salvar" onClick={handleAddNewNote} />
        </Form>
      </main>
    </Container>
  );
}
