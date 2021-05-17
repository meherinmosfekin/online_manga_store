import { shallow } from "enzyme";
import Account from "../Controller/Account";
import { StateProvider } from "../Model/StateProvider";
import reducer, { initialState } from "../Model/rootReducer";

const setUp = () => {
  const component = shallow(
    <StateProvider initialState={initialState} reducer={reducer}>
      <Account />
    </StateProvider>
  );
  return component;
};
describe("Account Component", () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });
  describe("Account", () => {
    it("Should Render the Account Component without errors", () => {
      const account = component;
      expect(account.length).toBe(1);
    });
  });
});
