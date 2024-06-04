import React from 'react'
import { footerData } from '../../data'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Footer() {
  return (
    <footer className="mt-[50px] bg-third px-[14%] text-white">
      <div className="flex justify-between py-8 uppercase ">
        {footerData.map((item, index) => (
          <div key={index}>
            <h2 className="text-lg font-semibold text-fourth">{item.header}</h2>
            <ul className="mt-6 space-y-3 text-sm ">
              {/* <li>
                <FontAwesomeIcon icon="fa-brands fa-facebook" />
              </li> */}

              {item.content?.map((content, index) => (
                <li key={index}>{content}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="h-1 w-full rounded-lg bg-fourth"></div>
      <p className="py-4 text-center">&copy; 2024 Jewelry Store. All rights reserved.</p>
    </footer>
  )
}

export default Footer
