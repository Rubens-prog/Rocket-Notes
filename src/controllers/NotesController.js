const AppError = require("../utils/AppError");

const knex = require("../database/knex");

class NotesController {
  async index(request, response) {
    const { user_id, title, tags } = request.query;

    let notes;

    if (tags) {
      const arrayTags = tags.split(",").map((tag) => tag.trim());
      const query = knex("tags");

      query
        .select([
          "notes.id",
          "notes.title",
          "notes.user_id",
          "notes.description",
        ])
        .innerJoin("notes", "notes.id", "tags.note_id")
        .where("notes.user_id", user_id)
        .where((builder) => {
          builder.where((innerBuilder) => {
            for (const tag of arrayTags) {
              innerBuilder.orWhere("tags.name", "like", `%${tag}%`);
            }
          });
        })
        .orderBy("notes.id", "asc")
        .groupBy("notes.id");

      // const repeatedIds = new Set();
      // const repeatedResults = await query;
      // return response.json(repeatedResults);
      // const uniqueArray = repeatedResults.filter((tag) => {
      //   if (repeatedIds.has(tag.id)) {
      //     return false;
      //   }
      //   repeatedIds.add(tag.id);
      //   return true;
      // });

      notes = await query;
    } else {
      notes = await knex("notes")
        .where({ user_id })
        .whereLike("title", `%${title}%`)
        .orderBy("title");
    }
    const userTags = await knex("tags").where({ user_id });

    const noteWithTags = notes.map((note) => {
      const noteTags = userTags.filter((tag) => tag.note_id === note.id);
      return {
        ...note,
        tags: noteTags,
      };
    });

    return response.json(noteWithTags);
  }

  async create(request, response) {
    const { title, description, tags, links } = request.body;
    const { user_id } = request.params;

    const note_id = await knex("notes").insert({
      title,
      description,
      user_id,
    });
    console.log(note_id);
    return response.json(note_id);
    // const linksInsert = links.map((link) => {
    //   return {
    //     note_id,
    //     url: link,
    //   };
    // });

    // await knex("links").insert(linksInsert);

    // const tagsInsert = tags.map((name) => {
    //   return {
    //     note_id,
    //     name,
    //     user_id,
    //   };
    // });

    // await knex("tags").insert(tagsInsert);

    // if (!title) {
    //   throw new AppError("Sem nome");
    // } else {
    //   return response.json({ message: "parabeinzi" });
    // }
  }

  async show(request, response) {
    const { id } = request.params;

    const note = await knex("notes").where({ id }).first();
    const links = await knex("links")
      .where({ note_id: id })
      .orderBy("created_at");
    const tags = await knex("tags").where({ note_id: id }).orderBy("name");

    return response.json({ ...note, links, tags });
  }

  async update(request, response) {
    const { title } = request.body;

    if (!title) {
      throw new AppError("Sem nome no update");
    } else {
      return response.json({ message: "parabeinzi no update" });
    }
  }

  async delete(request, response) {
    const { id } = request.params;

    const findNote = await knex("notes").where({ id }).first();

    if (!findNote) {
      throw new AppError("Nota não encontrada!");
    }

    await knex("notes").where({ id }).delete();

    return response.json({ message: "Deletado com sucesso!" });
  }
}

module.exports = NotesController;
