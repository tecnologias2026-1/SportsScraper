// ========================================
// AUTHENTICATION MODULE
// ========================================

// Simple hash function (not secure - for demo only)
function hashPassword(password) {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return 'hash_' + Math.abs(hash);
}

// ========================================
// USER MANAGEMENT
// ========================================

function registerUser(email, password, name) {
  // Validate inputs
  if (!email || !password || !name) {
    return { success: false, error: 'Todos los campos son requeridos' };
  }

  if (password.length < 6) {
    return { success: false, error: 'La contraseña debe tener al menos 6 caracteres' };
  }

  // Check if user already exists
  const users = JSON.parse(localStorage.getItem('sportsscraper_users')) || [];
  if (users.find(u => u.email === email)) {
    return { success: false, error: 'Este email ya está registrado' };
  }

  // Create new user
  const newUser = {
    id: 'user_' + Date.now(),
    email: email,
    name: name,
    password: hashPassword(password),
    createdAt: new Date().toISOString(),
    avatar: `https://i.pravatar.cc/?img=${Math.floor(Math.random() * 70)}`
  };

  users.push(newUser);
  localStorage.setItem('sportsscraper_users', JSON.stringify(users));

  return { success: true, user: newUser };
}

function loginUser(email, password) {
  if (!email || !password) {
    return { success: false, error: 'Email y contraseña requeridos' };
  }

  const users = JSON.parse(localStorage.getItem('sportsscraper_users')) || [];
  const user = users.find(u => u.email === email);

  if (!user) {
    return { success: false, error: 'Email no encontrado' };
  }

  if (user.password !== hashPassword(password)) {
    return { success: false, error: 'Contraseña incorrecta' };
  }

  // Create session
  const session = {
    userId: user.id,
    loggedIn: true,
    loginTime: new Date().toISOString()
  };

  localStorage.setItem('sportsscraper_session', JSON.stringify(session));
  localStorage.setItem('sportsscraper_current_user', JSON.stringify(user));

  return { success: true, user: user };
}

function logoutUser() {
  localStorage.removeItem('sportsscraper_session');
  localStorage.removeItem('sportsscraper_current_user');
}

function getCurrentUser() {
  const session = JSON.parse(localStorage.getItem('sportsscraper_session'));

  if (!session || !session.loggedIn) {
    return null;
  }

  const user = JSON.parse(localStorage.getItem('sportsscraper_current_user'));
  return user;
}

function isLoggedIn() {
  const session = JSON.parse(localStorage.getItem('sportsscraper_session'));
  return session && session.loggedIn;
}

function updateUserProfile(name, email) {
  const user = getCurrentUser();
  if (!user) return false;

  const users = JSON.parse(localStorage.getItem('sportsscraper_users')) || [];
  const userIndex = users.findIndex(u => u.id === user.id);

  if (userIndex === -1) return false;

  users[userIndex].name = name;
  users[userIndex].email = email;

  localStorage.setItem('sportsscraper_users', JSON.stringify(users));
  localStorage.setItem('sportsscraper_current_user', JSON.stringify(users[userIndex]));

  return true;
}

function changePassword(oldPassword, newPassword) {
  const user = getCurrentUser();
  if (!user) return { success: false, error: 'No hay usuario logueado' };

  if (user.password !== hashPassword(oldPassword)) {
    return { success: false, error: 'Contraseña actual incorrecta' };
  }

  if (newPassword.length < 6) {
    return { success: false, error: 'La nueva contraseña debe tener al menos 6 caracteres' };
  }

  const users = JSON.parse(localStorage.getItem('sportsscraper_users')) || [];
  const userIndex = users.findIndex(u => u.id === user.id);

  users[userIndex].password = hashPassword(newPassword);
  localStorage.setItem('sportsscraper_users', JSON.stringify(users));
  localStorage.setItem('sportsscraper_current_user', JSON.stringify(users[userIndex]));

  return { success: true };
}

// ========================================
// SESSION MANAGEMENT
// ========================================

function checkAndRestoreSession() {
  const session = JSON.parse(localStorage.getItem('sportsscraper_session'));
  if (session && session.loggedIn) {
    return true;
  }
  return false;
}
