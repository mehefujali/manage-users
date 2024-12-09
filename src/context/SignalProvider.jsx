/* eslint-disable react/prop-types */
import { createContext, useState } from "react";



// eslint-disable-next-line react-refresh/only-export-components
export const SignalContext = createContext()
const SignalProvider = ({children}) => {
      const [signal,setSignal] = useState()
      return (
            <SignalContext.Provider  value={{signal,setSignal}}>
                        {children}
            </SignalContext.Provider>
      );
};

export default SignalProvider;