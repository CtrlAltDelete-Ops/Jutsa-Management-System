import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import AddFinance from '../../features/finance/components/AddFinance'
function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Add Finance"}))
      }, [])


    return(
      <AddFinance/>
    )
}

export default InternalPage