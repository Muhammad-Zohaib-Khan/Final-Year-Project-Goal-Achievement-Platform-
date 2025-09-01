// ✅ CLIENT COMPONENT
"use client";

import {ProductProvider} from "@/context/ContextProvidrer"
import {GoalProvider} from '@/context/GoalContext'
import {TaskProvider} from '@/context/TaskContext'
export default function ({
  children,
}: {
  children: React.ReactNode;
}) {
  return( 
    
  <>
    {/*<Provider store={store}>*/}
    <ProductProvider>
      <GoalProvider>
        <TaskProvider>
      {children}
        </TaskProvider>
      </GoalProvider>
    {/*</Provider>*/}
    </ProductProvider>
  </>
)}
