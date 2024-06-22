// form with: desc: string, url: url and used: boolean

import { useState } from 'react'
import { client } from '../supabase/client'

export const LinkForm = ({ fetchLinks }) => {
  const [isLoading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)

    const desc = formData.get('desc')
    const url = formData.get('url')

    const { data: info } = await client.auth.getUser()

    // console.log()
    setLoading(true)
    try {
      await client.from('links').insert({
        desc,
        url,
        userId: info.user.id
      })
      e.target.reset()
      fetchLinks()
    } catch (error) {
      console.error('Error Inserting')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="flex flex-col gap-4 min-w-96 mt-8" onSubmit={handleSubmit}>
      <div className="flex flex-col">
        <label htmlFor="desc" className="text-lg font-bold text-gray-800">
          Description
        </label>
        <input
          className="border border-gray-300 rounded-lg p-2"
          type="text"
          id="desc"
          name="desc"
          required
          placeholder="Description"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="url" className="text-lg font-bold text-gray-800">
          URL
        </label>
        <input
          className="border border-gray-300 rounded-lg p-2"
          type="url"
          id="url"
          name="url"
          required
          placeholder="URL"
        />
      </div>

      <button
        disabled={isLoading}
        type="submit"
        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
          isLoading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        Submit
      </button>
    </form>
  )
}
