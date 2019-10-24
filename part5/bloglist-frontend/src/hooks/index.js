import { useState } from 'react'

export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => setValue(event.target.value)

    const reset = () => setValue('')
    
    const autoComplete = 'off'

    const bind = {
        type,
        value,
        onChange,
        autoComplete
    }

    return { type, reset, bind }
}