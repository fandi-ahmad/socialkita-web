export const SimpleInput = (props) => {
  return (
    <>
      <label className="w-full text-start capitalize">{props.label}</label>
      <input type={props.type || 'text'} placeholder={props.placeholder || 'Type here'} className={`input input-bordered w-full ${props.className}`}
        value={props.value} onChange={props.onChange} onKeyUp={props.onKeyUp} name={props.name}
      />
    </>
  )
}