import React, { useState, useEffect } from 'react'
import { doc, getDoc, deleteDoc } from 'firebase/firestore'
import { useParams, useNavigate, Link } from 'react-router-dom'
import db from '../db'

function ContactDetails() {
  const [contact, setContact] = useState(null)
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchContact = async () => {
      const docRef = doc(db, 'contacts', id)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        setContact({ id: docSnap.id, ...docSnap.data() })
      }
    }

    fetchContact()
  }, [id])

  const handleDelete = async () => {
    if (window.confirm('Delete this contact?')) {
      await deleteDoc(doc(db, 'contacts', id))
      navigate('/')
    }
  }

  if (!contact) return <div>Loading...</div>

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">
        {contact.firstName} {contact.lastName}
      </h2>
      <div className="space-y-2 mb-4">
        <p><strong>Email:</strong> {contact.email}</p>
      </div>
      <div className="flex space-x-2">
        <Link 
          to={`/contact/edit/${id}`} 
          className="bg-blue-500 text-white px-4 py-2 rounded flex-grow text-center"
        >
          Edit
        </Link>
        <button 
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded flex-grow"
        >
          Delete
        </button>
      </div>
      <Link 
        to="/" 
        className="mt-4 block text-center text-blue-600 hover:underline"
      >
        Back to Contacts
      </Link>
    </div>
  )
}

export default ContactDetails