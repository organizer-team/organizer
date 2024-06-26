import User, { validateUser } from '../models/User.js';
import { logError } from '../util/logging.js';
import validationErrorMessage from '../util/validationErrorMessage.js';

// Load our .env variables
import dotenv from 'dotenv';
dotenv.config();
// Hashing passwords
import bcryptjs from 'bcryptjs';
const salt = bcryptjs.genSaltSync();
import jwt from 'jsonwebtoken';
const secret = process.env.JWT_SECRET;

// Function to verify user credentials and return a boolean indicating success
const verifyUserCredentials = async (user, password) => {
  if (user == null) {
    logError('User object is required');
    return false;
  }

  if (password == null) {
    logError('Password is required');
    return false;
  }

  try {
    const passwordCheck = bcryptjs.compareSync(user?.password, password);

    if (passwordCheck) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    logError(error);
    return false;
  }
};

// Function to generate a token based on user ID
const generateToken = (userId) => {
  return new Promise((resolve, reject) => {
    jwt.sign({ id: userId }, secret, {}, (error, token) => {
      if (error) {
        reject(error);
      } else {
        resolve(token);
      }
    });
  });
};

/** GET USERS
 *
 * @route GET /api/users/
 * @desc Get all users
 */
export const getUsers = async (request, response) => {
  try {
    const users = await User.find();
    response.status(200).json({ success: true, result: users });
  } catch (error) {
    logError(error);
    response
      .status(500)
      .json({ success: false, message: 'Unable to get users' });
  }
};

/** GET USER BY ID
 *
 * @route GET /api/user/_id
 * @desc Get an user by id
 */
export const getUserById = async (request, response) => {
  try {
    const { _id } = request.params;
    const user = await User.findById(_id);
    if (!user) {
      response.status(404).json({ success: false, message: 'User not found' });
      return;
    }
    const { userName, email } = user;
    response
      .status(200)
      .json({ success: true, result: { userId: user._id, userName, email } });
  } catch (error) {
    logError(error);
    response
      .status(500)
      .json({ success: false, message: 'Unable to get user by id' });
  }
};

/** CREATE USER
 *
 * @route POST /api/user/register/
 * @desc Create a new user with email and password
 */
export const createUser = async (request, response) => {
  try {
    const { user } = request.body;

    if (typeof user !== 'object') {
      response.status(400).json({
        success: false,
        message: `Provide a 'user' object. Received: ${JSON.stringify(user)}`,
      });

      return;
    }

    if (!user.userName || user.userName.length < 1) {
      response.status(400).json({
        success: false,
        message: 'Name is a required field',
      });
      return;
    }

    if (!user.password || user.password.length < 1) {
      response.status(400).json({
        success: false,
        message: 'Password is a required field',
      });
      return;
    }

    if (!user.confirmPassword || user.confirmPassword.length < 1) {
      response.status(400).json({
        success: false,
        message: 'Confirm password is a required field',
      });
      return;
    }

    if (user.password !== user.confirmPassword) {
      response.status(400).json({
        success: false,
        message: 'Passwords do not match',
      });
      return;
    }

    const errorList = validateUser(user);

    if (errorList.length > 0) {
      response.status(400).json({
        success: false,
        message: validationErrorMessage(errorList),
      });
    } else {
      const { userName, email, password } = user;

      // Check if a user with the same email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        response.status(409).json({
          success: false,
          message: 'A user with this email already exists',
        });
        return;
      }

      const hashedPassword = bcryptjs.hashSync(password, salt);

      const newUser = await User.create({
        userName,
        email,
        password: hashedPassword,
      });

      // Generate token for the new user
      const token = await generateToken(newUser._id);

      response
        .status(201)
        .cookie('token', token)
        .json({
          success: true,
          user: {
            userId: newUser._id,
            userName: newUser.userName,
            email: newUser.email,
          },
        });
    }
  } catch (error) {
    logError(error);
    response
      .status(500)
      .json({ success: false, message: 'Failed to create user' });
  }
};

/** CREATE GUEST USER
 *
 * @route POST /api/user/registerGuest/
 * @desc Create a new guest user with email and password
 */
