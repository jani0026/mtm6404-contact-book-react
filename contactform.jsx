import React, { useState, useEffect } from 'react'
import { collection, addDoc, doc, getDoc, updateDoc } from 'firebase/firestore'
import { useParams, useNavigate } from 'react-router-dom'
import db from '../db'

function ContactForm() {
  const [contact, setContact] = useState({
    firstName: '',
    lastName: '',
    email: ''
  })
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditing = !!id

  useEffect(() => {
    if (isEditing) {
      const fetchContact = async () => {
        const docRef = doc(db, 'contacts', id)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          setContact(docSnap.data())
        }
      }

      fetchContact()
    }
  }, [isEditing, id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setContact(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (isEditing) {
        await updateDoc(doc(db, 'contacts', id), contact)
        navigate(`/contact/${id}`)
      } else {
        const docRef = await addDoc(collection(db, 'contacts'), contact)
        navigate(`/contact/${docRef.id}`)
      }
    } catch (error) {
      console.error('Error saving contact:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
      <h2 className="text-2xl font-bold text-center">
        {isEditing ? 'Edit Contact' : 'New Contact'}
      </h2>
      <div>
        <label className="block mb-2">First Name</label>
        <input
          type="text"
          name="firstName"
          value={contact.firstName}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block mb-2">Last Name</label>
        <input
          type="text"
          name="lastName"
          value={contact.lastName}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block mb-2">Email</label>
        <input
          type="email"
          name="email"
          value={contact.email}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <button 
        type="submit" 
        className="w-full bg-blue-500 text-white p-2 rounded"
      >
        {isEditing ? 'Update Contact' : 'Add Contact'}
      </button>
      <button 
        type="button"
        onClick={() => navigate('/')}
        className="w-full bg-gray-300 text-black p-2 rounded mt-2"
      >
        Cancel
      </button>
    </form>
  )
}

export default ContactForm