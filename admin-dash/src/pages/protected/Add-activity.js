import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import AddActivity from "../../features/activity/components/AddActivity";
function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Add Activity" }));
  }, []);

  return <AddActivity />;
}

export default InternalPage;
