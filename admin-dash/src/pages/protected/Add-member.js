import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import AddMember from "../../features/settings/members/components/AddMember";
function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Add member" }));
  }, []);

  return <AddMember />;
}

export default InternalPage;
