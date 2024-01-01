import { useGlobalState } from "../state/state"
import PageNotFound from "../views/PageNotFound";

const CheckUsernameSame = (props) => {
  const [isUsernameSame, setIsUsername] = useGlobalState('isUsernameSame')
  return isUsernameSame ? props.page : <PageNotFound/>
}

export default CheckUsernameSame