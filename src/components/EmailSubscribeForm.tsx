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
    <div className='flex max-w-4xl flex-col items-center'>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            name='email'
            type='email'
            placeholder='Enter your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='rounded-sm border-0 px-3.5 py-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:leading-6'
            required
          />
          <button
            type='submit'
            className={`text-md mx-4 flex-none rounded-sm bg-orange-400 px-4 py-4 font-semibold text-white shadow-sm hover:bg-orange-500 ${
              formState === 'submitting' ? 'cursor-wait' : ''
            }`}
            disabled={formState === 'submitting'}
          >
            Subscribe
          </button>
        </form>
      </div>
      <div>
        <p className='mt-4'>{message}</p>
      </div>
    </div>
  )
}

export default EmailSubscribeForm
