import Header from '@/components/header'
import MobileNav from '@/components/mobilenav'
import Sidebar from '@/components/sidebar'
import { getCurrentUser } from '@/lib/actions/user.actions'
import { redirect } from 'next/navigation'
import React from 'react'

const layout = async ({ children } : { children: React.ReactNode }) => {
    const currentUser = await getCurrentUser();
    if (!currentUser) return redirect("/sign-in");
  return (
    <main className='flex h-screen'>
        <Sidebar {...currentUser}/>
        <section className='flex h-full flex-1 flex-col'>
            <MobileNav />
            <Header />
            <div className='main-content'>
                {children}
            </div>
        </section>
    </main>
  )
}

export default layout
