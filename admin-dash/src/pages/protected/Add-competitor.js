import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import AddCompetitor from "../../features/itDay-com/components/AddCompetitor";
function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Add Finance" }));
  }, []);

  return <AddCompetitor />;
}

export default InternalPage;
