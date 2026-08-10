import Navbar from "../Components/Navbar";
import NoticeBoard from "../Components/NoticeBoard";
import Footer from "../Components/Footer";

import PlacementPortal from "../Components/PlacementPortal";
import PlacementCell from "../Components/PlacementCell";
import OurRecruiters from "../Components/OurRecruiters";
import UpcomingEvents from "../Components/UpcomingEvents";

import "./LandingPage.css";

export default function LandingPage() {

    return (

        <div className="lp-root">

            <Navbar />

            <NoticeBoard />

            <main>

                <PlacementPortal />

                <PlacementCell />

                <OurRecruiters />

                <UpcomingEvents />

            </main>

            <Footer />

        </div>
    );
}