const Details = () => {
  return (
    <div className='flex flex-col space-y-2 p-5'>
      <details className='opne:text-white select-none open:bg-indigo-400'>
        <summary className='cursor-pointer '>What is my fav. food.</summary>
        <span className='selection:bg-indigo-500'> 김치</span>
      </details>
      <ul className='list-decimal marker:text-teal-500'>
        <li>hi</li>
        <li>hi</li>
        <li>hi</li>
      </ul>

      <input
        type='file'
        className='transition-colors file:cursor-pointer file:rounded-xl file:border-0 file:bg-purple-400 file:px-5 file:text-white file:hover:border file:hover:bg-white file:hover:text-purple-400'
      />

      <p className='first-letter:text-8xl'>
        loremasdvjcxiojklwefsvmxcljvlka;sduiof
      </p>
    </div>
  );
};

export default Details;
