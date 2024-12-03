import React, { useState, useEffect } from 'react'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { Link } from 'react-router-dom'
import db from '../db'

function ContactList() {
  const [contacts, setContacts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchContacts = async () => {
      const q = query(collection(db, 'contacts'), orderBy('lastName'), orderBy('firstName'))
      const querySnapshot = await getDocs(q)
      const contactsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setContacts(contactsList)
    }

    fetchContacts()
  }, [])

  const filteredContacts = contacts.filter(contact => 
    `${contact.firstName} ${contact.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="max-w-md mx-auto">
      <div className="flex mb-4">
        <input 
          type="text" 
          placeholder="Search contacts" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow p-2 border rounded-l"
        />
        <Link 
          to="/contact/new" 
          className="bg-green-500 text-white px-4 py-2 rounded-r"
        >
          Add
        </Link>
      </div>

      <div className="space-y-2">
        {filteredContacts.map(contact => (
          <Link 
            key={contact.id} 
            to={`/contact/${contact.id}`} 
            className="block p-3 border rounded hover:bg-gray-100"
          >
            {contact.lastName}, {contact.firstName}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default ContactList