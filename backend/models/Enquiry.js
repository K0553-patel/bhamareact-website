import mongoose from 'mongoose';
import validator from 'validator';

const enquirySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required']
    },
    message: {
        type: String,
        required: [true, 'Message is required']
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    type: {
        type: String,
        enum: ['general', 'product'],
        default: 'general'
    },
    status: {
        type: String,
        enum: ['new', 'pending', 'resolved'],
        default: 'new'
    },
    isRead: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Enquiry = mongoose.model('Enquiry', enquirySchema);
export default Enquiry;
