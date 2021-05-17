import { shallow } from "enzyme";
import SignUp from "../Controller/SignUp";
import SignIn from "../Controller/SignIn";
import { StateProvider } from "../Model/StateProvider";
import reducer, { initialState } from "../Model/rootReducer";

const setUp1 = () => {
  const component = shallow(
    <StateProvider initialState={initialState} reducer={reducer}>
      <SignIn />
    </StateProvider>
  );
  return component;
};
const setUp2 = () => {
  const component = shallow(
    <StateProvider initialState={initialState} reducer={reducer}>
      <SignUp />
    </StateProvider>
  );
  return component;
};
describe("Account Component", () => {
  let component1, component2;
  beforeEach(() => {
    component1 = setUp1();
    component2 = setUp2();
  });
  describe("Account", () => {
    it("Should Render the Sign In Component without errors", () => {
      const signIn = component1;
      expect(signIn.length).toBe(1);
    });
  });
  describe("Account", () => {
    it("Should Render the Sign Up Component without errors", () => {
      const signUp = component2;
      expect(signUp.length).toBe(1);
    });
  });
});
