// API Configuration
const API_URL = (function() {
    // Check if we're in development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        return 'http://localhost:5000/api';
    }
    
    // Check for custom API URL in environment
    if (window.API_URL) {
        return window.API_URL;
    }
    
    // Default production URL (update this after deploying backend)
    return 'https://your-portfolio-api.herokuapp.com/api';
})();

// Test API connection
async function testAPIConnection() {
    try {
        const healthUrl = API_URL.replace('/api', '/health');
        const response = await fetch(healthUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (response.ok) {
            console.log('✅ Backend API is reachable at', healthUrl);
            return true;
        } else {
            console.warn('⚠️ Backend responded but with error:', response.status);
            return false;
        }
    } catch (error) {
        console.error('❌ Cannot reach backend API:', error.message);
        console.error('API URL:', API_URL);
        console.error('Health check URL:', API_URL.replace('/api', '/health'));
        console.error('Make sure backend is running: cd backend && npm run dev');
        return false;
    }
}

// Get token from localStorage
function getAuthToken() {
    return localStorage.getItem('authToken');
}

// Get user data from localStorage
function getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}

// Check if user is authenticated
function isAuthenticated() {
    return !!getAuthToken();
}

// Logout function
function logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    window.location.href = 'login.html';
}

// Make authenticated API request
async function fetchWithAuth(endpoint, options = {}) {
    const token = getAuthToken();
    
    if (!token) {
        window.location.href = 'login.html';
        return;
    }
    
    // Test connection first (only in development)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        try {
            const isConnected = await testAPIConnection();
            if (!isConnected) {
                const error = new Error('Cannot connect to backend API. Make sure backend is running on http://localhost:5000');
                error.code = 'BACKEND_OFFLINE';
                throw error;
            }
        } catch (error) {
            // If testAPIConnection throws, re-throw it
            if (error.code === 'BACKEND_OFFLINE') {
                throw error;
            }
            // Otherwise continue (might be network issue, let the actual request fail)
        }
    }
    
    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };
    
    const mergedOptions = {
        ...defaultOptions,
        ...options,
        headers: {
            ...defaultOptions.headers,
            ...options.headers
        }
    };
    
    try {
        const response = await fetch(`${API_URL}${endpoint}`, mergedOptions);
        
        // If unauthorized, redirect to login
        if (response.status === 401) {
            logout();
            return;
        }
        
        return response;
    } catch (error) {
        console.error('API request error:', error);
        console.error('Endpoint:', `${API_URL}${endpoint}`);
        console.error('Full URL:', window.location.href);
        throw error;
    }
}

// Protect admin pages
function requireAuth() {
    if (!isAuthenticated()) {
        window.location.href = 'login.html';
    }
}

// Check if user is admin
function isAdmin() {
    const user = getUser();
    return user && user.role === 'admin';
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Show toast notification
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Confirm dialog
function confirmAction(message) {
    return confirm(message);
}

