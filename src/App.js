import React, { Suspense, useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ContactUsModal from "./components/sections/hometwo/ContactUsModal";
import Mobileinputform from "./components/sections/modal/Mobileinputform";
import PrivateRoute from "./PrivateRouter";
import { UserContext } from "./context/LoginContext";
import mixpanel from 'mixpanel-browser';
// import HomeTwonew from "./components/pages/HomeTwonew";
import TutorTemp from "./components/pages/TutorTemp";
mixpanel.init('2375e473bcb2d154efecd4607032f614', {debug: true}); 
mixpanel.track('Sign up');



// const Preloader from "./components/layouts/Preloader";

// Preloader
const Preloader = React.lazy(() => import("./components/layouts/Preloader"));
const TestSCRF = React.lazy(() => import("./TestCSRF"));

// Home Pages
const Hometwo = React.lazy(() => import("./components/pages/Hometwo"));
const HomeTwonew = React.lazy(() => import("./components/pages/HomeTwonew"));
// const Hometesting = React.lazy(()=>import('./components/pages/Hometesting'))
// Blog
// const Bloggrid = React.lazy(() => import("./components/pages/Bloggrid"));
const Bloglist = React.lazy(() => import("./components/pages/Bloglist"));
const Blogsingle = React.lazy(() => import("./components/pages/Blogsingle"));
// Pages
const index = React.lazy(() => import("./components/pages/Locations"));
const About = React.lazy(() => import("./components/pages/About"));
const Services = React.lazy(() => import("./components/pages/Services"));
const Faq = React.lazy(() => import("./components/pages/Faq"));
const Pricing = React.lazy(() => import("./components/pages/Pricing"));
const Contact = React.lazy(() => import("./components/pages/Contact"));
const Career = React.lazy(() => import("./components/pages/Career"));
const Comingsoon = React.lazy(() => import("./components/pages/Comingsoon"));
const Error = React.lazy(() => import("./components/pages/Error"));
const UserProfile = React.lazy(() => import("./components/pages/UserProfile"));
const SubmitNewListing = React.lazy(() =>
  import("./components/pages/Submitnewlisting")
);
const Login = React.lazy(() => import("./components/pages/Login"));
const JoinAsTrainer = React.lazy(() => import("./components/pages/JoinAsTrainer"));
const LookingForTraining = React.lazy(() => import("./components/pages/LookingForTraining"));
const OTPtoken = React.lazy(() => import("./components/pages/OTPtoken"));
const Register = React.lazy(() => import("./components/pages/Register"));
const RefundsCancellations = React.lazy(() =>
  import("./components/pages/RefundsCancellations")
);
const Terms = React.lazy(() => import("./components/pages/Terms"));
const Privacy = React.lazy(() => import("./components/pages/PrivacyPolicy"));
const Cookie_Policy = React.lazy(() =>
  import("./components/pages/CookiePolicy")
);
// Listings
const Listinggrid = React.lazy(() => import("./components/pages/Listinggrid"));
const Listinglist = React.lazy(() => import("./components/pages/Listinglist"));
const Listingmap = React.lazy(() => import("./components/pages/Listingmap"));
const Rentmap = React.lazy(() => import("./components/pages/Rentmap"));
const Projects = React.lazy(() => import("./components/pages/Projects"));
// const Covidbeds = React.lazy(() => import("./components/pages/Covidbeds"));
const User = React.lazy(() => import("./components/pages/UserData"));
const Listingdetailsone = React.lazy(() =>
  import("./components/pages/Listingdetailsone")
);
const Listingdetailstwo = React.lazy(() =>
  import("./components/pages/Listingdetailstwo")
);
const Listingdetailsthree = React.lazy(() =>
  import("./components/pages/Listingdetailsthree")
);
const Submitlisting = React.lazy(() =>
  import("./components/pages/Submitlisting")
);
const SubmitProject = React.lazy(() =>
  import("./components/pages/Submitproject")
);
const Comparelistings = React.lazy(() =>
  import("./components/pages/Comparelistings")
);
const Addpostings = React.lazy(() => import("./components/pages/Addpostings"));
// Agents
// const Agentarchive = React.lazy(() =>
//   import("./components/pages/Agentarchive")
// );
const Agentdetails = React.lazy(() =>
  import("./components/pages/Agentdetails")
);
const Profile = React.lazy(() => import("./components/pages/Profile"));
const MyProfile = React.lazy(() => import("./components/pages/MyProfile"));

const Profilelistings = React.lazy(() =>
  import("./components/pages/Profilelistings")
);
const Profilesavedlistings = React.lazy(() =>
  import("./components/pages/Profilesavedlistings")
);
// Agency
const Agencyarchive = React.lazy(() =>
  import("./components/pages/Agencyarchive")
);
const Agencydetails = React.lazy(() =>
  import("./components/pages/Agencydetails")
);

// New Page for User Location
const UserLiveLocation = React.lazy(() =>
  import("./components/pages/UserLiveLocation")
);
const UserDetails = React.lazy(() => import("./components/pages/UserDetails"));
const ReduxView = React.lazy(() => import("./components/pages/ProjectsList"));
const ProjectsFromState = React.lazy(() =>
  import("./components/pages/ProjectsDetail")
);

const Listingitem = React.lazy(() => import("./components/pages/Listingitem"));

const Chat = React.lazy(() => import("./components/pages/Chat"));

const ManageLayouts = React.lazy(() =>
  import("./components/pages/ManageLayouts")
);

// Business
const Business = React.lazy(() => import("./components/pages/Businesslogin"));

//Marketing Agent login
// const MarketingAgentLogin = React.lazy(() => import("./components/pages/MarketingAgentLogin"));

//Email Verification
const emailVerify = React.lazy(() => import("./components/pages/Emailverify"));

function App() {
  return (
    <Router>
      <Suspense fallback={<Preloader />}>
        <Switch>
          {/* Homepages */}
          {/*<Route exact path="/" component={Home} /> */}
          {/* <Route exact path="/home2" component={Home2} /> */}
          {/*<Route exact path="/" component={index} /> */}
          <Route exact path="/testing" component={TestSCRF} />
          <Route exact path="/properties" component={Listingmap} />
          <Route exact path="/rent" component={Rentmap} />
          <Route exact path="/projects" component={Projects} />

          <Route exact path="/properties/:slug" component={Listingitem} />
          <Route exact path="/rent/:slug" component={Listingitem} />
          <Route exact path="/projects/:slug" component={Listingitem} />
          {/* <Route exact path="/covidbeds" component={Covidbeds} /> */}
          <Route exact path="/user" component={User} />
          <Route
            exact
            path="/user-live-location"
            component={UserLiveLocation}
          />

          {/* Business Route */}
          <Route exact path="/business/login" component={Business} />
          {/* Business Route End*/}

          {/* Marketing Agent Route */}
          {/* <Route exact path="/marketing/login" component={MarketingAgentLogin}/> */}
          {/* Marketing Agent End*/}

          <Route exact path="/chat" component={Chat} />

          <Route exact path="/" component={Hometwo} />
          <Route exact path="/How-it-works" component={HomeTwonew} />


          <Route exact path="/Mobileinputform" component={Mobileinputform} />
          {/* <Route exact path="/Modal" component={Modalbox} /> */}
          {/* Blog */}
          {/* <Route exact path="/blogs" component={Bloggrid} /> */}
          <Route exact path="/blog" component={Bloglist} />
          <Route exact path="/blog/:slug" component={Blogsingle} />
          {/* Pages */}
          <Route exact path="/about" component={About} />
          <Route exact path="/services" component={Services} />
          <Route exact path="/faq" component={Faq} />
          <Route exact path="/pricing" component={Pricing} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/career" component={Career} />
          <Route exact path="/coming-soon" component={Comingsoon} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/join-as-trainer" component={JoinAsTrainer} />
          <Route exact path="/looking-for-training" component={LookingForTraining} />
          <Route exact path="/otp-token" component={OTPtoken} />
          <Route exact path="/register" component={Register} />
          <Route
            exact
            path="/refunds-cancellations"
            component={RefundsCancellations}
          />
          <Route exact path="/terms-and-conditions" component={Terms} />
          <Route exact path="/privacy-policy" component={Privacy} />
          <Route exact path="/cookie-policy" component={Cookie_Policy} />
          <Route exact path="/contactusmodal" component={ContactUsModal} />
          {/* Listings */}
          <Route exact path="/listing-grid" component={Listinggrid} />
          <Route exact path="/listing-list" component={Listinglist} />
          <Route exact path="/listing-map" component={Listingmap} />
          <Route
            exact
            path="/listing-details-v1/:peopleId"
            component={Listingdetailsone}
          />
          <Route
            exact
            path="/trainers/:peopleId"
            component={TutorTemp}
          />
          <Route
            exact
            path="/listing-details-v2"
            component={Listingdetailstwo}
          />
          <Route
            exact
            path="/listing-details-v3"
            component={Listingdetailsthree}
          />
          <Route exact path="/submit-listing" component={Submitlisting} />
          {/*<Route exact path="/submit-listing/:slug" component={Submitlisting} />
          <Route
            exact
            path="/submit-listing/:slug/:type"
            component={Submitlisting}
          /> */}
          {/* <Route exact path="/submit-listing/:slug1/:slug2" component={Submitlisting} /> */}

          <Route exact path="/submit-project" component={SubmitProject} />
          <Route exact path="/compare-listings" component={Comparelistings} />
          <Route exact path="/add-post" component={Addpostings} />
          {/* Agents */}
          {/* <Route exact path="/agent-archive" component={Agentarchive} /> */}
          <Route exact path="/user-details/:slug" component={Agentdetails} />
          {/* <Route path="/profile" component={Profile} /> */}

          {/* PrivateRoute */}
          <PrivateRoute exact path="/myprofile" component={MyProfile} />
          <PrivateRoute
            exact
            path="/profile-listings"
            component={Profilelistings}
          />
          <PrivateRoute
            exact
            path="/profile-saved-listings"
            component={Profilesavedlistings}
          />

          {/* Agency */}
          {/* <Route exact path="/agency-archive" component={Agencyarchive} /> */}
          <Route exact path="/agency-details" component={Agencydetails} />
          <Route component={ReduxView} path="/redux" exact />
          <Route
            component={ProjectsFromState}
            path="/project-from-state"
            exact
          />

          {/* Email Verification Route */}
          <Route exact path="/email-verify/:slug" component={emailVerify} />
          {/* Email Verification Route End*/}

          <Route path="/enter-user-details" component={UserDetails} />

          <Route exact path="/userprofile" component={UserProfile} />
          <Route exact path="/submitnewlisting" component={SubmitNewListing} />
          <Route exact path="/manage-layouts" component={ManageLayouts} />
          <Route exact path="/404" component={Error} />
          <Route exact path="/:slug" component={Agentdetails} />
          <Route component={Error} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
