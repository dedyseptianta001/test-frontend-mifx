const ButtonGreen = (props) => {
   const { children, onClick=()=>{}, } = props;

   const handleClick = () => {
      onClick();
   }

   return (
      <button onClick={handleClick} className="w-full h-12 rounded-lg bg-green shadow-c-green flex items-center gap-2 justify-center text-white font-semibold">
         { children }
      </button>
   )
}

const ButtonYellow = (props) => {
   const { children, onClick=()=>{}, type="button" } = props;

   const handleClick = () => {
      onClick();
   }

   return (
      <button type={type} onClick={handleClick} className="w-full h-12 rounded-lg bg-yellow shadow-c-green flex items-center gap-2 justify-center font-semibold">
         { children }
      </button>
   )
}

export {
   ButtonGreen,
   ButtonYellow
}