import { useState } from 'react'

const EmailSubscribeForm: React.FC = () => {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [formState, setFormState] = useState('new')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('')
    setFormState('submitting')

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: { 'Content-Type': 'application/json' },
      })

      if (response.ok) {
        setEmail('')
        setMessage('Success! Check your email to confirm your subscription.')
        setFormState('success')
      } else {
        setMessage('Something went wrong.')
        setFormState('error')
      }
    } catch (error) {
      setMessage('Something went wrong.')
      setFormState('error')
    }
  }

  return (
    <div className='flex w-full flex-col items-center'>
      <form onSubmit={handleSubmit}>
        <div className='flex max-w-4xl flex-col space-y-2 sm:flex-row sm:space-y-0'>
          <div className='w-full'>
            <input
              name='email'
              type='email'
              placeholder='Enter your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-96 rounded-sm border-0 px-3.5 py-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:w-80 sm:leading-6'
              required
            />
          </div>
          <div>
            <button
              type='submit'
              className={`w-text-md mx-4 w-96 flex-none rounded-sm bg-orange-400 px-4 py-4 font-semibold text-white shadow-sm hover:bg-orange-500 sm:w-28 ${
                formState === 'submitting' ? 'cursor-wait' : ''
              }`}
              disabled={formState === 'submitting'}
            >
              Subscribe
            </button>
          </div>
        </div>
        <div>
          <p className='mt-4'>{message}</p>
        </div>
      </form>
    </div>
  )
}

export default EmailSubscribeForm
