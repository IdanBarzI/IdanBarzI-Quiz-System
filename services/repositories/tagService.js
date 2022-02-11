const Tag = require("../../models/tag");

class TagService {
  async addTag(tag) {
    const newTag = new Tag(tag);
    await newTag.save();
    return { newTag };
  }
}

module.exports = TagService;