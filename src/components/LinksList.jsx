import { useEffect } from 'react'

import { Link } from './Link'

export const LinksList = ({ fetchLinks, links }) => {
  useEffect(() => {
    fetchLinks()
  }, [fetchLinks])

  return (
    <div className="flex flex-col gap-4 mt-8">
      <button
        className="flex items-center justify-center hover:bg-blue-700 text-white font-bold py-2 px-4 rounded max-w-10"
        onClick={fetchLinks}
      >
        🔄️
      </button>
      <div className="grid grid-cols-1 gap-4 overflow-auto max-h-[80vh]">
        {links.map((e) => {
          return (
            <Link
              key={e.id}
              id={e.id}
              desc={e.desc}
              url={e.url}
              used={e.used}
              fetchLinks={fetchLinks}
            />
          )
        })}
      </div>
    </div>
  )
}
