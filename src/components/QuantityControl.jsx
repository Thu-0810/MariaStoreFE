function QuantityControl({ value, onDecrease, onIncrease, min = 1 }) {
    return (
      <div className="flex items-center border border-gray-300 rounded-md overflow-hidden w-36 bg-white">
        <button
          onClick={onDecrease}
          className="w-12 h-10 flex items-center justify-center text-[#133e87] text-xl font-bold hover:bg-[#e0e7ff] transition"
        >
          −
        </button>
  
        <input
          type="number"
          min={min}
          value={value}
          readOnly
          className="w-full h-10 text-center text-lg text-[#133e87] font-medium outline-none border-l border-r border-gray-200
          appearance-none [-moz-appearance:textfield]"
        />
  
        <button
          onClick={onIncrease}
          className="w-12 h-10 flex items-center justify-center text-[#133e87] text-xl font-bold hover:bg-[#e0e7ff] transition"
        >
          +
        </button>
      </div>
    );
  }
  
  export default QuantityControl;
  