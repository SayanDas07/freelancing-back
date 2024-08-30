import mongoose,{Schema} from "mongoose";

const employeeSchema = new Schema({
    resumeUrl: {
        type: String
    },
    atsScore: {
        type: Number,
        min: 0,
        max: 100
    },
    skills: [{
        type: String
    }],
    jobPreferences: {
        type: String
    },
    availabilityStatus: {
        type: String,
        enum: ['available', 'busy', 'not available'],
        default: 'available'
    },
    //rating given by employer
    averageRating: {
        type: Number,
        default: 0
    }
})

const Employee = User.discriminator('employee', employeeSchema);
