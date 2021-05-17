import { shallow } from "enzyme";
import SignIn from "../Controller/SignIn";
import reducer, { initialState } from "../Model/rootReducer";
import { StateProvider } from "../Model/StateProvider";

const setUp = () => {
  let component = shallow(
    <StateProvider initialState={initialState} reducer={reducer}>
      <SignIn />
    </StateProvider>
  );
  return component;
};
describe("Sign In Component", () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });
  it("Should Render the Sing In component without Errors", () => {
    let sigIn = component;
    expect(sigIn.length).toBe(1);
  });
});
