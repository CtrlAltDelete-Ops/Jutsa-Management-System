import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import AddSports from "../../features/sports/components/AddSports";
function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({title: "Add Sports"}));
  }, []);

  return <AddSports />;
}

export default InternalPage;
