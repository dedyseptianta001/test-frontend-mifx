import React, {useState, useEffect, useRef} from "react"
import { EyeIcon } from "./Icons";

const Input = (props) => {
   const {
      id='',
      className="w-full",
      type="text",
      name="",
      value="",
      placeholder="",
      Ref=()=>{},
      onChange=()=>{},
      Disabled=false,
      Required=false,
      DisableClass="disabled:bg-gray-cc disabled:text-gray-a1 disabled:border-gray-f9"
   } = props

   const [Value, setValue] = useState(value)

   useEffect(() => {
      setValue(value)
   }, [value])

   return (
      <input
         id={id}
         className={`h-12 border border-gray-cc rounded-md px-3 text-sm outline-none placeholder:text-gray-a1 ${className} ${DisableClass}`}
         ref={Ref}
         type={type}
         name={name}
         value={Value ? Value : ""}
         placeholder={placeholder}
         disabled={Disabled}
         required={Required}
         onChange={(e) => {
               setValue(e.target.value)
               onChange(e.target.value)
            }
         }
      />
   )
}

const InputPassword = (props) => {
   const {
      id='',
      className="w-full",
      name="",
      value="",
      placeholder="",
      Ref=()=>{},
      onChange=()=>{},
      Disabled=false,
      Required=false,
      DisableClass="disabled:bg-gray-f9 disabled:text-gray-a1 disabled:border-gray-cc"
   } = props

   const [Value, setValue] = useState(value)
   const [show, setShow] = useState(false)

   useEffect(() => {
      setValue(value)
   }, [value])

   return (
      <div className={`h-12 border border-gray-cc rounded-md relative overflow-hidden ${className}`}>
         <input
            id={id}
            className={`w-full h-full px-3 text-sm outline-none placeholder:text-gray-a1 ${DisableClass}`}
            ref={Ref}
            type={ show ? "text" : "password" }
            name={name}
            value={Value ? Value : ""}
            placeholder={placeholder}
            disabled={Disabled}
            required={Required}
            onChange={(e) => {
                  setValue(e.target.value)
                  onChange(e.target.value)
               }
            }
         />
         <div onClick={() => setShow(!show)} className="absolute w-6 h-6 -translate-y-1/2 cursor-pointer top-1/2 right-5">
            <EyeIcon className={`w-6 ${ show ? "fill-gray-45" : "fill-gray-a1" }`}/>
         </div>
      </div>
   )
}

export {
   Input,
   InputPassword
}