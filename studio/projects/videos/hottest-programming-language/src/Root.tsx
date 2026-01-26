import { Composition, Folder } from "remotion";
import { Main } from "./Main";
import { WhatIsASkill } from "./WhatIsASkill";

export const RemotionRoot = () => {
  return (
    <>
      {/* What Is A Skill - 20 second explainer */}
      <Folder name="WhatIsASkill">
        <Composition
          id="WhatIsASkill-Vertical"
          component={WhatIsASkill}
          durationInFrames={600}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={{}}
        />
        <Composition
          id="WhatIsASkill-Square"
          component={WhatIsASkill}
          durationInFrames={600}
          fps={30}
          width={1080}
          height={1080}
          defaultProps={{}}
        />
        <Composition
          id="WhatIsASkill-Landscape"
          component={WhatIsASkill}
          durationInFrames={600}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{}}
        />
      </Folder>

      {/* Hottest Programming Language - 15 second video */}
      <Folder name="HottestLanguage">
        <Composition
          id="Main"
          component={Main}
          durationInFrames={450}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{}}
        />
        <Composition
          id="Square"
          component={Main}
          durationInFrames={450}
          fps={30}
          width={1080}
          height={1080}
          defaultProps={{}}
        />
        <Composition
          id="Vertical"
          component={Main}
          durationInFrames={450}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={{}}
        />
      </Folder>
    </>
  );
};
