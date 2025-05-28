import React from 'react'

const Button = ({ text = 'Daha çox' }) => {
    return (
        <button className='rounded-sm  px-5 py-2 bg-[#0f4c9f] text-white '>
            {text}
        </button>
    )
}

export default Button