import { shallow } from "enzyme";
import Rent from "../Controller/Rent";
import reducer, { initialState } from "../Model/rootReducer";
import { StateProvider } from "../Model/StateProvider";

const setUp = () => {
  let component = shallow(
    <StateProvider initialState={initialState} reducer={reducer}>
      <Rent />
    </StateProvider>
  );
  return component;
};
describe("Rent Component", () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });
  it("Should Render payment method and form content component Without Errors", () => {
    let rent = component;
    expect(rent.length).toBe(1);
  });
});
