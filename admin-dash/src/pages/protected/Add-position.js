import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import AddPosition from "../../features/settings/positions/components/AddPosition";
function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Add Position" }));
  }, []);

  return <AddPosition />;
}

export default InternalPage;
