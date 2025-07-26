// ✅ CLIENT COMPONENT
"use client";

import { Provider } from "react-redux";
import { store } from "../../redux/store";
import {ProductProvider} from "@/context/ContextProvidrer"

export default function ReduxProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return( 
  <>
    {/*<Provider store={store}>*/}
    <ProductProvider>
      {children}
    {/*</Provider>*/}
    </ProductProvider>
  </>
)}
