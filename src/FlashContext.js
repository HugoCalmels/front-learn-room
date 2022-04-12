import { createContext } from "react";

const FlashContext = createContext({ message: null, type: null });

export default FlashContext;