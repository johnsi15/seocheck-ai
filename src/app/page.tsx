export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <h1>Seo Check</h1>

      <div className='flex'>
        <form action='' className='flex flex-col'>
          <label htmlFor='title' className='flex flex-col'>
            <span>Title</span>
            <input type='text' name='title' placeholder='Title' />
          </label>
          <label htmlFor='description' className='flex flex-col'>
            <span>Description</span>
            <input type='text' name='description' placeholder='Description' />
          </label>
          <button type='submit'>Check</button>
        </form>
      </div>
    </main>
  )
}
