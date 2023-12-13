const mongoose = require('mongoose');

const genpdf = new mongoose.Schema({

  orders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'order',
  }],
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
});

module.exports = mongoose.model("genpdf",genpdf);
