import UnderlineLink from '@/components/links/UnderlineLink'

export default function Footer() {
  return (
    <footer className='bg-white py-6 pt-12'>
      <div className='layout text-center text-gray-700'>
        © {new Date().getFullYear()} By{' '}
        <UnderlineLink href='https://endeavorlabs.co'>
          Endeavor Labs, LLC
        </UnderlineLink>
      </div>
    </footer>
  )
}
