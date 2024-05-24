import mongoose from 'mongoose';
import validator from 'validator';
import validateAllowedFields from '../util/validateAllowedFields.ts';
import { logError, logInfo } from '../util/logging.js';

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  password: { type: String, required: true, minLength: 7 },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model('users', userSchema);

export const validateUser = (userObject, passwordRequired = true) => {
  const errorList = [];

  const allowedKeys = [];
  if (passwordRequired) {
    allowedKeys.push('userName');
    allowedKeys.push('email');
    allowedKeys.push('password');
    allowedKeys.push('confirmPassword');
  } else {
    allowedKeys.push('email');
    allowedKeys.push('userName');
  }

  const validatedKeysMessage = validateAllowedFields(userObject, allowedKeys);

  if (validatedKeysMessage.length > 0) {
    errorList.push(validatedKeysMessage);
  }

  const { email, password } = userObject;

  if (passwordRequired) {
    if (!password) {
      errorList.push('Password is a required field');
    }
    if (!validator.isLength(password, { min: 8 })) {
      errorList.push('Password must be at least 8 characters long');
    }
    if (!validator.isStrongPassword(password)) {
      errorList.push('Password is not strong enough');
    }
  }

  if (email == null) {
    errorList.push('Email is a required field');
  }

  return errorList;
};

export const deleteUserIfExpired = async () => {
  const currentDate = new Date();
  const threeDaysAgo = new Date();
  threeDaysAgo.setDate(currentDate.getDate() - 3);

  try {
    const usersToDelete = await User.find({
      userName: { $regex: 'OrganizerGuest2024' },
      createdAt: { $lt: threeDaysAgo },
    });

    if (usersToDelete.length > 0) {
      for (const user of usersToDelete) {
        await User.findByIdAndDelete(user._id);
      }

      logInfo('Users deleted successfully');
    } else {
      logInfo('No users to delete');
    }
  } catch (error) {
    logError('Error deleting users:', error);
  }
};

export default User;
