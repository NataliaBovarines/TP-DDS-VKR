export default function Button({ text }) {
  return (
    <button
      type="submit"
      className="w-full bg-orange-700 hover:bg-orange-800 
                 text-white font-semibold py-2.5 rounded-lg 
                 transition-all duration-300 shadow-md hover:shadow-lg 
                 active:scale-[0.98] focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
    >
      {text}
    </button>
  );
}