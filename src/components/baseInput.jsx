export const SimpleInput = (props) => {
  return (
    <>
      <label className="w-full text-start capitalize">{props.label}</label>
      <input type={props.type || 'text'} placeholder={props.placeholder || 'Type here'} className={`input input-bordered w-full ${props.className}`}
        value={props.value} onChange={props.onChange} onKeyUp={props.onKeyUp} name={props.name} id={props.id} autoComplete="true"
      />
    </>
  )
}

export const InputText = (props) => {
  return (
    <div className={`relative ${props.className}`}>
      <h1 className='capitalize font-semibold'>{props.label}</h1>
      <input className={`input-box border-b-2 focus:border-b-blue-500 ${props.theme === 'dark' ? 'placeholder:text-gray-600' : 'placeholder:text-gray-400'}`} type={props.type || 'text'} placeholder={props.placeholder || 'Enter your text'} autoComplete="true"
        value={props.value} onChange={props.onChange} name={props.name} id={props.id}
      />
    </div>
  )
}

export const InputTextArea = (props) => {
  return (
    <div className={`relative ${props.className}`}>
      <h1 className='capitalize font-semibold'>{props.label}</h1>
      <textarea className={`input-box border-b-2 ${props.height || 'h-20'} no-resize focus:border-b-blue-500 ${props.theme === 'dark' ? 'placeholder:text-gray-600' : 'placeholder:text-gray-400'}`} type={props.type || 'text'} placeholder={props.placeholder || 'Enter your text'} autoComplete="true"
        value={props.value} onChange={props.onChange} name={props.name} id={props.id}
      />
    </div>
  )
}