import mongoose from 'mongoose';

const reportSchema = mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        amount: { type: Number, required: true },
        isPaid: { type: Boolean, default: false },
        user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    },
    { timestamps: true }
);

const Report = mongoose.model('Report', reportSchema);

export default Report;
