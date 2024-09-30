import { useSelector, useDispatch } from 'react-redux';
import {
  decrement,
  increment,
  // selectCount,
} from "../redux/playersRedux";

const Counter = () => {
    const count = useSelector(state => state.players.value)
    const dispatch = useDispatch()
  
    return (
      <>
        <div>
        <div>
          <button
            aria-label="Increment value"
            onClick={() => dispatch(increment())}
          >
            +
          </button>
          <span>{count}</span>
          <button
            aria-label="Decrement value"
            onClick={() => dispatch(decrement())}
          >
            -
          </button>
        </div>
        {/* omit additional rendering output here */}
      </div>
      </>
    )
}

export default Counter;