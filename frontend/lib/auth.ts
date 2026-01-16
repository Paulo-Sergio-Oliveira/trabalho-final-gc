// Simple client-side authentication utilities (mock implementation)

const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "admin123",
}

export function login(username: string, password: string): boolean {
  if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
    if (typeof window !== "undefined") {
      localStorage.setItem("adminAuthenticated", "true")
    }
    return true
  }
  return false
}

export function logout(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("adminAuthenticated")
  }
}

export function isAuthenticated(): boolean {
  if (typeof window !== "undefined") {
    return localStorage.getItem("adminAuthenticated") === "true"
  }
  return false
}
