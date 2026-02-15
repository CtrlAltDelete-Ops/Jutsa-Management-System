import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import Finance from '../../features/finance'
import ItDayCompetitors from '../../features/itDay-com'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "It-day competitors"}))
      }, [])


    return(
        <ItDayCompetitors />
    )
}

export default InternalPage