export const createGuestUser = async (request, response) => {
  try {
    const { guestName } = request.body;

    const user = {
      userName: guestName,
      password: 'qweQWE123!',
      email: `${guestName}@guestEmail.com`,
    };

    if (typeof guestName !== 'string') {
      response.status(400).json({
        success: false,
        message: `Provide a 'guestName'. Received: ${JSON.stringify(guestName)}`,
      });

      return;
    }

    const errorList = validateUser(user);

    if (errorList.length > 0) {
      response.status(400).json({
        success: false,
        message: validationErrorMessage(errorList),
      });
    } else {
      const { userName, email, password } = user;

      // Check if a user with the same email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        response.status(409).json({
          success: false,
          message: 'A user with this email already exists',
        });
        return;
      }

      const hashedPassword = bcryptjs.hashSync(password, salt);

      const newUser = await User.create({
        userName,
        email,
        password: hashedPassword,
      });

      // Generate token for the new user
      const token = await generateToken(newUser._id);

      response
        .status(201)
        .cookie('token', token)
        .json({
          success: true,
          user: {
            userId: newUser._id,
            userName: newUser.userName,
            email: newUser.email,
          },
        });
    }
  } catch (error) {
    logError(error);
    response
      .status(500)
      .json({ success: false, message: 'Failed to create user' });
  }
};

/** LOG IN USER
 *
 * @route POST /api/user/login/
 * @desc Checks email and password and attaches token to cookies if valid
 */

export const login = async (request, response) => {
  try {
    const { user } = request.body;

    if (typeof user !== 'object') {
      response.status(400).json({
        success: false,
        message: `Provide a 'user' object. Received: ${JSON.stringify(user)}`,
      });
      return;
    }

    if (user.password == null) {
      response.status(400).json({
        success: false,
        message: 'Password is a required field',
      });
      return;
    }

    const errorList = validateUser(user);

    if (errorList.length > 0) {
      response.status(400).json({
        success: false,
        message: validationErrorMessage(errorList),
      });
    } else {
      const userInDB = await User.findOne({ email: user?.email });

      if (userInDB) {
        const verificationResult = await verifyUserCredentials(
          user,
          userInDB.password
        );
        if (verificationResult) {
          const token = await generateToken(userInDB._id);
          response
            .status(200)
            .cookie('token', token)
            .json({
              success: true,
              user: {
                userId: userInDB._id,
                userName: userInDB.userName,
                email: userInDB.email,
              },
            });
        } else {
          response
            .status(400)
            .json({ success: false, message: 'Wrong password' });
        }
      } else {
        response
          .status(404)
          .json({ success: false, message: 'User not found' });
      }
    }
  } catch (error) {
    logError(error);
    response
      .status(500)
      .json({ success: false, message: 'Failed to log in user' });
  }
};

/** LOG OUT USER
 *
 * @route GET /api/user/logout/
 * @desc Removes token from cookies and always response with success
 */
export const logout = async (request, response) => {
  try {
    response.status(200).cookie('token', '').json({
      success: true,
    });
  } catch (error) {
    logError(error);
    response
      .status(500)
      .json({ success: false, message: 'Failed to log out user' });
  }
};

/** GET USER PROFILE
 *
 * @route GET /api/user/profile/
 * @desc Checks token and returns user id
 */
export const getProfile = async (request, response) => {
  try {
    const { token } = request.cookies;

    if (token) {
      jwt.verify(token, secret, {}, async (error, info) => {
        if (error) {
          response
            .status(498)
            .json({ success: false, message: 'Invalid token' });
        } else {
          const user = await User.findById(info.id);
          if (!user) {
            response
              .status(200)
              .json({ success: true, message: 'User not found' });
          } else {
            response.status(200).json({
              success: true,
              user: info,
            });
          }
        }
      });
    } else {
      response.status(499).json({
        success: false,
        message: 'Token is required but was not submitted ',
      });
    }
  } catch (error) {
    logError(error);
    response
      .status(500)
      .json({ success: false, message: 'Failed to get user profile' });
  }
};

/** UPDATE USER PROFILE
 *
 * @route PUT /api/user/update/
 * @desc Update a user with new data
 */
export const updateUser = async (request, response) => {
  try {
    const { token } = request.cookies;

    if (token) {
      jwt.verify(token, secret, {}, async (error, info) => {
        if (error) {
          response
            .status(498)
            .json({ success: false, message: 'Invalid token' });
        } else {
          const { user } = request.body;

          if (typeof user !== 'object') {
            response.status(400).json({
              success: false,
              message: `Provide a 'user' object. Received: ${JSON.stringify(
                user
              )}`,
            });

            return;
          }

          const errorList = validateUser(user, false);

          if (errorList.length > 0) {
            response.status(400).json({
              success: false,
              message: validationErrorMessage(errorList),
            });
          } else {
            const { email, userName } = user;

            const userId = info.id;
            const userInDB = await User.findById(userId);
            userInDB.email = email;
            userInDB.userName = userName;
            const updatedUser = await userInDB.save();

            response.status(200).json({
              success: true,
              user: { id: updatedUser._id },
            });
          }
        }
      });
    } else {
      response.status(499).json({
        success: false,
        message: 'Token is required but was not submitted ',
      });
    }
  } catch (error) {
    logError(error);
    response
      .status(500)
      .json({ success: false, message: 'Failed to update user profile' });
  }
};

