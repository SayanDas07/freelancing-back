import { User } from '../models/user.model.js';
import { Employee } from '../models/employee.model.js';
import { Employer } from '../models/employer.model.js';
import { asyncHandler } from '../utils/asyncHandeler.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const registerUser = asyncHandler(async (req, res) => {
    const role = req.query.role
    const { username, email, password } = req.body
    

    // Check if the username or email already exists
    const existedUser = await User.findOne({ $or: [{ username }, { email }] })
    
    //console.log(`Found user: ${existedUser}`)

    if (existedUser) {
        return res.status(400).json({ message: "Username or Email already exists" })
    }

    let user
    if (role === 'employee') {
        user = new Employee({ username, email, password, role })
    } else if (role === 'employer') {
        user = new Employer({ username, email, password, role })
    } else {
        return res.status(400).json({ message: 'Choose your correct role from the dropdown', success: false })
    }

    await user.save()

    if (!user) {
        return res.status(401).json({ message: 'User not created', success: false })
    }

    const createdUser = await User.findById(user._id).select('-password -refreshToken')
    if (!createdUser) {
        return res.status(401).json({ message: 'User not created successfully', success: false })
    }

    res.status(201).json(new ApiResponse(201, createdUser, 'User registered successfully'))
});


export { registerUser }
