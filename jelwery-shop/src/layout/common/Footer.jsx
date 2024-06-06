import React from 'react'
import { footerData } from '../../data'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Footer() {
  return (
    <footer className="mt-[50px] bg-fourth px-[14%] text-third">
      <div className="flex justify-between py-8 uppercase ">
        {footerData.map((item, index) => (
          <div key={index}>
            <h2 className="text-lg font-semibold text-heading">{item.header}</h2>
            <ul
              className={`mt-6 text-sm ${index === 3 ? 'grid grid-flow-col grid-rows-2 gap-4 space-y-0' : ' space-y-3'}`}
            >
              {index === 3 &&
                item.content.map((icon, index) => (
                  <FontAwesomeIcon
                    key={index}
                    icon={icon}
                    className="text-3xl font-semibold text-heading"
                  />
                ))}

              {index !== 3 && item.content?.map((content, index) => <li key={index}>{content}</li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="h-1 w-full rounded-lg bg-third"></div>
      <p className="py-4 text-center">&copy; 2024 Jewelry Store. All rights reserved.</p>
    </footer>
  )
}

export default Footer
