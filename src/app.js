import React from 'react'
import { useSelector } from 'react-redux'
import GoogleMaps from './components/googleMaps'
import { Search } from './components/search'
import { Toaster } from './components/toaster'


export const App = () => {

  const createSuccess = useSelector(state => state.job)

 return (
   <div>
   <Search />
    {createSuccess.error === false ? <Toaster /> : null }
    <GoogleMaps />
    </div>
   ) 
}