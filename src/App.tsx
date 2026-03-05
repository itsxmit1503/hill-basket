import { Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import { Layout } from './components/Layout'
import { ProtectedRoute } from './components/ProtectedRoute'
import HomePage from './pages/HomePage'
import ProductListingPage from './pages/ProductListingPage'
import ProductDetailsPage from './pages/ProductDetailsPage'
import CategoriesPage from './pages/CategoriesPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import OrderConfirmationPage from './pages/OrderConfirmationPage'
import LoginPage from './pages/LoginPage'
import AccountPage from './pages/AccountPage'
import HelpCenterPage from './pages/HelpCenterPage'
import AdminDashboard from './pages/AdminDashboard'
import FAQPage from './pages/FAQPage'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <div className="min-h-screen bg-background-light dark:bg-background-dark text-gray-900 dark:text-gray-100 transition-colors duration-300">
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductListingPage />} />
                <Route path="/product/:id" element={<ProductDetailsPage />} />
                <Route path="/categories" element={<CategoriesPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/account" element={
                  <ProtectedRoute>
                    <AccountPage />
                  </ProtectedRoute>
                } />
                <Route path="/help" element={<HelpCenterPage />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/admin" element={
                  <ProtectedRoute adminOnly>
                    <AdminDashboard />
                  </ProtectedRoute>
                } />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Layout>
          </div>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
