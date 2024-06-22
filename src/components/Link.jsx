import { client } from '../supabase/client'

function capitalizeFirstLetter (string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

/**
 *
 * @param {string} id - The id of the link
 * @param {string} desc - The description of the link
 * @param {string} url - The url of the link
 * @param {boolean} used - The used status of the link
 * @returns {JSX.Element}
 */
export const Link = ({ id, desc, url, used, fetchLinks }) => {
  const handleToggleUsed = async () => {
    console.log('hola')
    try {
      await client
        .from('links')
        .update({
          used: !used
        })
        .eq('id', id)
    } catch (error) {
      console.error('Error updating:', error)
    }
  }

  const handleDelete = async () => {
    try {
      await client.from('links').delete().eq('id', id)
    } catch (error) {
      console.error('Error deleting:', error)
    }
  }

  return (
    <div className="flex flex-col gap-2 p-4 border border-gray-300 rounded-lg overflow-hidden max-w-[500px]">
      <h3 className="text-2xl font-bold text-gray-800">
        {capitalizeFirstLetter(desc)}
      </h3>
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        // if text is so long, add .. to the end
        className="text-xl font-bold w-[400px] truncate my-2 text-blue-600 underline"
      >
        {url}
      </a>

      <div className="flex gap-4">
        <button onClick={handleToggleUsed}>
          {used
            ? (
            <span className="text-green-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-eye-check"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#00b341"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                <path d="M11.102 17.957c-3.204 -.307 -5.904 -2.294 -8.102 -5.957c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6a19.5 19.5 0 0 1 -.663 1.032" />
                <path d="M15 19l2 2l4 -4" />
              </svg>
            </span>
              )
            : (
            <span className="text-red-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-eye-off"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#ff2825"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M10.585 10.587a2 2 0 0 0 2.829 2.828" />
                <path d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87" />
                <path d="M3 3l18 18" />
              </svg>
            </span>
              )}
        </button>

        <button
          onClick={handleDelete}
          className=" hover:text-red-700 text-red-500 font-bold py-2 px-4 rounded"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-trash-x-filled"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#2c3e50"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path
              d="M20 6a1 1 0 0 1 .117 1.993l-.117 .007h-.081l-.919 11a3 3 0 0 1 -2.824 2.995l-.176 .005h-8c-1.598 0 -2.904 -1.249 -2.992 -2.75l-.005 -.167l-.923 -11.083h-.08a1 1 0 0 1 -.117 -1.993l.117 -.007h16zm-9.489 5.14a1 1 0 0 0 -1.218 1.567l1.292 1.293l-1.292 1.293l-.083 .094a1 1 0 0 0 1.497 1.32l1.293 -1.292l1.293 1.292l.094 .083a1 1 0 0 0 1.32 -1.497l-1.292 -1.293l1.292 -1.293l.083 -.094a1 1 0 0 0 -1.497 -1.32l-1.293 1.292l-1.293 -1.292l-.094 -.083z"
              strokeWidth="0"
              fill="currentColor"
            />
            <path
              d="M14 2a2 2 0 0 1 2 2a1 1 0 0 1 -1.993 .117l-.007 -.117h-4l-.007 .117a1 1 0 0 1 -1.993 -.117a2 2 0 0 1 1.85 -1.995l.15 -.005h4z"
              strokeWidth="0"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
