import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {

  const owner = ref(null)
  const token = ref(localStorage.getItem('token') || null)

  async function login(phone, password) {
    if (phone === '0712345678' && password === 'password') {
      const fakeToken = 'fake-jwt-token'
      const fakeOwner = {
        id: 1,
        name: 'Zanele Mokoena',
        businessName: 'Nails by Zanele',
        phone,
      }
      token.value = fakeToken
      owner.value = fakeOwner
      localStorage.setItem('token', fakeToken)
    } else {
      throw new Error('Invalid credentials')
    }
  }

  async function signUp(formData) {
    // Will POST to your Spring Boot API later
    // For now simulate a successful registration
    const fakeToken = 'fake-jwt-token'
    const fakeOwner = {
      id: 1,
      name: formData.ownerName,
      businessName: formData.businessName,
      phone: formData.phone,
    }
    token.value = fakeToken
    owner.value = fakeOwner
    localStorage.setItem('token', fakeToken)
  }

  function logout() {
    token.value = null
    owner.value = null
    localStorage.removeItem('token')
  }

  const isLoggedIn = () => !!token.value

  return { owner, token, login, signUp, logout, isLoggedIn }
})