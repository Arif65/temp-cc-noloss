const mongoose = require("mongoose");

const ArchiveSchema = mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    topic: {
      type: String,
      required: true,
    },
    input: {
      type: mongoose.Schema.Types.Mixed, 
      required: true,
    },
    target: {
      type: String, 
      required: true,
    },
    verdict: {
      type: String,
      required: true,
    },
    analysis: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Archive = mongoose.model("Archive", ArchiveSchema);
module.exports = Archive;