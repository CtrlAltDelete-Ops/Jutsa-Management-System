import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import Caawiye from '../../features/caawiye'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Caawiye"}))
      }, [])


    return(
        <Caawiye />
    )
}

export default InternalPage