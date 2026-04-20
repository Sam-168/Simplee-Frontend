// Base URL — change this one line when your Spring Boot API is deployed
const BASE_URL = 'http://localhost:8080/api'

// ─────────────────────────────────────
// Core fetch wrapper
// Handles auth headers, errors, and JSON parsing in one place
// ─────────────────────────────────────
async function request(method, path, body = null) {
  const token = localStorage.getItem('token')

  const headers = {
    'Content-Type': 'application/json',
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const config = {
    method,
    headers,
  }

  if (body) {
    config.body = JSON.stringify(body)
  }

  const response = await fetch(`${BASE_URL}${path}`, config)

  // If token is expired or invalid, log the user out and redirect
  if (response.status === 401) {
    localStorage.removeItem('token')
    window.location.href = '/login'
    return
  }

  // For non-JSON responses (e.g. 204 No Content)
  if (response.status === 204) {
    return null
  }

  const data = await response.json()

  if (!response.ok) {
    // Throw the error message from your Spring Boot API if it exists
    throw new Error(data.message || 'Something went wrong')
  }

  return data
}

// Convenience methods
const get = (path) => request('GET', path)
const post = (path, body) => request('POST', path, body)
const patch = (path, body) => request('PATCH', path, body)
const del = (path) => request('DELETE', path)


// ─────────────────────────────────────
// Auth
// ─────────────────────────────────────
export const authApi = {
  login(phone, password) {
    return post('/auth/login', { phone, password })
  },

  signUp(data) {
    return post('/auth/signup', {
      businessName: data.businessName,
      ownerName: data.ownerName,
      phone: data.phone,
      password: data.password,
    })
  },

  logout() {
    return post('/auth/logout')
  },
}


// ─────────────────────────────────────
// Business
// ─────────────────────────────────────
export const businessApi = {
  getMyBusiness() {
    return get('/business/me')
  },

  updateBusiness(data) {
    return patch('/business/me', data)
  },

  getPublicBusiness(slug) {
    return get(`/business/${slug}`)
  },
}


// ─────────────────────────────────────
// Services (the nail treatments, etc.)
// ─────────────────────────────────────
export const servicesApi = {
  getServices() {
    return get('/services')
  },

  addService(data) {
    return post('/services', data)
  },

  deleteService(id) {
    return del(`/services/${id}`)
  },
}


// ─────────────────────────────────────
// Bookings
// ─────────────────────────────────────
export const bookingsApi = {
  getBookings(filter = 'today') {
    return get(`/bookings?filter=${filter}`)
  },

  getBookingById(id) {
    return get(`/bookings/${id}`)
  },

  createBooking(data) {
    return post('/bookings', {
      customerName: data.customerName,
      customerPhone: data.customerPhone,
      serviceId: data.serviceId,
      date: data.date,
      time: data.time,
      notes: data.notes,
      businessSlug: data.businessSlug,
    })
  },

  updateBookingStatus(id, status) {
    return patch(`/bookings/${id}/status`, { status })
  },
}


// ─────────────────────────────────────
// Customers
// ─────────────────────────────────────
export const customersApi = {
  getCustomers() {
    return get('/customers')
  },

  getCustomerHistory(customerId) {
    return get(`/customers/${customerId}/history`)
  },
}