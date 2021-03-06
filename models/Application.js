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
    loan_term: {
      type: Number,
      required: true,
    },
    objective: {
      type: String,
      required: true,
    },
    additional_data: String,
    decision: {
      type: String,
      required: true,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending',
    },
    status: {
      type: String,
      required: true,
      enum: ['active', 'selected', 'closed'],
      default: 'active',
    },
  },
  { timestamps: true }
)

module.exports = model('Application', applicationSchema)
