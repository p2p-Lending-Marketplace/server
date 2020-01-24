const { Schema, model } = require('mongoose')

const applicationSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    fintech_id: {
      type: Schema.Types.ObjectId,
      ref: 'Fintech',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    objective: {
      type: String,
      required: true,
    },
    additional_data: Object,
    decisions: [{
      type: Schema.Types.ObjectId,
      ref: 'Decision',
      required: true
    }]
  },
  { timestamps: true }
)

module.exports = model('Application', applicationSchema)
