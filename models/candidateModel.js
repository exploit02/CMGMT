const mongoose = require('mongoose')
const validator = require('validator')

const candidateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    aadhar_no: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    phone_number: {
        type: String,
        required: true,
        trim: true
    },
    dob: {
        type: Date,
        required: true,
        trim: true
    },
    alternate_phone_number: {
        type: String,
        required: true,
        trim: true
    },
    address_1: {
        type: String,
        required: true,
        trim: true
    },
    address_2: {
        type: String,
        required: true,
        trim: true
    },
    city: {
        type: String,
        required: true,
        trim: true
    },
    district: {
        type: String,
        required: true,
        trim: true
    },
    state: {
        type: String,
        required: true,
        trim: true
    },
    country: {
        type: String,
        required: true,
        trim: true
    },
    gender: {
        type: String,
        required: true,
        trim: true
    },
    source: {
        type: String,
        required: true,
        trim: true
    },
    employment_status: {
        type: String,
        trim: true
    },
    source_type: {
        type: String,
        required: true,
        trim: true
    },
    occupation: {
        type: String,
        required: true,
        trim: true
    },
    annual_income: {
        type: String,
        required: true,
        trim: true
    },
    educational_qualification: {
        type: String,
        required: true,
        trim: true
    },
    successful_enterprises: {
        type: String,
        required: true,
        trim: true
    },
    failed_enterprises: {
        type: String,
        required: true,
        trim: true
    },
    bank_account: {
        type: Boolean,
        required: true,
        trim: true
    },
    credit_history: {
        type: Boolean,
        required: true,
        trim: true
    },
    has_assets: {
        type: String,
        
        trim: true
    },
    needs_training: {
        type: Boolean,
        required: true,
        trim: true
    },
    status: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid.')
            }
        }
    },
    versions: [{
    }]
},{
    timestamps : true
})

candidateSchema.statics.findByAadhar = async (aadhar_number) => {
    const candidate = await Candidate.findOne({aadhar_number})
    if (!candidate) {
        return false
    }
    return candidate;
}


const Candidate = mongoose.model("Candidate" , candidateSchema)


module.exports = Candidate