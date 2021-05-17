import { shallow } from "enzyme";
import Total from "../Controller/Total";
import reducer, { initialState } from "../Model/rootReducer";
import { StateProvider } from "../Model/StateProvider";

const setUp = () => {
  let component = shallow(
    <StateProvider initialState={initialState} reducer={reducer}>
      <Total />
    </StateProvider>
  );
  return component;
};
describe("Total Component", () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });
  it("Should Render price from content component Without Errors", () => {
    let total = component;
    expect(total.length).toBe(1);
  });
});
