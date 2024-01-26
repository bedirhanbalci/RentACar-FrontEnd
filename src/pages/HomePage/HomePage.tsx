import React from "react";
import AdditionalFeatureSlider from "../../components/layout/AdditionalFeatureSlider/AdditionalFeatureSlider";
import AssurancePackageSlider from "../../components/layout/AssurancePackageSlider/AssurancePackageSlider";

const featureCardsData = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  title: `Card ${index + 1}`,
  description: `Description ${index + 1}`,
  image: `url${index + 1}`,
}));
const assuranceCardsData = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  title: `Card ${index + 1}`,
  description: `Description ${index + 1}`,
  image: `url${index + 1}`,
}));

type Props = {};

const HomePage = (props: Props) => {
  return (
    <div>
      <AdditionalFeatureSlider cards={featureCardsData}/>
      <AssurancePackageSlider cards={assuranceCardsData}/>
      <hr />
    </div>
  );
};

export default HomePage;
