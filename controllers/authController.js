import User from '../models/User.js';

// Get Login Page
export const getLogin = (req, res) => {
  if (req.session.userId) {
    return res.redirect('/admin');
  }
  res.render('login', { error: null });
};

// Get Signup Page
export const getSignup = (req, res) => {
  if (req.session.userId) {
    return res.redirect('/admin');
  }
  res.render('signup', { error: null });
};

// Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.render('login', { error: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    
    if (!user) {
      return res.render('login', { error: 'Invalid email or password' });
    }

    const isMatch = await user.comparePassword(password);
    
    if (!isMatch) {
      return res.render('login', { error: 'Invalid email or password' });
    }

    // Create session
    req.session.userId = user._id;
    req.session.username = user.username;

    return res.redirect('/admin');
  } catch (error) {
    console.error('Login error:', error);
    res.render('login', { error: 'An error occurred during login' });
  }
};

// Signup User
export const signupUser = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    // Validation
    if (!username || !email || !password || !confirmPassword) {
      return res.render('signup', { error: 'All fields are required' });
    }

    if (password !== confirmPassword) {
      return res.render('signup', { error: 'Passwords do not match' });
    }

    if (password.length < 6) {
      return res.render('signup', { error: 'Password must be at least 6 characters' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.render('signup', { error: 'Email or username already exists' });
    }

    // Create new user
    const newUser = new User({ username, email, password });
    await newUser.save();

    // Auto login after signup
    req.session.userId = newUser._id;
    req.session.username = newUser.username;

    return res.redirect('/admin');
  } catch (error) {
    console.error('Signup error:', error);
    res.render('signup', { error: 'An error occurred during signup' });
  }
};

// Logout User
export const logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.send('Error logging out');
    }
    res.redirect('/');
  });
};
