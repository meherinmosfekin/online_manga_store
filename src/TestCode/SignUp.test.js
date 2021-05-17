import { shallow } from "enzyme";
import SignUp from "../Controller/SignUp";
import reducer, { initialState } from "../Model/rootReducer";
import { StateProvider } from "../Model/StateProvider";

const setUp = () => {
  let component = shallow(
    <StateProvider initialState={initialState} reducer={reducer}>
      <SignUp />
    </StateProvider>
  );
  return component;
};
describe("Sign Up Component", () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });
  it("Should Render the Sing Up component without Errors", () => {
    let sigIn = component;
    expect(sigIn.length).toBe(1);
  });
});
