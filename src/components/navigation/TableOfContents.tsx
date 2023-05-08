import React, { useEffect, useState } from 'react'

import { generateIdFromName } from '@/lib/utils'

interface Props {
  sections: string[]
}

const TableOfContents: React.FC<Props> = ({ sections }) => {
  const [activeSection, setActiveSection] = useState(sections[0])

  useEffect(() => {
    const handleScroll = () => {
      const offsets = sections.map((section) => {
        const element = document.getElementById(generateIdFromName(section))
        return element ? element.getBoundingClientRect().top : 0
      })

      const activeIndex = offsets.findIndex((offset) => offset > 0)
      setActiveSection(sections[Math.max(activeIndex - 1, 0)])
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sections])

  return (
    <div>
      <ul>
        {sections.map((section) => (
          <li
            key={section}
            className={`mb-2 cursor-pointer hover:text-gray-700 ${
              activeSection === section ? 'text-gray-900' : 'text-gray-500'
            }`}
            onClick={() => {
              const element = document.getElementById(
                generateIdFromName(section)
              )
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' })
              }
            }}
          >
            {section}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TableOfContents
