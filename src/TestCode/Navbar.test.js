import { shallow } from "enzyme";
import Navbar from "../Controller/Navbar";
import reducer, { initialState } from "../Model/rootReducer";
import { StateProvider } from "../Model/StateProvider";

const setUp = () => {
  let component = shallow(
    <StateProvider initialState={initialState} reducer={reducer}>
      <Navbar />
    </StateProvider>
  );
  return component;
};
describe("Navbar Component", () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });
  it("Should Render the Navbar component Without Errors", () => {
    let navbar = component;
    expect(navbar.length).toBe(1);
  });
});