/** UPDATE USER PASSWORD
 *
 * @route PUT /api/user/update/password
 * @desc Update a user with new password
 */
export const updatePassword = async (request, response) => {
  try {
    const { token } = request.cookies;

    if (token) {
      jwt.verify(token, secret, {}, async (error, info) => {
        if (error) {
          response
            .status(498)
            .json({ success: false, message: 'Invalid token' });
        } else {
          const { user } = request.body;

          if (typeof user !== 'object') {
            response.status(400).json({
              success: false,
              message: `Provide a 'user' object. Received: ${JSON.stringify(
                request.body
              )}`,
            });

            return;
          }

          const allowedFields = ['oldPassword', 'newPassword'];
          const invalidFields = [];

          Object.keys(user).forEach((field) => {
            if (!allowedFields.includes(field)) {
              invalidFields.push(field);
            }
          });

          if (
            !user?.oldPassword ||
            !user?.newPassword ||
            invalidFields.length > 0
          ) {
            response.status(400).json({
              success: false,
              message: `Provide a 'user' object containing oldPassword and newPassword. The following properties are not allowed to be set: ${invalidFields.join(
                ', '
              )}`,
            });
          } else {
            const { oldPassword, newPassword } = user;

            const userId = info.id;
            const userInDB = await User.findById(userId);

            // Check if the old password matches the one in the database
            const isPasswordMatch = await bcryptjs.compare(
              oldPassword,
              userInDB.password
            );

            if (!isPasswordMatch) {
              response.status(400).json({
                success: false,
                message: 'Old password is incorrect',
              });
              return;
            }

            // Hash the new password
            const hashedPassword = await bcryptjs.hash(newPassword, salt);

            userInDB.password = hashedPassword;
            const updatedUser = await userInDB.save();

            response.status(200).json({
              success: true,
              user: { id: updatedUser._id },
            });
          }
        }
      });
    } else {
      response.status(499).json({
        success: false,
        message: 'Token is required but was not submitted ',
      });
    }
  } catch (error) {
    logError(error);
    response
      .status(500)
      .json({ success: false, message: 'Failed to update user password' });
  }
};

/** DELETE USER PROFILE
 *
 * @route DELETE /api/user/delete
 * @desc Delete a user profile
 */
export const deleteUser = async (request, response) => {
  try {
    const { token } = request.cookies;

    if (token) {
      jwt.verify(token, secret, {}, async (error) => {
        if (error) {
          response
            .status(498)
            .json({ success: false, message: 'Invalid token' });
        } else {
          const { user } = request.body;

          if (typeof user !== 'object') {
            response.status(400).json({
              success: false,
              message: `Provide a 'user' object. Received: ${JSON.stringify(
                user
              )}`,
            });

            return;
          }

          const userId = user.id;

          if (!userId) {
            response.status(400).json({
              success: false,
              message: 'Provide a user ID',
            });
            return;
          }

          const userInDB = await User.findById(userId);

          // Check if the password matches the one in the database
          const isPasswordMatch = await bcryptjs.compare(
            user.password,
            userInDB.password
          );

          if (!isPasswordMatch) {
            response.status(400).json({
              success: false,
              message: 'Password is incorrect',
            });
            return;
          }

          await User.findByIdAndDelete(userId);

          response.status(200).json({
            success: true,
            user: { id: userId },
          });
        }
      });
    } else {
      response.status(499).json({
        success: false,
        message: 'Token is required but was not submitted ',
      });
    }
  } catch (error) {
    logError(error);
    response
      .status(500)
      .json({ success: false, message: 'Failed to update user password' });
  }
};

/** CHECK IF USER EMAIL EXISTS
 *
 * @route GET /api/user/checkemail/:email
 * @desc Checks email and returns boolean
 */
export const checkEmail = async (request, response) => {
  try {
    const { email } = request.params;

    if (!email) {
      response.status(400).json({
        success: false,
        message: 'Provide an email',
      });
      return;
    }

    const user = await User.findOne({ email });

    if (user) {
      response.status(200).json({
        success: true,
        exists: true,
      });
    } else {
      response.status(200).json({
        success: true,
        exists: false,
      });
    }
  } catch (error) {
    logError(error);
    response
      .status(500)
      .json({ success: false, message: 'Failed to check email' });
  }
};
