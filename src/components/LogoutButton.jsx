export const LogoutButton = ({ onClick }) => {
  return (
    <button
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      onClick={onClick}
    >
      Sign out
    </button>
  )
}
