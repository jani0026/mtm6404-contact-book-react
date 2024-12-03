import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import ContactList from './components/ContactList'
import ContactDetails from './components/ContactDetails'
import ContactForm from './components/ContactForm'

function App() {
  return (
    <div className="container mx-auto p-4">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-center">
          <Link to="/">Contact Book</Link>
        </h1>
      </header>
      
      <Routes>
        <Route path="/" element={<ContactList />} />
        <Route path="/contact/new" element={<ContactForm />} />
        <Route path="/contact/:id" element={<ContactDetails />} />
        <Route path="/contact/edit/:id" element={<ContactForm />} />
      </Routes>
    </div>
  )
}

export default App