const Tag = require("../../models/tag");

class TagService {
  async addTag(tag) {
    const newTag = new Tag(tag);
    await newTag.save();
    return newTag ;
  }

  async getAllTags(){
    const tags = await Tag.find({});
    return tags;
  }

  async getByTitle(title){
    const tag =await Tag.findOne({title:title})
    return tag
  }
}

module.exports = TagService;