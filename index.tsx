import HomeHeroSection from "@/components/Content/Home/HeroSection";
import HomeFeatureSection from "@/components/Content/Home/FeatureSection";
import { getNotificationToSend } from "@/utils/notification-api"
import { GetServerSideProps } from "next"
import {
  MapPinIcon
} from "@heroicons/react/24/outline";
import HomeFeatureSectionSecondLayer from "@/components/Content/Home/FeatureSectionSecondLayer";
import HomeFooterSection from "@/components/Content/Home/FooterSection";
import { useSetupContext } from "@/utils/context/SetupContext/SetupContext";
import { useEffect, useState, useRef } from "react";
import { Typography } from "@mui/material";
import { useAuthenticationContext } from "@/utils/context/AuthContext/AuthContext";
import { useRouter } from "next/router";
import { decrypt } from "@/utils/config/encryptor";
import { useBranchPath } from "@/utils/hooks/useToken";
import { ControlledBackdrop } from "@/components";


const Home = () => {
  const features = [
    {
      name: "CALAMBA CITY, LAGUNA",
      description:
        "National Highway, Halang, Calamba"
        ,
      icon: MapPinIcon,
      phoneNumber: "(049) 502-1596",
     
    },
    {
    name: "TAMBO, LIPA, BATANGAS CITY",
      description:
        "Purok 3, Brgy. Tambo, Lipa City"
        ,
      icon: MapPinIcon,
      phoneNumber: "(043) 784-2709",
    },
    {
      name: "SABANG, LIPA, BATANGAS CITY",
      description:
        "Don Juan 2 building, Sabang",
      icon: MapPinIcon,
      phoneNumber: "(043) 784-2709",
    },
    {
      name: "BATANGAS, BATANGAS CITY",
      description:
        "Brgy. Sta Rita, Karsada",
      icon: MapPinIcon,
      phoneNumber: "(043) 723-5095",
    },
    {
      name: "PALO ALTO, CALAMBA CITY",
      description:
        "Palo alto, Calamba"
         ,
      icon: MapPinIcon,
      phoneNumber: "(043) 123-4567",
    },
  ];
  const viewer = useRef<any>(null)
  const { setupCheckUsersDB } = useSetupContext();
  const { checkAuthentication } = useAuthenticationContext()
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const [branchPath, setBranchPath] = useBranchPath()
  const [path, setPath] = useState<string>('')
  useEffect(() => {
    let savedPlatform;
    const savedPlatformStorage = sessionStorage.getItem('PF')
    if(typeof savedPlatformStorage == 'string'){
        savedPlatform = JSON.parse(savedPlatformStorage)
    }

    if(!savedPlatform){
        setLoading(false)
    } else {
        checkAuthentication().then((res) => {
        if (res == "authenticated") {
            setLoading(false);
            router.push(decrypt(branchPath))
        } else {
            setLoading(false)
        }
        });
    }
   
}, [])
useEffect(() => {
  setPath('https://pdftron.s3.amazonaws.com/downloads/pl/webviewer-demo.pdf')
}, []);
  useEffect(() => {
    setupCheckUsersDB({ location: "homepage" });
  }, []);
  return (
    <>
      {
        loading ? <ControlledBackdrop open={loading} />
        :
        <>
        <HomeHeroSection showNavSection disableMarginTop={false}>
         
        <img
              className="mx-auto h-12 w-auto"
              src="/agrivet.png"
              alt="Your Company"
              style={{ width: "40%", height: "auto" }}
            />
        <div className="hidden sm:mb-3 sm:flex sm:justify-center">
          <div className="relative rounded-full py-1 px-3 text-sm leading-4 text-gray-600 ring-2 ring-indigo-700/100 hover:ring-gray-700/20">
            We always make your pets safe.{" "}
           
          </div>
        </div>
        <div className="text-center">
          <Typography className="text-5xl font-bold tracking-tight text-violet-900 sm:text-5xl">
          Compassionate Care for Your Furry Friends: <br />
          Where Every Paw Matters.
          </Typography>
          <p className="text-base font-semibold leading-7 text-black-600">
            Make an appointment for your pets.
          </p>
          <div className="mt-5 flex items-center justify-center gap-x-6">
            <a
              href="/login"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Get started
            </a>
            </div>  
        </div>
      </HomeHeroSection>
      <HomeFeatureSection
        children={
          <img
            src="https://petsuites.com/wp-content/uploads/Dollarphotoclub_56745107.jpg"
            alt="Product screenshot"
           
          />
        }
      />
      <HomeFeatureSectionSecondLayer>
        {features.map((feature) => (
          <div key={feature.name} className="relative pl-16">
            <dt className="text-base font-semibold leading-7 text-gray-900">
              <div className="absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                <feature.icon
                  className="h-6 w-6 text-white"
                  aria-hidden="true"
                />
              </div>
              {feature.name}
            </dt>
            <dd className="mt-2 text-base leading-7 text-gray-600">
              {feature.description}
            </dd>
            <dd className="mt-2 text-base leading-7 text-gray-600">
              {feature.phoneNumber}

            </dd>
          </div>
        ))}
      </HomeFeatureSectionSecondLayer>
      <HomeFooterSection />
        </>
      }
    </>
  );
};

export default Home