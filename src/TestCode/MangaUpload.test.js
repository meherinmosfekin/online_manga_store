import { shallow } from "enzyme";
import MangaUpload from "../Controller/BoxedManga";
import reducer, { initialState } from "../Model/rootReducer";
import { StateProvider } from "../Model/StateProvider";

const setUp = () => {
  let component = shallow(
    <StateProvider initialState={initialState} reducer={reducer}>
      <MangaUpload />
    </StateProvider>
  );
  return component;
};
describe("Manga Upload Component", () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });
  it("Should Render the Manga Upload Without Errors", () => {
    let mangaUploader = component;
    expect(mangaUploader.length).toBe(1);
  });
});
