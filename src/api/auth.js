// src/api/auth.js
import { apiRequest } from "./client";

export async function loginUser({ phone, password }) {
  const payload = { phone, password };
  const data = await apiRequest("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  // Expecting: { success, token, user }
  if (data.token && data.user) {
    localStorage.setItem("g1p_token", data.token);
    localStorage.setItem("g1p_user", JSON.stringify(data.user));
  }

  return data;
}

// 👇 UPDATED: now supports referralCode
export async function signupUser({ username, phone, password, referralCode }) {
  const payload = { username, phone, password };

  if (referralCode) {
    payload.referralCode = referralCode; // backend ko bhejenge
  }

  const data = await apiRequest("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  // Auto-login after signup
  if (data.token && data.user) {
    localStorage.setItem("g1p_token", data.token);
    localStorage.setItem("g1p_user", JSON.stringify(data.user));
  }

  return data;
}

export function logoutUser() {
  localStorage.removeItem("g1p_token");
  localStorage.removeItem("g1p_user");
}
