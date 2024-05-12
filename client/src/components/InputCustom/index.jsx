import { Input } from 'antd'
import './input.scss'

const typeInput = (props) => {
  switch (props?.type) {
    case 'isPassword':
      return <Input.Password {...props} />
    case 'isTextArea':
      return <Input.TextArea {...props} />
    case 'isSearch':
      return <Input.Search {...props} />
    default:
      return <Input {...props} />
  }
}

const InputCustom = (props) => {
  return (
    <>
      {
        typeInput(props)
      }
    </>
  )
}

export default InputCustom