const mongoose = require('mongoose');
const slugify = require('slugify');

const shopSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'Please enter a store name!'
    },
    slug: String,
    description: {
        type: String,
        trim: true
    },
    tags: [String]
});
shopSchema.pre('save', function (next) {
    if (!this.isModified('name')) {
        next(); // skip it
        return; // stop this function from running
    }
    this.slug = slugify(this.name); //create URL friendly slug from the name
    next();
    // TODO make more resiliant so slugs are unique
});

module.exports = mongoose.model('Shop', shopSchema);