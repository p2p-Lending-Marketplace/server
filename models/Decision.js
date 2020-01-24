const { Schema, model } = require('mongoose')

const decisionSchema = new Schema(
  {
    application_id: {
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
    interest_rate: {
      type: Number,
      required: true,
    },
    loan_term: {
      type: Number,
      required: true,
    },
    additional_data: Object,
    status: {
      type: String,
      required: true,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending'
    },
  },
  { timestamps: true }
)

module.exports = model('Decision', decisionSchema)