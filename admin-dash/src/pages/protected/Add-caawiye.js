import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import AddCaawiye from "../../features/caawiye/components/AddCaawiye";
function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Add Caawiye" }));
  }, []);

  return <AddCaawiye />;
}

export default InternalPage;
