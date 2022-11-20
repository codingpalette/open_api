import styled from "@emotion/styled";
import tw from "twin.macro";

type InputType = 'text' | 'password' | 'date' | 'number' | 'price' | 'phoneNumber' | 'carNumber' | 'motorType';

interface InputProps {
  type?: InputType;
  width?: string;
  size?: 'default' | 'large' | 'small';
  placeholder?: string;
  maxLength?: number;
  // isError?: boolean;
  // errorMessage?: string;
  disabled?: boolean;
  value?: string;
  // onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  // onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  // onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}



const Input = ({type, width, size, placeholder, maxLength, disabled, value, onChange} : InputProps) => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);
  };

  return(
    <>
      <InputTag
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
    </>
  )
}

Input.defaultProps = {
  type: 'text',
  size: 'default'
};

const InputTag = styled.input`
  ${tw`
  
    mt-1 
    block 
    w-full 
    p-2
    rounded-md 
    border-solid border-2 border-indigo-600
    shadow-sm 
    focus:border-indigo-500 
    focus:ring-indigo-500 
    sm:text-sm
  `}
`

export default Input